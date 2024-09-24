import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';  // Adjust the path based on your file structure

export class UserService {
  private userRepository = getRepository(User);

  // Fetch all users, and include createdAt and updatedAt in the result
  public async getUsersReport(): Promise<any> {
    try {
      // Fetch users from the database
      const users = await this.userRepository.find({
        select: ['id', 'first_name', 'last_name', 'email', 'createdAt', 'updatedAt'],
        order: { createdAt: 'ASC' } // Sort users by their creation time
      });

      // Format the report with total count and user details
      const report = {
        totalUsers: users.length,
        users: users.map(user => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          createdAt: user.createdAt.toISOString(),  // Format dates as ISO strings
          updatedAt: user.updatedAt.toISOString()
        }))
      };

      return report;
      
    } catch (error) {
      // Handle any errors that might occur during database query
      console.error('Error fetching user report:', error);
      throw new Error('Unable to fetch user report');
    }
  }
}
