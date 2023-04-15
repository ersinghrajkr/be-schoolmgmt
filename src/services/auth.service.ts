import UserService from "../services/user.service";
import * as jwt from 'jsonwebtoken';
import { UserType } from "../enums";
import bcrypt from 'bcrypt';

export default class AuthService {
    public static async login(email: string, plainPassword: string) {
        try {
            if (email) {
                const user = await UserService.findUserByEmail(email);
                if (!user) {
                    throw new Error('User not found by provided email');
                  }
                console.log("findUserByEmail :", user)
                if (user) {
                    const isPasswordMatched = await AuthService.comparePassword(user.password, plainPassword);
                    console.log("isPasswordMatched :", isPasswordMatched)
                    if (isPasswordMatched) {
                        return this.generateToken(user.id, user.type)
                    } else {
                        throw new Error("Invalid Passowrd")
                    }
                }
            } else {
                throw new Error("Unauthorized")
            }
        } catch (error) {
            throw error;
        }
    }

    public static async comparePassword(hashPassowrd: string, plainPassword: string): Promise<boolean> {
        console.log("Hash and Plain Password: ", hashPassowrd, plainPassword)
        return await bcrypt.compare(plainPassword, hashPassowrd);
    }

    public static verifyToken(token: any) {
        try {
            const jwtSecret = process.env.JWT_SECRET_KEY;
            if (!jwtSecret) {
                throw new Error('JWT_SECRET_KEY is not defined in .env file');
            }
            if (!token) {
                throw new Error('Authorization token is not provided');
            }
            const decodedToken = jwt.verify(token, jwtSecret) as { id: string; role: UserType };
            return decodedToken;
        } catch (err) {
            throw new Error('Invalid authorization token');
        }
    }

    public static async generateToken(id: string, userType: UserType) {
        const jwtSecret = process.env.JWT_SECRET_KEY;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET_KEY is not defined in .env file');
        }
        const token = jwt.sign({ id, userType }, jwtSecret, { expiresIn: 1 * 24 * 60 * 60 });
        console.log("generateToken: ", token);
        return token;
    }
}