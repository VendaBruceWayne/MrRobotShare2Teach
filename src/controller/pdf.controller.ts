import { Request, Response, Router } from "express";
import multer from "multer";
import { extname, basename } from "path";
import fs from "fs";
import { createHash } from "crypto"; // To generate file hash
import { v4 as uuidv4 } from "uuid"; // To generate a unique identifier

// Define the moderation status
type FileStatus = "pending" | "approved" | "rejected";

// Define the file metadata interface
interface FileMetadata {
    id: string;               // Unique identifier for the file
    originalname: string;      // Original file name
    mimeType: string;          // MIME type
    size: number;              // File size in bytes
    path: string;              // File path
    extension: string;         // File extension
    uploadedtime: string;      // Upload timestamp
    createdAt: Date;           // Metadata creation time
    modifiedAt: Date;          // Metadata modification time
    hash: string;              // File hash (MD5, SHA256, etc.)
    status: FileStatus;        // Moderation status
}

// Sample in-memory storage for moderation (could be a database in a real app)
const moderatedFiles: { [key: string]: FileMetadata } = {};

// Function to generate a file hash (SHA256)
const generateFileHash = (filePath: string): string => {
    const fileBuffer = fs.readFileSync(filePath); 
    const hashSum = createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
};

// Multer storage configuration
const storage = multer.diskStorage({
    destination: "./uploads", // Set destination folder
    filename(req, file, cb) {
        // Create a unique filename with a timestamp and original extension
        cb(null, `${Date.now()}${extname(file.originalname)}`);
    },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage }).single("pdf");

// Define the file upload controller
export const Upload = (req: Request, res: Response): void => {
    try {
        // Execute file upload using multer
        upload(req, res, (err) => {
            if (err) {
                // Return error if file upload fails
                return res.status(500).json({ error: "File upload failed", details: err.message });
            }

            // Check if a file was uploaded
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            // Assert that req.file is of the correct type
            const uploadedFile = req.file as Express.Multer.File;

            // Generate metadata
            const fileId = uuidv4(); // Unique ID for the file
            const fileHash = generateFileHash(uploadedFile.path); // Hash for integrity check
            const originalName = basename(uploadedFile.originalname, extname(uploadedFile.originalname)); // Base name without extension

            // Get Metadata for the file
            const fileMetadata: FileMetadata = {
                id: fileId,
                originalname: uploadedFile.originalname,
                mimeType: uploadedFile.mimetype,
                size: uploadedFile.size,
                path: uploadedFile.path,
                extension: extname(uploadedFile.originalname),
                uploadedtime: new Date().toString(),
                createdAt: new Date(), // Record the creation time
                modifiedAt: new Date(), // Record the modification time
                hash: fileHash, // Store file hash
                status: "pending" // Set initial status to pending
            };

            // Store the file metadata in memory for moderation (you can use a database)
            moderatedFiles[uploadedFile.filename] = fileMetadata;

            // Return the file metadata if the upload was successful
            res.status(200).json({
                message: "File uploaded successfully and is pending moderation.",
                metadata: fileMetadata,
            });
        });
    } catch (error) {
        console.error("Server Error", error);
        res.status(500).send({
            message: "Sorry, we are experiencing problems on our side",
            error: (error as Error).message,
        });
    }
};

// Moderation review function
export const ModerateFile = (req: Request, res: Response) => {
    const { filename, action } = req.body; // action can be "approve" or "reject"

    if (!filename || !["approve", "reject"].includes(action)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const file = moderatedFiles[filename];

    if (!file) {
        return res.status(404).json({ error: "File not found" });
    }

    if (action === "approve") {
        file.status = "approved"; // Update the status to approved
    } else {
        file.status = "rejected"; // Update the status to rejected
        fs.unlinkSync(file.path); // Optionally delete the file from the server
    }

    res.status(200).json({
        message: `File ${action}d successfully.`,
        file,
    });
};

// Function to retrieve metadata for all files or a specific file
export const GetFileMetadata = (req: Request, res: Response) => {
    const { filename } = req.params;

    if (filename) {
        const file = moderatedFiles[filename];
        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }
        return res.status(200).json(file);
    }

    // If no specific filename is provided, return metadata for all files
    res.status(200).json(Object.values(moderatedFiles));
};

// Function to retrieve all moderated files
export const GetModeratedFiles = (req: Request, res: Response) => {
    const moderated = Object.values(moderatedFiles).filter(
        (file) => file.status === "approved" || file.status === "rejected"
    );
    res.status(200).json(moderated);
};

 