import { User } from '../../entity/user.entity';  // Adjust the path to match your project structure

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}