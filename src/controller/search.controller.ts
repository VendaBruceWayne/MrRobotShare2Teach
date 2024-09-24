import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Resource } from "../entity/resource.entity";

export class ResourceController {
  static async searchResources(req: Request, res: Response) {
    try {
      const { query, category } = req.query;
      
      // Get the Resource repository
      const resourceRepository = getRepository(Resource);

      // Build the query dynamically
      let searchConditions: any = [];
      if (query) {
        searchConditions = [
          { title: query },
          { description: query }
        ];
      }

      // Add category condition if present
      if (category) {
        searchConditions.push({ category: category });
      }

      const resources = await resourceRepository.find({
        where: searchConditions,
        order: { uploadDate: 'DESC' }, // Order by latest uploaded
      });

      return res.json(resources);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching resources' });
    }
  }
}
