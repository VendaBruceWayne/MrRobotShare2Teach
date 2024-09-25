import { Router } from "express";
import { AuthonticatedUser, Login, Logout, Register } from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { getAllDocuments, getDocumentById, getMostViewedDocuments, getLeastViewedDocuments, getMostBookmarkedDocuments, getLeastBookmarkedDocuments, getMostDownloadedDocuments, getLeastDownloadedDocuments } from "./controller/doc.controller";
import { UserController } from './controller/user.controller';
import { CreateRole, DeleteRole, GetRole, Roles, UpdateRole } from "./controller/role.controller";
import { CreateResource, DeleteResource, GetResource, Resources, UpdateResource } from "./controller/resource.controller";
import { createView } from "./controller/view.controller";
import { createBookmark } from "./controller/bookmark.controller";
import { createDownload} from "./controller/download.controller";


export const routes = (router: Router) => {

    //CRUD registration & login
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user',AuthMiddleware, AuthonticatedUser);
    router.post('/api/logout',AuthMiddleware, Logout);
    

    // New POST functions to record user interactions
    router.post('/documents/:id/view', AuthMiddleware, createView);  // Add a view to the document
    router.post('/documents/:id/bookmark', AuthMiddleware, createBookmark);  // Bookmark a document
    router.post('/documents/:id/download', AuthMiddleware, createDownload);  // Record a download for a document




    //GET functions fr documents
    router.get('/documents', getAllDocuments);
    router.get('/documents/:id', getDocumentById);
    router.get('/documents/view/most', getMostViewedDocuments);
    router.get('/documents/view/least', getLeastViewedDocuments);
    router.get('/documents/bookmark/most', getMostBookmarkedDocuments);
    router.get('/documents/bookmark/least', getLeastBookmarkedDocuments);
    router.get('/documents/download/most', getMostDownloadedDocuments);
    router.get('/documents/download/least', getLeastDownloadedDocuments);

    //Get Function for report
    const userController = new UserController();  // Create an instance of UserController
    router.get('/report', (req, res) => userController.getUserReport(req, res));

    //CRUD Roles
    router.get('/api/roles', AuthMiddleware, Roles); 
    router.post('/api/roles', AuthMiddleware, CreateRole); 
    router.get('/api/roles/:id', AuthMiddleware, GetRole); 
    router.put('/api/roles/:id', AuthMiddleware, UpdateRole); 
    router.delete ('/api/roles/:id', AuthMiddleware, DeleteRole); 

    //CRUD resources
    router.get('/api/resources', AuthMiddleware, Resources); 
    router.post('/api/resources', AuthMiddleware, CreateResource); 
    router.get('/api/resources/:id', AuthMiddleware, GetResource); 
    router.put('/api/resources/:id', AuthMiddleware, UpdateResource); 
    router.delete ('/api/resources/:id', AuthMiddleware, DeleteResource); 

    return router;
};
