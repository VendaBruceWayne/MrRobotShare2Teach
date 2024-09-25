import { Request, Response } from 'express';
import { UserService } from '../services/userServ.service';
import { User } from "../entity/user.entity";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Endpoint to get user report
  public async getUserReport(req: Request, res: Response): Promise<Response> {
    try {
      const report = await this.userService.getUsersReport();
      return res.status(200).json({
        message: 'User report generated successfully',
        data: report,
      });
      
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to generate report',
        error: error.message,
      });
    }
  }
}
