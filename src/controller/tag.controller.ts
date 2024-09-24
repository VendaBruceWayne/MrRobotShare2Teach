import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Resource } from "../entity/resource.entity";
 import { Tag } from "../entity/tag.entity";

// Tag a resource
export const tagResource = async (req: Request, res: Response) => {
    const resourceId = req.params.resourceId;
    const { tagName } = req.body;

    try {
        const resourceRepository = getRepository(Resource);
        const tagRepository = getRepository(Tag);

        // Find the resource
       
       // Fetch a specific resource by ID with tags
const resourceId = parseInt(req.params.id, 10); // Convert resourceId to a number
if (isNaN(resourceId)) {
    return res.status(400).json({ message: "Invalid resource ID" });
}

const resource = await resourceRepository.findOne({
    where: { id: resourceId },
    relations: ["tags"]
});
    
    
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        // Find or create the tag
        let tag = await tagRepository.findOne({ where: { name: tagName } });
        if (!tag) {
            tag = tagRepository.create({ name: tagName });
            await tagRepository.save(tag);
        }

        // Associate the tag with the resource if not already tagged
        if (!resource.tags.some(existingTag => existingTag.id === tag.id)) {
            resource.tags.push(tag as Tag);
            await resourceRepository.save(resource);
        }

        return res.status(200).json({ message: "Tag added to resource", resource });
    } catch (error) {
        return res.status(500).json({ message: "Error tagging resource", error: error.message });
    }
};

// Get resources by tag
export const getResourcesByTag = async (req: Request, res: Response) => {
    const { tagName } = req.params;

    try {
        const tagRepository = getRepository(Tag);
        const tag = await tagRepository.findOne({ where: { name: tagName }, relations: ["resources"] });
        
        if (!tag) {
            return res.status(404).json({ message: "Tag not found" });
        }

        return res.status(200).json(tag.resources);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching resources by tag", error: error.message });
    }
};

// Create a new tag
export const createTag = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const tagRepository = getRepository(Tag);
        let tag = await tagRepository.findOne({ where: { name } });

        if (tag) {
            return res.status(400).json({ message: "Tag already exists" });
        }

        tag = tagRepository.create({ name });
        await tagRepository.save(tag);

        return res.status(201).json(tag);
    } catch (error) {
        return res.status(500).json({ message: "Error creating tag", error: error.message });
    }
};
