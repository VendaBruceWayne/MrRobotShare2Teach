/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Request, Response } from "express";
import multer from "multer";
import { extname, basename } from "path";
import fs from "fs";
import { createHash } from "crypto"; 
import { v4 as uuidv4 } from "uuid"; 

type FileStatus = "pending" | "approved" | "rejected";

interface FileMetadata {
    id: string;
    originalname: string;
    mimeType: string;
    size: number;
    path: string;
    extension: string;
    uploadedtime: string;
    createdAt: Date;
    modifiedAt: Date;
    hash: string;
    status: FileStatus;
}

const moderatedFiles: { [key: string]: FileMetadata } = {};

const generateFileHash = (filePath: string): string => {
    const fileBuffer = fs.readFileSync(filePath); 
    const hashSum = createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
};

const storage = multer.diskStorage({
    destination: "./src/uploads",
    filename(req, file, cb) {
        cb(null, `${Date.now()}${extname(file.originalname)}`);
    },
});

const upload = multer({ storage }).single("pdf");

export const Upload = (req: Request, res: Response): void => {
    try {
        upload(req, res, (err) => {
            if (err) {
                return res.status(500).json({ error: "File upload failed", details: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const uploadedFile = req.file as Express.Multer.File;
            const fileId = uuidv4();
            const fileHash = generateFileHash(uploadedFile.path);
            const originalName = basename(uploadedFile.originalname, extname(uploadedFile.originalname));

            const fileMetadata: FileMetadata = {
                id: fileId,
                originalname: uploadedFile.originalname,
                mimeType: uploadedFile.mimetype,
                size: uploadedFile.size,
                path: uploadedFile.path,
                extension: extname(uploadedFile.originalname),
                uploadedtime: new Date().toString(),
                createdAt: new Date(),
                modifiedAt: new Date(),
                hash: fileHash,
                status: "pending",
            };

            moderatedFiles[fileId] = fileMetadata;

            res.status(200).json({
                message: "File uploaded successfully and is pending moderation.",
                metadata: fileMetadata,
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "Sorry, we are experiencing problems on our side",
            error: (error as Error).message,
        });
    }
};

export const ModerateFile = (req: Request, res: Response) => {
    const { id } = req.params; 
    const { action } = req.body; 

    if (!id || !["approve", "reject"].includes(action)) {
        return res.status(400).json({ error: "Invalid input. Provide a valid file ID and action ('approve' or 'reject')." });
    }

    const file = moderatedFiles[id];

    if (!file) {
        return res.status(404).json({ error: `File with ID ${id} not found.` });
    }

    try {
        if (action === "approve") {
            file.status = "approved";
        } else if (action === "reject") {
            file.status = "rejected";

            try {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                } else {
                    throw new Error("File not found on the server.");
                }
            } catch (fsError) {
                return res.status(500).json({
                    error: "File deletion failed.",
                    details: (fsError as Error).message,
                });
            }
        }

        return res.status(200).json({
            message: `File ${action}d successfully.`,
            file,
        });

    } catch (error) {
        return res.status(500).json({
            error: "An unexpected error occurred while moderating the file.",
            details: (error as Error).message,
        });
    }
};

export const GetFileMetadata = (req: Request, res: Response) => {
    const { filename } = req.params;

    if (filename) {
        const file = moderatedFiles[filename];
        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }
        return res.status(200).json(file);
    }

    res.status(200).json(Object.values(moderatedFiles));
};

export const GetModeratedFiles = (req: Request, res: Response) => {
    const moderated = Object.values(moderatedFiles).filter(
        (file) => file.status === "approved" || file.status === "rejected"
    );
    res.status(200).json(moderated);
};
