/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Resource } from "../entity/resource.entity";

export class SearchController {
    async searchResources(req: Request, res: Response): Promise<Response> {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        const resourceRepository = getRepository(Resource);
        try {
            const resources = await resourceRepository.createQueryBuilder('resource')
                .where('resource.title LIKE :query OR resource.description LIKE :query', { query: `%${query}%` })
                .getMany();

            return res.json(resources);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while searching for resources' });
        }
    }
}