import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";

// Fetch all users and exclude passwords
export const Users = async (req: Request, res: Response) => {
    try {
        const repository = getRepository(User);
        const users = await repository.find({
            relations: ['role']
        });

        const result = users.map(u => {
            const { password, role, ...data } = u;
            const roleName = role ? role.name : null;
            return { ...data, role: roleName };
        });

        res.status(200).send(result); 
    } catch (error) {
        res.status(500).send({ message: "Error fetching users", error: error.message });
    }
};


// Create a new user with a hashed password
export const CreateUser = async (req: Request, res: Response) => {
    try {
        const { role_id, ...body } = req.body;
        const hashedPassword = await bcryptjs.hash("12345678@T", 10);
        const repository = getRepository(User);
        const user = await repository.save({
            ...body,
            password: hashedPassword,
            role: {
                id: role_id,
            },
        });
        res.status(201).send(user);  
    } catch (error) {
        res.status(500).send({ message: "Error creating user", error: error.message });
    }
};

// Fetch a single user by ID and exclude password
export const GetUser = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(User);
        const userId = parseInt(req.params.id, 10);

        const user = await repository.findOne({
            where: { id: userId },
            relations: ['role'],
        });

        if (user) {
            const { password, role, ...data } = user;
            const roleName = role ? role.name : null;
            res.status(200).send({ ...data, role: roleName });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error fetching user", error: error.message });
    }
};


// Update user information excluding password
export const UpdateUser = async (req: Request, res: Response) => {
    try {
        const { role_id, ...body } = req.body;
        const repository = getRepository(User);
        const userId = parseInt(req.params.id, 10);

        const user = await repository.findOne({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).send({ message: "User not found" });  
        }

        await repository.update(userId, body);

        const updatedUser = await repository.findOne({
            where: { id: userId },
            ...body,
            role: {
                id: role_id,
            }
        });

        if (updatedUser) {
            const { password, ...data } = updatedUser;
            return res.status(202).send(data);  
        }
    } catch (error) {
        return res.status(500).send({ message: "Error updating user", error: error.message });
    }
};

// Delete user endpoint
export const DeleteUser = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(User);
        const userId = parseInt(req.params.id, 10);

        const result = await repository.delete(userId);

        if (result.affected === 0) {
            return res.status(404).send({ message: "User not found" });  
        }

        res.status(204).send(); 
    } catch (error) {
        res.status(500).send({ message: "Error deleting user", error: error.message });
    }
};
