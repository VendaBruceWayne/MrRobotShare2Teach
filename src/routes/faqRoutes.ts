// src/routes/faqRoutes.ts

import { Router } from 'express';
import { createFAQ, getFAQById, getAllFAQs, updateFAQ, deleteFAQ } from '../controller/faq.controller';

const router = Router();

// Define routes for FAQs
router.post('/faqs', createFAQ);
router.get('/faqs/:id', getFAQById);
router.get('/faqs', getAllFAQs);
router.put('/faqs/:id', updateFAQ);
router.delete('/faqs/:id', deleteFAQ);

export default router;


/*import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Faq } from "../models/Faq";

const router: Router = Router();

// Get all FAQs
router.get("/faqs", async (req: Request, res: Response) => {
  try {
    const faqs = await Faq.findAll();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve FAQs" });
  }
});


// Create a new FAQ with validation
/*router.post(
  "/faqs",
  [
    body("question").notEmpty().withMessage("Question is required"),
    body("answer").notEmpty().withMessage("Answer is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, answer } = req.body;
    try {
      const newFaq = await Faq.create({question, answer });
      res.status(201).json(newFaq);
    } catch (error) {
      console.error('Error creating FAQ:', error);
      res.status(500).json({ error: "Failed to create FAQ" });
    }
  });


  export const createFaq = async (req: Request, res: Response) => {
    try {
      const { question, answer } = req.body;
  
      // Cast req.body to the Faq model's type
      const newFaq = await Faq.create({ question, answer } as Faq);
  
      res.status(201).json(newFaq);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Update an existing FAQ
router.put(
  "/faqs/:id",
  [
    body("question").notEmpty().withMessage("Question is required"),
    body("answer").notEmpty().withMessage("Answer is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { question, answer } = req.body;

    try {
      const faq = await Faq.findByPk(id);
      if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
      }

      faq.question = question;
      faq.answer = answer;
      await faq.save();

      res.json(faq);
    } catch (error) {
      res.status(500).json({ error: "Failed to update FAQ" });
    }
  }
);

// Delete a FAQ
router.delete("/faqs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const faq = await Faq.findByPk(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    await faq.destroy();
    res.json({ message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete FAQ" });
  }
});

export default router;
*/

