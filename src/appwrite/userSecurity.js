import conf from "../conf/conf";
import { Client, Databases, Query, ID } from "appwrite"

export class UserSecurityService {
    client = new Client();
    databases

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    // security record after sign up
    async createSecurity(userId, email) {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.userSecurityCollectionId,
            ID.unique(),
            {
                userId,
                isApproved: false,
                passwordMustChange: true,
                passwordLastChanged: new Date().toISOString(),
                role: "user",
                email
            }
        )
    }

    //fetch 
    async getSecurity(userId) {
        const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.userSecurityCollectionId,
            [Query.equal("userId", userId)]
        )

        return response.documents[0]
    }

    // Update Security 
    async updateSecurity(documentId) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.userSecurityCollectionId,
            documentId,
            {
                passwordMustChange: false,
                passwordLastChanged: new Date().toISOString()
            }
        )
    }

    // Admin approval
    async approveUser(documentId) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.userSecurityCollectionId,
            documentId,
            {
                isApproved: true,
                passwordMustChange: false,
                passwordLastChanged: new Date().toISOString(),
            }
        )
    }
}

const userSecurityService = new UserSecurityService();
export default userSecurityService;