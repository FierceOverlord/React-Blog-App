import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
import profileService from "./profile";
import userSecurityService from "./userSecurity";


export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            console.log("Auth created: ", userAccount);

            if (userAccount) {
                // call another method
                await profileService.createProfile({
                    userId: userAccount.$id,
                    email: userAccount.email,
                    name: userAccount.name
                })

                console.log("Profile created");

                await userSecurityService.createSecurity(userAccount.$id, userAccount.email);

                console.log("Security created");
            
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
            
            const user = await this.account.get().catch(() => null);

            const security = await userSecurityService.getSecurity(user.$id);

            if (!security?.isApproved) {
                await this.logout();
                throw new Error("Account awaiting admin approval");
            }

            if(security.passwordMustChange) {
                throw new Error("Change your current password");
            }

            return user;

        } catch (error) {
            throw error;
        }
    }

    async changePassword({newPassword, oldPassword}) {
        await this.account.updatePassword(newPassword, oldPassword);

        const user = await this.account.get();
        
        const security = await userSecurityService.getSecurity(user.$id)

        await userSecurityService.updateSecurity(security.$id);

        return user
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;