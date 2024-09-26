import { Request, Response } from "express";
import multer from "multer";
import { extname } from "path";

// Define the file upload controller
export const Upload = (req: Request, res: Response): void => {
  try {
    // Configure multer storage for saving uploaded files
    const storage = multer.diskStorage({
      destination: "./uploads", // Set destination folder
      filename(req, file, cb) {
        // Create a unique filename with a timestamp and original extension
        cb(null, `${Date.now()}${extname(file.originalname)}`);
      },
    });

    // Set up multer to handle single PDF file upload
    const upload = multer({ storage }).single("pdf");

    // Execute file upload
    upload(req, res, (err) => {
      if (err) {
        // Return error if file upload fails
        return res.status(500).json({ error: "File upload failed", details: err.message });
      }

      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Return the file URL if the upload was successful
      res.status(200).json({
        url: `http://localhost:8000/api/uploads/${req.file.filename}`,
      });
    });
  } catch (error) {
    // Handle unexpected server errors
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
