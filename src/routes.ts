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

export const routes = (router: Router) => {
    // CRUD registration & login routes
    router.post("/api/register", Register); // Register a new user
    router.post("/api/login", Login); // User login
    router.get("/api/user", AuthMiddleware, AuthenticatedUser); // Get authenticated user information
    router.post("/api/logout", AuthMiddleware, Logout); // User logout
    router.put("/api/users/info", AuthMiddleware, UpdateInfo); // Update user information
    router.put("/api/users/password", AuthMiddleware, UpdatePassword); // Update user password

    // CRUD Users routes
    router.get("/api/users", AuthMiddleware, Users); // Get all users
    router.post("/api/users", AuthMiddleware, CreateUser); // Create a new user
    router.get("/api/users/:id", AuthMiddleware, GetUser); // Get a user by ID
    router.put("/api/users/:id", AuthMiddleware, UpdateUser); // Update a user by ID
    router.delete("/api/users/:id", AuthMiddleware, DeleteUser); // Delete a user by ID

    // Permissions route
    router.get("/api/permissions", AuthMiddleware, Permissions); // Get permissions for authenticated user

    // CRUD Roles routes
    router.get("/api/roles", AuthMiddleware, Roles); // Get all roles
    router.post("/api/roles", AuthMiddleware, CreateRole); // Create a new role
    router.get("/api/roles/:id", AuthMiddleware, GetRole); // Get a role by ID
    router.put("/api/roles/:id", AuthMiddleware, UpdateRole); // Update a role by ID
    router.delete("/api/roles/:id", AuthMiddleware, DeleteRole); // Delete a role by ID

    // CRUD Resources routes
    router.get("/api/resources", AuthMiddleware, Resources); // Get all resources
    router.post("/api/resources", AuthMiddleware, CreateResource); // Create a new resource
    router.get("/api/resources/:id", AuthMiddleware, GetResource); // Get a resource by ID
    router.put("/api/resources/:id", AuthMiddleware, UpdateResource); // Update a resource by ID
    router.delete("/api/resources/:id", AuthMiddleware, DeleteResource); // Delete a resource by ID

    // File upload routes
    router.post("/api/upload", AuthMiddleware, Upload); // Upload a file (PDF)
    router.post("/api/moderate", AuthMiddleware, ModerateFile); // Moderate an uploaded file
    router.get("/api/moderated", AuthMiddleware, GetModeratedFiles); // Get a list of moderated files
    router.get("/api/metadata/:filename?", AuthMiddleware, GetFileMetadata); // Get metadata for all files or a specific file

    // Serve uploaded files statically
    router.use("/api/uploads", express.static("./uploads")); // Serve files from the uploads directory

    return router;
};
