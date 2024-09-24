import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Resource } from '../entity/resource.entity';

// Search for resources
export const searchResources = async (req: Request, res: Response): Promise<void> => {
    const { query, page = 1, limit = 10 } = req.query;

    // Validate query parameter
    if (!query || typeof query !== 'string') {
        res.status(400).json({ message: 'Query parameter is required and must be a string' });
        return;
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        res.status(400).json({ message: 'Page and limit must be valid positive numbers' });
        return;
    }

    try {
        const resources = await Resource.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { description: { [Op.iLike]: `%${query}%` } },
                ],
            },
            limit: limitNum,  // Pagination limit
            offset: (pageNum - 1) * limitNum,  // Pagination offset
            attributes: ['id', 'title', 'description'],  // Limit returned fields
        });

        if (resources.length === 0) {
            res.status(404).json({ message: 'No resources found' });
            return;
        }

        res.json({
            totalResults: resources.length,
            currentPage: pageNum,
            resources
        });
    } catch (error) {
        console.error('Error searching resources:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
};
