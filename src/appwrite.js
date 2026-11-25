import { Client, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const WAITLIST_COLLECTION_ID = import.meta.env.VITE_APPWRITE_WAITLIST_COLLECTION_ID;

export const joinWaitlist = async (email) => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            WAITLIST_COLLECTION_ID,
            ID.unique(),
            {
                email: email,
                joinedAt: new Date().toISOString(),
            }
        );
        return response;
    } catch (error) {
        console.error('Appwrite Error:', error);
        throw error;
    }
};

export { client, databases };
