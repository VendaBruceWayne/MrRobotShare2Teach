import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';

// Extend the Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: User; // Make sure the User type is correctly imported
        }
    }
}

// Auth middleware
export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwt = req.cookies['jwt'];

        // Check if the JWT and secret key are provided
        if (!jwt || !process.env.SECRET_KEY) {
            return res.status(401).send({ message: "Unauthorized! Missing token or secret key" });
        }

        // Verify the JWT token
        const payload: any = verify(jwt, process.env.SECRET_KEY);

        // Check if payload is valid
        if (!payload || !payload.id) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        // Fetch the user associated with the token
        const repository = getManager().getRepository(User);
        const user = await repository.findOne({
            where: { id: payload.id },
            relations: ['role', 'role.permissions'],
        });

        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;

        // Continue to the next middleware
        next();
    } catch (error) {
        return res.status(401).send({
            message: "Not signed in",
            error: (error as any).message
        });
    }
};
