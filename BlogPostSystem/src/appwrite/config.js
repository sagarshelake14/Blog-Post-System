import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
         client = new Client();
         databases;
         bucket;

         constructor() {
                 this.client
                      .setEndpoint(conf.appwriteurl)
                      .setProject(conf.appwriteProjectId);
                  this.databases = new Databases(this.client)
                  this.bucket = new Storage(this.client);
         }

         // Create post
         async createPost({title, slug, content, featuredImage, status, userId}) {
                  try {
                           return await this.databases.createDocument(
                                    conf.appwriteDatabaseId,
                                    conf.appwriteCollectionId,
                                    slug,   // unique id

                                    {
                                             title,
                                             content,
                                             featuredImage,
                                             status,
                                             userId,
                                    }
                           )
                  } catch (error) {
                           console.log("Appwrite service :: createPost :: error", error);
                           
                  }
         }      
         
         //Update Post
         async updatePost(slug, {title, content, featuredImage, status}){
                  try {
                           return await this.databases.updateDocument(
                                    conf.appwriteDatabaseId,
                                    conf.appwriteCollectionId,
                                    slug,

                                    {
                                             title,
                                             content,
                                             featuredImage,
                                             status,
                                    }
                           )
                  } catch (error) {
                           console.log("Appwrite service :: updatePost :: error", error);
                  }
         }

         // delete Post
         async deletePost(slug){
                  try {
                           await this.databases.deleteDocument(
                                    conf.appwriteDatabaseId,
                                    conf.appwriteCollectionId,
                                    slug
                           )
                           return true;
                  } catch (error) {
                           console.log("Appwrite service :: deletePost :: error", error);
                           return false;
                  }
         }

         // getting one (single) post
         async getPost(slug){
                  try {
                           return await this.databases.getDocument(
                                    conf.appwriteDatabaseId,
                                    conf.appwriteCollectionId,
                                    slug
                           )
                  } catch (error) {
                           console.log("Appwrite service :: getPost :: error", error);
                           return false;
                  }
         }

         // getting all posts
         async getPosts(queries = [Query.equal("status", "active")]) {
                  try {
                           return await this.databases.listDocuments(
                                    conf.appwriteDatabaseId,
                                    conf.appwriteCollectionId,
                                    queries,
                           )
                  } catch (error) {
                           console.log("Appwrite service :: getPost :: error", error);
                            return false;
                  }
         }


         //File upload related services

         //upload file
         async uploadFile(file){
                  try {
                           return await this.bucket.createFile(
                                    conf.appwriteBucketId,
                                    ID.unique(),
                                    file
                           )
                  } catch (error) {
                           console.log("Appwrite service :: uploadfile :: error", error);
                            return false;
                  }
         }

         // delete file
         async deleteFile(fileId){
                  try {
                           await this.bucket.deleteFile(
                                    conf.appwriteBucketId,
                                    fileId,
                           )
                           return true
                  } catch (error) {
                           console.log("Appwrite service :: deletefile :: error", error);
                           return false;
                  }
         }
         // get file preview
         async getFilePreview(fileId){
                  return this.bucket.getFilePreview(
                           conf.appwriteBucketId,
                           fileId
                  );
         }
}


const service = new Services();
export default services;