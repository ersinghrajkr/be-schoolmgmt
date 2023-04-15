import { Router, Request, Response } from 'express';

const HomepageRouter = Router();

// Get homepage
HomepageRouter.get('/', (req: Request, res: Response)=> {
    res.send("This is GET homepage route!")
});

HomepageRouter.post('/', (req: Request, res: Response)=> {
    res.send("This is POST homepage route!")
});


export default HomepageRouter;