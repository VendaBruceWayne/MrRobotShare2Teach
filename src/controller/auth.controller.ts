import { Request, Response } from 'express';
import { RegisterValidation } from '../validation/register.validation';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

// User registration function
export const Register = async (req: Request, res: Response) => {
    const body = req.body;

    // Validate the incoming request data
    const { error } = RegisterValidation.validate(body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details.map(detail => detail.message),
        });
    }

    // Get the user repository
    const repository = getManager().getRepository(User);

    // Save the new user to the database with a hashed password
    const { password, ...user } = await repository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcryptjs.hash(body.password, 9),
    });

    // Send the user data excluding the password
    res.send(user);
};

// User login function
export const Login = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(User);

    // Find the user by email
    const user = await repository.findOne({ where: { email: req.body.email } });
    if (!user) {
        return res.status(404).send({
            message: "Invalid credentials. Please check your Email or Password.",
        });
    }

    // Check if the password matches
    const isPasswordValid = await bcryptjs.compare(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send({
            message: "Invalid credentials. Please check your Email or Password.",
        });
    }

    // Create a JWT token with the user ID as the payload
    const payload = { id: user.id };
    const token = sign(payload, process.env.SECRET_KEY);

    // Set the JWT as an HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day (expires after 1 day)
    });

    // Send a success message
    res.send({ message: 'Log in was succesful' });
};

//User Authentication function 
export  const AuthonticatedUser = async (req: Request, res: Response) => {
    const {password, ...user} = req['user'];
   res.send(user);
};
//Removes Cookies
export const Logout = async (req: Request, res: Response) => {
    res.cookie('jwt','' ,{maxAge: 0});
    res.send({
        message: "You have been logged out", 
    });

};