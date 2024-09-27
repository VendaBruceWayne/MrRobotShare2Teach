/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Document } from "../entity/document.entity";
import { Download } from "../entity/download.entity";


export const createDownload = async (req: Request, res: Response) => {
    try {
        const documentRepository = getRepository(Document);
        const downloadRepository = getRepository(Download);

        const documentID = parseInt(req.params.id, 10);
        const userID = (req as any).user.id;  // Assuming `user` is set by AuthMiddleware

        const document = await documentRepository.findOne({ where: { id: documentID } });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const newDownload = downloadRepository.create({
            user: (req as any).user,
            document: document,
        });

        await downloadRepository.save(newDownload);
        res.status(201).json({ message: 'Document downloaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error downloading document', error });
    }
};
