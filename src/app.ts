import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import conversionRoutes from './routes/conversionRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Multer for file uploads, specifying the destination and naming convention for uploaded files
const storage = multer.diskStorage({
  destination: './uploads/', // Folder where uploaded files will be stored
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp to avoid name conflicts
  },
});

const upload = multer({ storage });

// Middleware to handle JSON request bodies
app.use(express.json());

// Use the conversion routes and pass the multer upload object for file handling
app.use('/api/convert', conversionRoutes(upload));

// Start the server and listen on a specific port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
