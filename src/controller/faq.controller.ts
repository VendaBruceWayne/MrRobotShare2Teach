// src/controllers/faq.controller.ts
import { Request, Response } from 'express';
import { Faq } from '../models/Faq';

// Create FAQ
export const createFAQ = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
};

// Get All FAQs
export const getAllFAQs = async (req: Request, res: Response) => {
  try {
    const faqs = await Faq.findAll();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
};

// Get FAQ by ID
export const getFAQById = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findByPk(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQ' });
  }
};

// Update FAQ
export const updateFAQ = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findByPk(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    await faq.update(req.body);
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
};

// Delete FAQ
export const deleteFAQ = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findByPk(req.params.id);
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    await faq.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
};
