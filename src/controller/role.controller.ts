import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Role } from "../entity/role.entity";
import { Permission } from "../entity/permission.entity";

// Get all roles with permissions
export const Roles = async (req: Request, res: Response) => {
    try {
        const repository = getRepository(Role);
        const roles = await repository.find({ relations: ['permissions'] });
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch roles", error });
    }
};

// Create a new role with permissions
export const CreateRole = async (req: Request, res: Response) => {
    try {
        const { name, permissions } = req.body;

        const roleRepository = getRepository(Role);
        const permissionRepository = getRepository(Permission);

        const permissionEntities = await permissionRepository.findByIds(permissions);

        const role = roleRepository.create({ name, permissions: permissionEntities });
        await roleRepository.save(role);

        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: "Failed to create role", error });
    }
};

// Get a specific role by ID with permissions
export const GetRole = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.id, 10);

        if (isNaN(roleId)) {
            return res.status(400).json({ message: "Invalid role ID" });
        }

        const repository = getRepository(Role);
        const role = await repository.findOne({
            where: { id: roleId },
            relations: ['permissions']
        });

        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.json(role);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch role", error });
    }
};

// Update an existing role by ID with permissions
export const UpdateRole = async (req: Request, res: Response) => {
    try {
        const { name, permissions } = req.body;
        const roleId = parseInt(req.params.id, 10);

        if (isNaN(roleId)) {
            return res.status(400).json({ message: "Invalid role ID" });
        }

        const repository = getRepository(Role);
        const permissionRepository = getRepository(Permission);
        const permissionEntities = await permissionRepository.findByIds(permissions);

        const role = await repository.save({
            id: roleId,
            name,
            permissions: permissionEntities
        });

        res.json(role);
    } catch (error) {
        res.status(500).json({ message: "Failed to update role", error });
    }
};

export const DeleteRole =  async (req: Request, res: Response) => {
   const repository = getManager().getRepository(Role)
   await repository.delete(req.params.id);
   res.status(204).send(null)
};