import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import usersRouter from "./users";
import cropsRouter from "./crops";
import listingsRouter from "./listings";
import dashboardRouter from "./dashboard";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(usersRouter);
router.use(cropsRouter);
router.use(listingsRouter);
router.use(dashboardRouter);
router.use(adminRouter);

export default router;
