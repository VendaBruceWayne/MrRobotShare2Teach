/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Request, Response } from "express";
import multer from "multer";
import { extname, basename } from "path";
import fs from "fs";
import { createHash } from "crypto"; 
import { v4 as uuidv4 } from "uuid"; 
import { User } from "../entity/user.entity";
import { Resource } from "../entity/resource.entity";
import { getRepository, getManager } from "typeorm";


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

export const Upload = async (req: Request, res: Response): Promise<void> => {
    try {
        upload(req, res, async (err) => {
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

            // Create a new Resource instance
            const resource = new Resource();
            resource.title = req.body.title; // Get title from the request body
            resource.description = req.body.description; // Get description from the request body
            resource.pdf = uploadedFile.path; // Save the file path in the resource
            resource.moderationStatus = 'pending'; // Default status
           

            // Assign user if authenticated
            if (req.user) {
                resource.user = req.user as User; // Ensure you have user info in the request (e.g., from a middleware)
            }

            // Additional fields can be set here if needed
            // resource.tags = req.body.tags; // Assuming tags are sent in the body
            // resource.modules = req.body.modules; // Assuming modules are sent in the body

            // Save the resource in the database
            const resourceRepository = getRepository(Resource);
            await resourceRepository.save(resource); // Persist the new Resource entity

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
                message: "File uploaded successfully and resource created.",
                metadata: fileMetadata,
                resourceId: resource.id, // Return the ID of the newly created resource
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

export const GetModeratedFiles = async (req: Request, res: Response) => {
    try {
      const repository = getRepository(Resource);
      
      const take = Number(req.query.take) || 10; // Define take, default to 10
      const page = Number(req.query.page) || 1;  // Define page, default to 1
      
      const [data, total] = await repository.findAndCount({
        where: {
          moderationStatus: 'approved', // Fetch only approved files
        },
        take,
        skip: (page - 1) * take,
      });
  
      res.send({
        data,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      });
    } catch (error) {
      console.error("Error fetching moderated resources:", error);
      res.status(500).json({
        message: "Error fetching moderated resources",
        error: (error as Error).message,
      });
    }
  
  
};
