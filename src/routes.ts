import { Router } from "express";
//import { AuthonticatedUser, Login, Logout, Register } from "./controller/auth.controller";
//import { AuthMiddleware } from "./middleware/auth.middleware";
//import { getAllDocuments, getDocumentById, getMostViewedDocuments, getLeastViewedDocuments, getMostBookmarkedDocuments, getLeastBookmarkedDocuments, getMostDownloadedDocuments, getLeastDownloadedDocuments } from "./controller/doc.controller";
import { UserController } from './controller/user.controller';

export const routes = (router: Router) => {




 
    const userController = new UserController();  // Create an instance of UserController

    router.get('/report', (req, res) => userController.getUserReport(req, res));


    return router;
};
