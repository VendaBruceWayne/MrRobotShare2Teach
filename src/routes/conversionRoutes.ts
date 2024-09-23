import { Router } from 'express';
import {
  convertPdfToDocx,
  extractTextFromPdf,
  convertPdfToImage,
  convertImageToPdf
} from '../controller/conversion.controller';

const conversionRoutes = (upload: any) => {
  const router = Router();

  // Route for converting PDF to DOCX
  router.post('/pdf-to-docx', upload.single('file'), convertPdfToDocx);

  // Route for extracting text from PDF
  router.post('/pdf-to-text', upload.single('file'), extractTextFromPdf);

  // Route for converting PDF to an image (PNG or JPEG)
  router.post('/pdf-to-image', upload.single('file'), convertPdfToImage);

  // Route for converting image (PNG/JPEG) to PDF
  router.post('/image-to-pdf', upload.single('file'), convertImageToPdf);

  return router;
};

export default conversionRoutes;
