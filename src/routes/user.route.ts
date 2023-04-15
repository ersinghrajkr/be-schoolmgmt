import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import { UserRequestPayload } from '../request/user.request';
import protectRoute from '../middleware/auth.middleware';

const UserRouter = Router();

// Get homepage
UserRouter.get('/', async (req: Request, res: Response) => {
    res.json(await UserService.findAllUser())
});

UserRouter.get('/:registrationNo', async (req: Request, res: Response) => {
    res.send(await UserService.findUserById(req.params.registrationNo))
});

UserRouter.get('/:id', async (req: Request, res: Response) => {
    res.send(await UserService.findUserById(req.params.id))
});

UserRouter.put('/update/:id', async (req: Request, res: Response) => {
    res.send(await UserService.updateUserById(req.params.id, req.body))
});

UserRouter.patch('/update/:registrationNo', async (req: Request, res: Response) => {
    res.send(await UserService.updateUserByregistrationNo(req.params.registrationNo, req.body))
});

// UserRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userAndToken: any = await UserService.addUser(req.body as UserRequestPayload);
//         res.cookie('jwttoken', userAndToken.token, { httpOnly: true })
//         res.status(201).json(userAndToken.user);
//     } catch (error) {
//         next(error)
//     }
// });

UserRouter.delete('/delete/:id', protectRoute("admin"), async (req: Request, res: Response) => {
    res.send(await UserService.deleteUser(req.params.id as string))
});


export default UserRouter;