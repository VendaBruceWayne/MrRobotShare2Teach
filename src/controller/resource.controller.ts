import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { Resource } from "../entity/resource.entity";

// Fetch all resources
export const Resources = async (req: Request, res: Response) => {
    try {
        const repository = getRepository(Resource);
        const resources = await repository.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Error fetching resources", error: error.message });
    }
};

// Create a new resource
export const CreateResource = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(Resource);
        const resource = await repository.save(req.body);
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ message: "Error creating resource", error: error.message });
    }
};

// Fetch a specific resource by ID
export const GetResource = async (req: Request, res: Response) => {
    try {
        const resourceId = parseInt(req.params.id, 10);
        if (isNaN(resourceId)) {
            return res.status(400).json({ message: "Invalid resource ID" });
        }

        const repository = getManager().getRepository(Resource);
        const resource = await repository.findOne({
            where: { id: resourceId },
            relations: ['user', 'user.role'],
        });

        if (resource) {
            const { user, ...data } = resource;
            const roleName = user?.role?.name || null;
            res.status(200).json({ ...data, role: roleName });
        } else {
            res.status(404).json({ message: "Resource not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving resource", error: error.message });
    }
};

// Update an existing resource
export const UpdateResource = async (req: Request, res: Response) => {
    try {
        const resourceId = parseInt(req.params.id, 10);
        if (isNaN(resourceId)) {
            return res.status(400).json({ message: "Invalid resource ID" });
        }

        const repository = getManager().getRepository(Resource);
        const existingResource = await repository.findOne({ where: { id: resourceId } });
        if (!existingResource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        await repository.update(resourceId, req.body);
        const updatedResource = await repository.findOne({ where: { id: resourceId } });
        res.status(202).json(updatedResource);
    } catch (error) {
        res.status(500).json({ message: "Error updating resource", error: error.message });
    }
};

// Delete a resource
export const DeleteResource = async (req: Request, res: Response) => {
    try {
        const resourceId = parseInt(req.params.id, 10);
        if (isNaN(resourceId)) {
            return res.status(400).json({ message: "Invalid resource ID" });
        }

        const repository = getManager().getRepository(Resource);
        const existingResource = await repository.findOne({ where: { id: resourceId } });
        if (!existingResource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        await repository.delete(resourceId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting resource", error: error.message });
    }
};