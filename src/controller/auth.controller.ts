/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Request, Response } from 'express';
import { RegisterValidation } from '../validation/register.validation';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity'
import zxcvbn from 'zxcvbn';
import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// Interface for the Authenticated Request
interface AuthenticatedRequest extends Request {
    user?: User;
}
// User registration function
export const Register = async (req: Request, res: Response) => {
    try {
        const body = req.body;

        // Validate the incoming request data
        const { error } = RegisterValidation.validate(body);
        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                details: error.details.map((detail) => detail.message),
            });
        }

        // Check if the passwords match
        if (body.password !== body.password_confirm) {
            return res.status(400).send({ message: 'Passwords do not match' });
        }

        // Check password strength
        const passwordStrength = zxcvbn(body.password);
        if (passwordStrength.score < 3) {
            return res.status(400).send({
                message: 'Password is too weak. Please choose a stronger password.',
                suggestions: passwordStrength.feedback.suggestions,
            });
        }

        // Get the user repository
        const repository = getManager().getRepository(User);
        const roleRepository = getManager().getRepository(Role);

        // Fetch the role with id = 4
        const role = await roleRepository.findOne({ where: { id: 1 } });
        if (!role) {
            return res.status(400).send({ message: 'Default role not found' });
        }

        // Save the new user to the database with a hashed password and role_id = 4
        const { password, ...user } = await repository.save({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: await bcryptjs.hash(body.password, 9),
            role: role,  // Assign role with id = 4
        });

        // Send the user data excluding the password
        res.status(201).send(user); // 201 Created
    } catch (error) {
        res.status(500).send({ message: 'Error registering user', error: (error as Error).message });
    }
};


// User login function
export const Login = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(User);

        // Find the user by email
        const user = await repository.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).send({ message: 'Invalid credentials. Please check your Email or Password.' });
        }

        // Check if the password matches
        const isPasswordValid = await bcryptjs.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid credentials. Please check your Email or Password.' });
        }

        // Create a JWT token with the user ID as the payload
        const token = sign({ id: user.id }, process.env.SECRET_KEY as string);

        // Set the JWT as an HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        // Send a success message
        res.status(200).send({ message: 'Log in was successful' });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', error: (error as Error).message });
    }
};

// User authentication function 
export const AuthenticatedUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { password, ...user } = req.user as User;
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving authenticated user', error: (error as Error).message });
    }
};

// Logout function to remove cookies
export const Logout = async (req: Request, res: Response) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).send({ message: 'You have been logged out' });
    } catch (error) {
        res.status(500).send({ message: 'Error logging out', error: (error as Error).message });
    }
};

// Update user information excluding password
export const UpdateInfo = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = req.user as User;
        const repository = getManager().getRepository(User);

        // Update the user's information
        await repository.update(user.id, req.body);

        // Retrieve the updated user information
        const updatedUser = await repository.findOne({ where: { id: user.id } });

        // Exclude the password from the response
        if (updatedUser) {
            const { password, ...data } = updatedUser;
            res.status(202).send(data); // 202 Accepted
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating user information', error: (error as Error).message });
    }
};

// Update user password
export const UpdatePassword = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = req.user as User;

        // Check if the passwords match
        if (req.body.password !== req.body.password_confirm) {
            return res.status(400).send({ message: 'Passwords do not match' });
        }

        // Check password strength
        const passwordStrength = zxcvbn(req.body.password);
        if (passwordStrength.score < 3) {
            return res.status(400).send({
                message: 'Password is too weak. Please choose a stronger password.',
                suggestions: passwordStrength.feedback.suggestions,
            });
        }

        const repository = getManager().getRepository(User);

        // Update the user's password
        await repository.update(user.id, {
            password: await bcryptjs.hash(req.body.password, 9),
        });

        const { password, ...data } = user;
        res.status(202).send(data); // 202 Accepted
    } catch (error) {
        res.status(500).send({ message: 'Error updating password', error: (error as Error).message });
    }
};