import conf from "../conf/conf";
import { Client, ID, Databases, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    // ✅ Add a movie to favorites (Store attributes separately)
    async addFavorite(movie, userId) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                movie.imdbID, // Unique identifier
                {
                    userId,
                    imdbID: movie.imdbID,
                    title: movie.Title,
                    year: movie.Year,
                    poster: movie.Poster,
                }
            );
        } catch (error) {
            console.error("Appwrite service :: addFavorite :: error", error);
        }
    }

    // ✅ Remove a movie from favorites
    async removeFavorite(movieId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                movieId
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: removeFavorite :: error", error);
            return false;
        }
    }

    // ✅ Get all favorite movies of a user
    async getFavorites(userId) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("userId", userId)]
            );

            return response.documents.map((doc) => ({
                imdbID: doc.imdbID,
                Title: doc.title,
                Year: doc.year,
                Poster: doc.poster,
            }));
        } catch (error) {
            console.error("Appwrite service :: getFavorites :: error", error);
            return [];
        }
    }
}

const service = new Service();
export default service;


