import { Request, Response, NextFunction } from 'express';
import { verify, JsonWebTokenError } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwt = req.cookies['jwt'];

        // Check if JWT is present
        if (!jwt) {
            return res.status(401).send({ message: "No token provided!" });
        }

        const payload: any = verify(jwt, process.env.SECRET_KEY);

        if (!payload) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { id: payload.id } });

        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }

        (req as any).user = user;  // Cast `req` to any to bypass TypeScript error

        next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(401).send({ message: "Invalid token" });
        }
        return res.status(500).send({ message: "Internal Server Error" });
    }
};
