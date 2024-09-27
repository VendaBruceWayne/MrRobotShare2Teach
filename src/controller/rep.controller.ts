/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from "../entity/user.entity";

export class repController {

    // Fetch the user registration count for a given date range
    async getUserRegistrationReport(req: Request, res: Response) {
        const { startDate, endDate } = req.query;

        try {
            const userRepository = getRepository(User);

            const userRegistrations = await userRepository
                .createQueryBuilder("user")
                .where("user.createdAt >= :startDate", { startDate })
                .andWhere("user.createdAt <= :endDate", { endDate })
                .getCount();

            return res.json({ totalRegistrations: userRegistrations });
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching report', error });
        }
    }



    // Fetch the most active users by registration/update date
    async getMostActiveUsers(req: Request, res: Response) {
        try {
            const userRepository = getRepository(User);

            const activeUsers = await userRepository
                .createQueryBuilder("user")
                .orderBy("user.updatedAt", "DESC")
                .limit(10)
                .getMany();

            return res.json({ activeUsers });
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching report', error });
        }
    }
}