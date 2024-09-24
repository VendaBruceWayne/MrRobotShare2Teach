import { Router } from "express";
import { searchResources } from './controller/resource.controller';

export const routes = (router: Router) => {
    

 
   

    router.get('/resources/search', searchResources);


    return router;
};
