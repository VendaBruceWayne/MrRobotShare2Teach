/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { Resource } from "../entity/resource.entity";

// Fetch all resources
export const Resources = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || "1");

    try {
        const repository = getRepository(Resource);

        const [data, total] = await repository.findAndCount({
            take,
            skip: (page - 1) * take
        });

        res.send({
            data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        });

    } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ 
            message: "Error fetching resources", 
            error: (error as Error).message 
        });
    }
};
 
// Create a new resource
export const CreateResource = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(Resource);
        const resource = await repository.save(req.body);
        res.status(201).json(resource);
    } catch (error) {
        console.error("Error creating resource:", error);
        res.status(500).json({ 
            message: "Error creating resource", 
            error: (error as Error).message 
        });
    }
};
// Update report status of a resource
export const UpdateReportStatus = async (req: Request, res: Response) => {
    try {
        const resourceId = parseInt(req.params.id, 10);
        if (isNaN(resourceId)) {
            return res.status(400).json({ message: "Invalid resource ID" });
        }

        const { reported } = req.body; // Expecting a boolean value

        const repository = getManager().getRepository(Resource);
        const existingResource = await repository.findOne({ where: { id: resourceId } });

        if (!existingResource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        // Update reported status
        existingResource.reported = reported;

        await repository.save(existingResource);

        res.status(200).json(existingResource);
    } catch (error) {
        console.error("Error updating report status:", error);
        res.status(500).json({ 
            message: "Error updating report status", 
            error: (error as Error).message 
        });
    }
};

// Fetch all reported resources
export const GetReportedResources = async (req: Request, res: Response) => {
    try {
        const repository = getRepository(Resource);
        const reportedResources = await repository.find({
            where: { reported: true },
            relations: ['user', 'user.role'], // Optional: include user details if needed
        });

        res.status(200).json(reportedResources);
    } catch (error) {
        console.error("Error fetching reported resources:", error);
        res.status(500).json({ 
            message: "Error fetching reported resources", 
            error: (error as Error).message 
        });
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
        console.error("Error retrieving resource:", error);
        res.status(500).json({ 
            message: "Error retrieving resource", 
            error: (error as Error).message 
        });
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
        console.error("Error updating resource:", error);
        res.status(500).json({ 
            message: "Error updating resource", 
            error: (error as Error).message  
        });
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
        console.error("Error deleting resource:", error);
        res.status(500).json({ 
            message: "Error deleting resource", 
            error: (error as Error).message 
        });
    }
};
 