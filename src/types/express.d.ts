// src/types/express.d.ts
import { User } from '../entity/user.entity';  // Ensure this path is correct

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Optional field for `user` on `Request`
    }
  }
}
