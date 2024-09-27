import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Faq } from '../entity/faq.entity';

// Create FAQ
export const createFAQ = async (req: Request, res: Response) => {
  try {
    const faqRepository = getRepository(Faq);
    const faq = faqRepository.create(req.body); // Create a new FAQ instance
    await faqRepository.save(faq); // Save the FAQ to the database
    return res.status(201).json(faq);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to create FAQ', message: error.message });
  }
};

// Get All FAQs
export const getAllFAQs = async (req: Request, res: Response) => {
  try {
    const faqRepository = getRepository(Faq);
    const faqs = await faqRepository.find(); // Find all FAQs
    return res.status(200).json(faqs);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch FAQs', message: error.message });
  }
};

// Get FAQ by ID
export const getFAQById = async (req: Request, res: Response) => {
  try {
    const faqRepository = getRepository(Faq);
    const faqId = parseInt(req.params.id, 10); // Parse id to a number
    if (isNaN(faqId)) {
      return res.status(400).json({ error: 'Invalid FAQ ID' });
    }
    const faq = await faqRepository.findOne({ where: { id: faqId } }); // Use FindOneOptions
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    return res.status(200).json(faq);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch FAQ', message: error.message });
  }
};

// Update FAQ
export const updateFAQ = async (req: Request, res: Response) => {
  try {
    const faqRepository = getRepository(Faq);
    const faqId = parseInt(req.params.id, 10); // Parse id to a number
    if (isNaN(faqId)) {
      return res.status(400).json({ error: 'Invalid FAQ ID' });
    }
    const faq = await faqRepository.findOne({ where: { id: faqId } }); // Use FindOneOptions
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    faqRepository.merge(faq, req.body); // Update FAQ with new values
    await faqRepository.save(faq); // Save the updated FAQ to the database
    return res.status(200).json(faq);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to update FAQ', message: error.message });
  }
};

// Delete FAQ
export const deleteFAQ = async (req: Request, res: Response) => {
  try {
    const faqRepository = getRepository(Faq);
    const faqId = parseInt(req.params.id, 10); // Parse id to a number
    if (isNaN(faqId)) {
      return res.status(400).json({ error: 'Invalid FAQ ID' });
    }
    const faq = await faqRepository.findOne({ where: { id: faqId } }); // Use FindOneOptions
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }
    await faqRepository.remove(faq); // Delete the FAQ
    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to delete FAQ', message: error.message });
  }
};
