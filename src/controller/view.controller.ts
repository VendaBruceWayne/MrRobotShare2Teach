// src/controller/view.controller.ts
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Document } from "../entity/document.entity";
import { View } from "../entity/view.entity";

export const createView = async (req: Request, res: Response) => {
    try {
        const documentRepository = getRepository(Document);
        const viewRepository = getRepository(View);

        const documentID = parseInt(req.params.id, 10);
        
        // Cast req as any to bypass TypeScript error
        const userID = (req as any).user.id;
        if (!userID) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        const document = await documentRepository.findOne({ where: { id: documentID } });

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const newView = viewRepository.create({
            user: (req as any).user,  // TypeScript now knows `req.user` exists
            document: document,
            viewStart: new Date(),
            viewEnd: new Date(),
            duration: 5  // Example fixed duration
        });

        await viewRepository.save(newView);
        res.status(201).json({ message: 'Document viewed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error viewing document', error });
    }
};
