import { Router } from "express";
import { AuthonticatedUser, Login, Logout, Register } from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { getAllDocuments, getDocumentById, getMostViewedDocuments, getLeastViewedDocuments, getMostBookmarkedDocuments, getLeastBookmarkedDocuments, getMostDownloadedDocuments, getLeastDownloadedDocuments } from "./controller/doc.controller";

export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user',AuthMiddleware, AuthonticatedUser);
    router.post('/api/logout',AuthMiddleware, Logout);


    router.get('/documents', getAllDocuments);
    router.get('/documents/:id', getDocumentById);
    router.get('/documents/view/most', getMostViewedDocuments);
    router.get('/documents/view/least', getLeastViewedDocuments);
    router.get('/documents/bookmark/most', getMostBookmarkedDocuments);
    router.get('/documents/bookmark/least', getLeastBookmarkedDocuments);
    router.get('/documents/download/most', getMostDownloadedDocuments);
    router.get('/documents/download/least', getLeastDownloadedDocuments);

    return router;
};
