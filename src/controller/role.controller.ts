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
        console.error("Error fetching roles:", error);
        res.status(500).json({ message: "Failed to fetch roles", error });
    }
};

// Create a new role with permissions
export const CreateRole = async (req: Request, res: Response) => {
    try {
        const { name, permissions }: { name: string; permissions: number[] } = req.body;

        const roleRepository = getRepository(Role);
        const permissionRepository = getRepository(Permission);

        // Validate permissions existence
        const permissionEntities = await permissionRepository.findByIds(permissions);
        if (permissionEntities.length !== permissions.length) {
            return res.status(400).json({ message: "Some permissions are invalid." });
        }

        const role = roleRepository.create({ name, permissions: permissionEntities });
        await roleRepository.save(role);

        res.status(201).json(role);
    } catch (error) {
        console.error("Error creating role:", error);
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
        console.error("Error fetching role:", error);
        res.status(500).json({ message: "Failed to fetch role", error });
    }
};

// Update an existing role by ID with permissions
export const UpdateRole = async (req: Request, res: Response) => {
    try {
        const { name, permissions }: { name: string; permissions: number[] } = req.body;
        const roleId = parseInt(req.params.id, 10);

        if (isNaN(roleId)) {
            return res.status(400).json({ message: "Invalid role ID" });
        }

        const repository = getRepository(Role);
        const permissionRepository = getRepository(Permission);

        // Validate permissions existence
        const permissionEntities = await permissionRepository.findByIds(permissions);
        if (permissionEntities.length !== permissions.length) {
            return res.status(400).json({ message: "Some permissions are invalid." });
        }

        const role = await repository.findOne({
            where: { id: roleId } // Use an object with the where clause
        });

        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        role.name = name;
        role.permissions = permissionEntities;

        await repository.save(role);
        res.json(role);
    } catch (error) {
        console.error("Error updating role:", error);
        res.status(500).json({ message: "Failed to update role", error });
    }
};

// Delete a role by ID
export const DeleteRole = async (req: Request, res: Response) => {
    try {
        const roleId = parseInt(req.params.id, 10);

        if (isNaN(roleId)) {
            return res.status(400).json({ message: "Invalid role ID" });
        }

        const repository = getManager().getRepository(Role);
        const result = await repository.delete(roleId);

        if (result.affected === 0) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error("Error deleting role:", error);
        res.status(500).json({ message: "Failed to delete role", error });
    }
};
