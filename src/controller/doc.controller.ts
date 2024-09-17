import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Document } from "../entity/document.entity";
import { User } from "../entity/user.entity";
import { View } from "../entity/view.entity";
import { Bookmark } from "../entity/bookmark.entity";
import { parse } from "path";


// 1.Function to get overall document analytics
export const getAllDocuments = async (req: Request, res: Response) => {
    try {
        const documentRepository = getManager().getRepository(Document);
        const documents = await documentRepository.find({
            relations: ['userID'],  // This includes the related User entity
            order: {
                uploadDate: 'DESC',  // Sorting by upload date in descending order
            },
            select: [
                'id', 'title', 'view', 'bookmark', 'documentType', 'uploadDate', 'viewDuration', 'lastViewed'
            ],
        });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all documents', error });
    }
};
  

 // 2.Get a Single Document by ID
 export const getDocumentById = async (req: Request, res: Response) => {
    try {
        const documentRepository = getManager().getRepository(Document);
        const documentID = parseInt(req.params.id, 10);
        const document = await documentRepository.findOne({
            relations: ['userID'],  // This includes the related User entity
            select: [
                'id', 'title', 'view', 'bookmark', 'documentType', 'uploadDate', 'viewDuration', 'lastViewed'
            ],
        });

        if (document) {
            res.status(200).json(document);
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


 // 3.Get Most Viewed Document(s)
 export const getMostViewedDocuments = async (req: Request, res: Response) => {
    try {
        const documentRepository = getManager().getRepository(Document);
        const documents = await documentRepository.find({
            relations: ['userID'],  // This includes the related User entity
            order: {
                view: 'DESC',
            },
            take: 1,  // Limit to 1 document
            select: [
                'id', 'title', 'view', 'bookmark', 'documentType', 'uploadDate', 'viewDuration', 'lastViewed'
            ],
        });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


 // 4.Get Least Viewed Document(s)
 export const getLeastViewedDocuments = async (req: Request, res: Response) => {
    try {
        const documentRepository = getManager().getRepository(Document);
        const documents = await documentRepository.find({
            relations: ['userID'],  // This includes the related User entity
            order: {
                view: 'ASC',
            },
            take: 1,  // Limit to 1 document
            select: [
                'id', 'title', 'view', 'bookmark', 'documentType', 'uploadDate', 'viewDuration', 'lastViewed'
            ],
        });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


 // 5.Get the Most Bookmarked Document(s)
 export const getMostBookmarkedDocuments = async (req: Request, res: Response) => {
    try {
        const documentRepository = getManager().getRepository(Document);
        const documents = await documentRepository.find({
            relations: ['userID'],  // This includes the related User entity
            order: {
                bookmark: 'DESC',
            },
            take: 1,  // Limit to 1 document
            select: [
                'id', 'title', 'view', 'bookmark', 'documentType', 'uploadDate', 'viewDuration', 'lastViewed'
            ],
        });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


 // 6.Get the least Bookmarked Document(s)
 export const getLeastBookmarkedDocuments = async (req: Request, res: Response) => {
    try {
        const documentRepository = getManager().getRepository(Document);
        const documents = await documentRepository.find({
            relations: ['userID'],  // This includes the related User entity
            order: {
                bookmark: 'ASC',
            },
            take: 1,  // Limit to 1 document
            select: [
                'id', 'title', 'view', 'bookmark', 'documentType', 'uploadDate', 'viewDuration', 'lastViewed'
            ],
        });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


 // 7.Get the Most Downloaded Document(s)
 export const getMostDownloadedDocuments = async (req: Request, res: Response) => {
    try {
        const documentRepository = getManager().getRepository(Document);
        const documents = await documentRepository.find({
            relations: ['userID'],  // This includes the related User entity
            order: {
                download: 'DESC',
            },
            take: 1,  // Limit to 1 document
            select: [
                'id', 'title', 'view', 'bookmark', 'documentType', 'uploadDate', 'viewDuration', 'lastViewed'
            ],
        });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


 // 8.Get the least Downloaded Document(s)
 export const getLeastDownloadedDocuments = async (req: Request, res: Response) => {
    try {
        const documentRepository = getManager().getRepository(Document);
        const documents = await documentRepository.find({
            relations: ['userID'],  // This includes the related User entity
            order: {
                download: 'ASC',  
            },
            take: 1,  // Limit to 1 document
            select: [
                'id', 'title', 'view', 'bookmark', 'documentType', 'uploadDate', 'viewDuration', 'lastViewed'
            ],
        });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
