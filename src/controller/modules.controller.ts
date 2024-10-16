/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Request, Response } from 'express';
import { getRepository, getManager } from 'typeorm';
import { Module } from '../entity/module.entity';

// Fetch all modules
export const getModules = async (req: Request, res: Response) => {
    try {
        const moduleRepository = getRepository(Module);
        const modules = await moduleRepository.find(); // Fetch all modules

        return res.status(200).json(modules); // Return the list of modules
    } catch (error) {
        console.error('Error fetching modules:', error);
        return res.status(500).json({
            message: 'Error fetching modules',
            error: (error as Error).message,
        });
    }
};

// Create a new module
export const createModule = async (req: Request, res: Response) => {
    try {
        const moduleRepository = getRepository(Module);
        const { name } = req.body; // Get module name from request body

        const module = moduleRepository.create({ name });
        await moduleRepository.save(module);

        return res.status(201).json(module); // Return created module
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating module',
            error: (error as Error).message,
        });
    }
};

// Delete a module by ID
export const deleteModule = async (req: Request, res: Response) => {
    try {
        const moduleId = parseInt(req.params.id, 10);
        if (isNaN(moduleId)) {
            return res.status(400).json({ message: 'Invalid module ID' });
        }

        const repository = getManager().getRepository(Module);
        const existingModule = await repository.findOne({ where: { id: moduleId } });
        if (!existingModule) {
            return res.status(404).json({ message: 'Module not found' });
        }

        await repository.delete(moduleId);
        return res.status(204).send(); // Return no content status
    } catch (error) {
        console.error('Error deleting module:', error);
        return res.status(500).json({
            message: 'Error deleting module',
            error: (error as Error).message,
        });
    }
};
