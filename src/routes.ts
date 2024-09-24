import { Router } from "express";
import { AuthonticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/user.controller";
import { Permissions } from "./controller/permission.controller";
import { CreateRole, DeleteRole, GetRole, Roles, UpdateRole } from "./controller/role.controller";
import { CreateResource, DeleteResource, GetResource, Resources, UpdateResource } from "./controller/resource.controller";
import { tagResource,createTag, getResourcesByTag } from "./controller/tag.controller"; 


export const routes = (router: Router) => {

    //CRUD registration & login
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthMiddleware, AuthonticatedUser);
    router.post('/api/logout', AuthMiddleware, Logout);
    router.put('/api/users/info', AuthMiddleware, UpdateInfo);
    router.put('/api/users/password', AuthMiddleware, UpdatePassword);
    
    //CRUD Users
    router.get('/api/users', AuthMiddleware, Users);
    router.post('/api/users', AuthMiddleware, CreateUser);
    router.get('/api/users/:id', AuthMiddleware, GetUser); 
    router.put('/api/users/:id', AuthMiddleware, UpdateUser); 
    router.delete('/api/users/:id',AuthMiddleware,DeleteUser );

    router.get('/api/permissions', AuthMiddleware, Permissions);

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

    
    // Tag a resource
    router.post('/api/resources/:resourceId/tags/:tagId', AuthMiddleware, tagResource);
    router.post('/api/tags', AuthMiddleware, createTag);
    router.get('/api/tags/:tagId/resources', AuthMiddleware, getResourcesByTag);

    //Rating 
  

    
    return router;
};
 