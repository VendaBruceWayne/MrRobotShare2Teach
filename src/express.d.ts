import { User } from "../entity/user.entity"; // Adjust the path to your actual User entity location.

declare global {
    namespace Express {
      interface Request {
        user?: User; // Assuming `user` is an instance of your `User` entity.
    }
  }
}
