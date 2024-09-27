/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";

// Fetch all users and exclude passwords
export const Users = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || "1");

    try {
        const repository = getRepository(User);

        const [users, total] = await repository.findAndCount({
            relations: ['role'],
            take,
            skip: (page - 1) * take
        });

        const result = users.map(u => {
            const { password, role, ...data } = u;
            const roleName = role ? role.name : null;
            return { ...data, role: roleName };
        });

        res.send({
            data: result,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({
            message: "An error occurred while fetching users",
            error: (error as Error).message
        });
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
        console.error("Error creating user:", error);
        res.status(500).send({
            message: "An error occurred while creating the user",
            error: (error as Error).message
        });
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
        console.error("Error fetching user:", error);
        res.status(500).send({
            message: "An error occurred while fetching the user",
            error: (error as Error).message
        });
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
        console.error("Error updating user:", error);
        res.status(500).send({
            message: "An error occurred while updating the user",
            error: (error as Error).message
        });
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
        console.error("Error deleting user:", error);
        res.status(500).send({
            message: "An error occurred while deleting the user",
            error: (error as Error).message
        });
    }
};
