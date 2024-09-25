import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Document } from "../entity/document.entity";
import { Bookmark } from "../entity/bookmark.entity";


export const createBookmark = async (req: Request, res: Response) => {
    try {
        const documentRepository = getRepository(Document);
        const bookmarkRepository = getRepository(Bookmark);

        const documentID = parseInt(req.params.id, 10);
        const userID = (req as any).user.id;  // Assuming `user` is set by AuthMiddleware
        //const userID = (req as any).user.id;
        const document = await documentRepository.findOne({ where: { id: documentID } });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const newBookmark = bookmarkRepository.create({
            user: (req as any).user,
            document: document,
        }); //user: (req as any).user,

        await bookmarkRepository.save(newBookmark);
        res.status(201).json({ message: 'Document bookmarked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error bookmarking document', error });
    }
};
