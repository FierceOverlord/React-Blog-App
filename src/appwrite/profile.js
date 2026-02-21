import conf from "../conf/conf";
import { Client, Databases, Query, ID  } from "appwrite";

export class ProfileService{
    client = new Client();
    databases

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createProfile({userId, email, name}) {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.userProfileCollectionId,
            ID.unique(),
            {
                userId,
                email,
                name
            }
        )
    }

    async getProfile(userId) {
        const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.userProfileCollectionId,
            [Query.equal('userId', userId)]
        );

        return response.documents[0];
    }
}

const profileService = new ProfileService();
export default profileService;