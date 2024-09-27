import { Router } from "express";
import {
    AuthenticatedUser,
    Login,
    Logout,
    Register,
    UpdateInfo,
    UpdatePassword,
} from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { PermissionMiddleware } from "./middleware/permission.middleware"; // Ensure correct import
import { createFAQ, getFAQById, getAllFAQs, updateFAQ, deleteFAQ } from './controller/faq.controller';

import {
    CreateUser,
    DeleteUser,
    GetUser,
    UpdateUser,
    Users,
} from "./controller/user.controller";
import { Permissions } from "./controller/permission.controller";

import {
    CreateRole,
    DeleteRole,
    GetRole,
    Roles,
    UpdateRole,
} from "./controller/role.controller";
import {
    CreateResource,
    DeleteResource,
    GetResource,
    Resources,
    UpdateResource,
} from "./controller/resource.controller";
import {
    Upload,
    ModerateFile,
    GetModeratedFiles,
    GetFileMetadata,
} from "./controller/pdf.controller"; // Added GetFileMetadata route
import express from "express";
import { getAllDocuments, getDocumentById, getMostViewedDocuments, getLeastViewedDocuments, getMostBookmarkedDocuments, getLeastBookmarkedDocuments, getMostDownloadedDocuments, getLeastDownloadedDocuments } from "./controller/doc.controller";
import { createView } from "./controller/view.controller";
import { createBookmark } from "./controller/bookmark.controller";
import { createDownload} from "./controller/download.controller";

export const routes = (router: Router) => {
    // Auth routes
    router.post("/api/register", Register); // Register a new user
    router.post("/api/login", Login); // User login
    router.get("/api/user", AuthMiddleware, AuthenticatedUser); // Get authenticated user information
    router.post("/api/logout", AuthMiddleware, Logout); // User logout
    router.put("/api/users/info", AuthMiddleware, UpdateInfo); // Update user information
    router.put("/api/users/password", AuthMiddleware, UpdatePassword); // Update user password

    // Users routes
    router.get("/api/users", AuthMiddleware, PermissionMiddleware('view_users'), Users); // Get all users
    router.post("/api/users", AuthMiddleware, PermissionMiddleware('create_users'), CreateUser); // Create a new user
    router.get("/api/users/:id", AuthMiddleware, PermissionMiddleware('view_users'), GetUser); // Get a user by ID
    router.put("/api/users/:id", AuthMiddleware, PermissionMiddleware('edit_users'), UpdateUser); // Update a user by ID
    router.delete("/api/users/:id", AuthMiddleware, PermissionMiddleware('delete_users'), DeleteUser); // Delete a user by ID

    // Permissions route
    router.get("/api/permissions", AuthMiddleware, Permissions); // Get all permissions (not specific to user)

    // Roles routes
    router.get("/api/roles", AuthMiddleware, PermissionMiddleware('view_roles'), Roles); // Get all roles
    router.post("/api/roles", AuthMiddleware, PermissionMiddleware('create_roles'), CreateRole); // Create a new role
    router.get("/api/roles/:id", AuthMiddleware, PermissionMiddleware('view_roles'), GetRole); // Get a role by ID
    router.put("/api/roles/:id", AuthMiddleware, PermissionMiddleware('edit_roles'), UpdateRole); // Update a role by ID
    router.delete("/api/roles/:id", AuthMiddleware, PermissionMiddleware('delete_roles'), DeleteRole); // Delete a role by ID

      //GET functions fr documents
      router.get('/documents', getAllDocuments);
      router.get('/documents/:id', getDocumentById);
      router.get('/documents/view/most', getMostViewedDocuments);
      router.get('/documents/view/least', getLeastViewedDocuments);
      router.get('/documents/bookmark/most', getMostBookmarkedDocuments);
      router.get('/documents/bookmark/least', getLeastBookmarkedDocuments);
      router.get('/documents/download/most', getMostDownloadedDocuments);
      router.get('/documents/download/least', getLeastDownloadedDocuments);

    // New POST functions to record user interactions
    router.post('/documents/:id/view', AuthMiddleware, createView);  // Add a view to the document
    router.post('/documents/:id/bookmark', AuthMiddleware, createBookmark);  // Bookmark a document
    router.post('/documents/:id/download', AuthMiddleware, createDownload);  // Record a download for a document


    // Resources routes
    router.get("/api/resources", AuthMiddleware, PermissionMiddleware('view_resources'), Resources); // Get all resources
    router.post("/api/resources", AuthMiddleware, PermissionMiddleware('create_resources'), CreateResource); // Create a new resource
    router.get("/api/resources/:id", AuthMiddleware, PermissionMiddleware('view_resources'), GetResource); // Get a resource by ID
    router.put("/api/resources/:id", AuthMiddleware, PermissionMiddleware('edit_resources'), UpdateResource); // Update a resource by ID
    router.delete("/api/resources/:id", AuthMiddleware, PermissionMiddleware('delete_resources'), DeleteResource); // Delete a resource by ID

    // File upload and moderation routes
    router.post("/api/upload", AuthMiddleware, PermissionMiddleware('doc_contribution'), Upload); // Upload a file (PDF)
    router.post("/api/moderate/:id", AuthMiddleware, PermissionMiddleware('doc_moderation'), ModerateFile); // Moderate an uploaded file
    router.get("/api/moderated", AuthMiddleware, PermissionMiddleware('doc_moderation'), GetModeratedFiles); // Get a list of moderated files
    router.get("/api/metadata/:filename?", AuthMiddleware, PermissionMiddleware('doc_viewing'), GetFileMetadata); // Get metadata for all files or a specific file

    // Serve uploaded files statically
    router.use("/api/uploads", express.static("./src/uploads")); // Serve files from the uploads directory


    // Define routes for FAQs
    router.post('/faqs', createFAQ);
router.get('/faqs/:id', getFAQById);
router.get('/faqs', getAllFAQs);
router.put('/faqs/:id', updateFAQ);
router.delete('/faqs/:id', deleteFAQ);



    return router;
};
