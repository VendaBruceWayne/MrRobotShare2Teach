import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';  // For manipulating PDF files
import pdfParse from 'pdf-parse';       // For extracting text from PDF
import { exec } from 'child_process';   // To execute shell commands

// Convert PDF to DOCX using Pandoc
export const convertPdfToDocx = async (req: Request, res: Response) => {
  const pdfFilePath = req.file?.path; // Get the uploaded PDF file path
  if (!pdfFilePath) {
    return res.status(400).send('No PDF file uploaded.'); // Return error if no file was uploaded
  }

  const outputPath = path.join(__dirname, '../../uploads/', `${Date.now()}.docx`);
  
  // Execute Pandoc command to convert PDF to DOCX
  exec(`pandoc "${pdfFilePath}" -o "${outputPath}"`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Conversion error: ${error.message}`); // Handle errors during conversion
    }
    // Send the converted DOCX file for download
    return res.download(outputPath, 'converted.docx');
  });
};

// Extract Text from PDF using pdf-parse
export const extractTextFromPdf = async (req: Request, res: Response) => {
  const pdfFilePath = req.file?.path; // Get the uploaded PDF file path
  if (!pdfFilePath) {
    return res.status(400).send('No PDF file uploaded.');
  }

  const dataBuffer = fs.readFileSync(pdfFilePath); // Read the file into a buffer
  const pdfData = await pdfParse(dataBuffer);      // Extract text data from the PDF

  // Send extracted text as response
  res.send(pdfData.text);
};

// Convert PDF to Image using external tool (ImageMagick or similar)
export const convertPdfToImage = async (req: Request, res: Response) => {
  const pdfFilePath = req.file?.path;
  if (!pdfFilePath) {
    return res.status(400).send('No PDF file uploaded.');
  }

  const outputPath = path.join(__dirname, '../../uploads/', `${Date.now()}.png`);
  
  // Use ImageMagick's 'convert' command to create an image from the PDF
  exec(`convert -density 300 "${pdfFilePath}" -quality 100 "${outputPath}"`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Image conversion error: ${error.message}`); // Handle conversion errors
    }
    // Send the converted image file for download
    return res.download(outputPath, 'converted.png');
  });
};

// Convert Image (JPEG/PNG) to PDF using PDF-lib
export const convertImageToPdf = async (req: Request, res: Response) => {
  const imageFilePath = req.file?.path; // Get the uploaded image file path
  if (!imageFilePath) {
    return res.status(400).send('No image file uploaded.');
  }

  const imageBuffer = fs.readFileSync(imageFilePath);  // Read the image file into a buffer
  const pdfDoc = await PDFDocument.create();           // Create a new PDF document

  // Embed the uploaded image into the PDF
  const image = await pdfDoc.embedJpg(imageBuffer);    // Assuming the uploaded file is a JPG image
  const page = pdfDoc.addPage();                       // Add a new page to the PDF document
  page.drawImage(image, {                              // Draw the image on the page
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
  });

  const pdfBytes = await pdfDoc.save();  // Save the PDF document as bytes
  const outputPath = path.join(__dirname, '../../uploads/', `${Date.now()}.pdf`);
  fs.writeFileSync(outputPath, pdfBytes); // Write the PDF bytes to a file

  // Send the newly created PDF file for download
  res.download(outputPath, 'converted.pdf');
};
