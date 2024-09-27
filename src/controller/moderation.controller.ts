import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Resource } from "../entity/resource.entity";
import { User } from "../entity/user.entity";

// Moderator can approve or reject a resource
export const moderateResource = async (req: Request, res: Response): Promise<Response> => {
    try {
        const resourceId = parseInt(req.params.resourceId, 10); // Ensure resourceId is an integer
        const { moderationStatus, moderationComments } = req.body;  // New moderation status and comments
        const moderatorId = req.user?.id;  // ID of the currently authenticated moderator

        if (!moderatorId) {
            return res.status(403).json({ message: "Unauthorized: No moderator found" });
        }

        const resourceRepository = getRepository(Resource);
        const userRepository = getRepository(User);

        // Find the resource to be moderated
        const resource = await resourceRepository.findOne({ where: { id: resourceId } });
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        // Ensure that the user performing this action is a moderator
        const moderator = await userRepository.findOne({ where: { id: moderatorId }, relations: ["role"] });
        if (!moderator || moderator.role.name !== "Moderator") {
            return res.status(403).json({ message: "Unauthorized: You do not have moderation rights" });
        }

        // Update the resource moderation status and comments
        resource.moderationStatus = moderationStatus;
        resource.moderationComments = moderationComments;
        resource.moderatedBy = moderator; // Assuming `moderatedBy` is of type User

        // Save the updated resource
        await resourceRepository.save(resource);

        return res.status(200).json({
            message: "Resource moderation updated successfully",
            resource
        });
    } catch (error) {
        console.error("Moderation Error: ", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};
