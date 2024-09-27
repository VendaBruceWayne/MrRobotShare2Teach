import { Request, Response, NextFunction } from "express";
import { User } from '../entity/user.entity'; // Import the User entity
import { Permission } from '../entity/permission.entity'; // Import the Permission entity

// Middleware to check if the user has the required permission
export const PermissionMiddleware = (requiredPermission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: User | undefined = req.user; // Assume `req.user` is populated by some authentication middleware

            // Check if the user exists and has a role
            if (!user || !user.role || !user.role.permissions) {
                return res.status(403).json({ error: "Forbidden: User not found or permissions not available." });
            }

            // Extract the user's permissions
            const userPermissions: Permission[] = user.role.permissions;

            // Check if the user has the required permission
            const hasPermission = userPermissions.some((permission) => permission.name === requiredPermission);

            if (!hasPermission) {
                return res.status(401).json({ error: "Unauthorized: Insufficient permissions" });
            }

            next(); // If the user has the required permission, proceed to the next middleware or route handler
        } catch (error) {
            console.error("Error checking permissions:", error);
            return res.status(500).json({ error: "Internal server error while checking permissions." });
        }
    };
};
