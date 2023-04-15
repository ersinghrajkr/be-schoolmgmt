import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import { UserRequestPayload } from '../request/user.request';
import AuthService from '../services/auth.service';


const AuthRouter = Router();

AuthRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userToken: any = await UserService.addUser(req.body as UserRequestPayload);
        // res.cookie('jwttoken', userAndToken.token, { httpOnly: true })
        res.status(201).json({token: userToken});
    } catch (error: any) {
        if (error.message === 'User with provided email already exists') {
            res.status(409).json({ message: 'Email already exists' });
        } else {
            next(error);
        }
    }
});

AuthRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token =  await AuthService.login(email, password);
        res.send({token})
    } catch (err) {
        console.log("Login-error: ", err)
        res.send(err)
    }

});


// AuthRouter.get('/get-cookie', async (req: Request, res: Response) => {
//     try {
//         const cookies = req.cookies;
//         console.log(cookies.newUser);
//         res.json(cookies);
//     } catch (err) {
//         res.status(400).send(err)
//     }
// });


// AuthRouter.get('/set-cookie', async (req: Request, res: Response) => {
//     try {
//         // res.setHeader('Set-Cookie', 'newUser=true');
//         res.cookie('newUser', false);
//         res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
//         // res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, secure: true });
//         res.send('you got the cookies!');
//     } catch (err) {
//         res.status(400).send(err)
//     }
// });



export default AuthRouter;