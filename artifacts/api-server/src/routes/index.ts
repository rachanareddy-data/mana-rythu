import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import usersRouter from "./users";
import cropsRouter from "./crops";
import listingsRouter from "./listings";
import reviewsRouter from "./reviews";
import dashboardRouter from "./dashboard";
import adminRouter from "./admin";
import aiRouter from "./ai";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(usersRouter);
router.use(cropsRouter);
router.use(listingsRouter);
router.use(reviewsRouter);
router.use(dashboardRouter);
router.use(adminRouter);
router.use(aiRouter);

export default router;
