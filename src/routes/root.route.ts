// main routes will hold all the resources

import { Router } from "express";

// All root routes ( Resources)
import HomepageRouter from "./homepage.route";
import UserRouter from "./user.route";
import AuthRouter from "./auth.route";

const RootRouter = Router();

RootRouter.use("/homepage", HomepageRouter);
RootRouter.use("/auth", AuthRouter);
RootRouter.use("/users",  UserRouter);


export default RootRouter;
