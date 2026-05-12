import conf from "../conf/conf";
import { Client, Databases, Query, ID} from "appwrite"

export class AdminControl {
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
            conf.adminControlCollectionId,
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
            conf.adminControlCollectionId,
            [Query.equal("userId", userId)]
        )

        return response.documents[0]
    }

    async getAllUsers() {
        const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.adminControlCollectionId,
            [Query.orderDesc("$createdAt")]
        )

        return response.documents
    }

    async getPendingUsers() {
        const response = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.adminControlCollectionId,
            [Query.equal("isApproved", false)]
        )

        return response.documents
    }

    async rejectUsers(documentId) {
        return await this.documents.listDocuments(
            conf.appwriteDatabaseId,
            conf.adminControlCollectionId,
            documentId,
            {
                isApproved: false
            }
        )
    }

    // Update Security 
    async updateSecurity(documentId) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.adminControlCollectionId,
            documentId,
            {
                passwordMustChange: false,
                passwordLastChanged: new Date().toISOString()
            }
        )
    }

    async updateUserRole(documentId, newRole) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.adminControlCollectionId,
            documentId,
            {
                role: newRole
            }
        )
    }

    // Admin approval
    async approveUser(documentId) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.adminControlCollectionId,
            documentId,
            {
                isApproved: true,
                passwordLastChanged: new Date().toISOString(),
            }
        )
    }

    // Delete User
    async deleteUser(documentId) {
        return await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.adminControlCollectionId,
            documentId
        )
    }
}

const adminControl = new AdminControl();
export default adminControl;