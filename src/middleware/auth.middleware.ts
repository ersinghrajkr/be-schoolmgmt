import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service"
import { UserType } from "../enums";

// Set up protected route middleware
const protectRoute = (actualRole: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get JWT token from Authorization header
            const token = req.headers.authorization?.split(" ")[1];
            console.log("token :", token)
            // Verify JWT token
            const decodedToken: any = AuthService.verifyToken(token) as { id: string, role: UserType };
            console.log("decodedToken :", decodedToken)
            // Check if user has required role
            if (decodedToken.userType === actualRole) {
                // User has required role, allow access to protected route
                console.log("decodedToken Role :", decodedToken.userType, actualRole)
                next();
            } else {
                // User does not have required role, deny access to protected route
                res.status(403).send("Access denied");
            }
        } catch (err) {
            // Error while verifying JWT token, deny access to protected route
            res.status(403).send("Access denied");
        }
    };
};


export default protectRoute;