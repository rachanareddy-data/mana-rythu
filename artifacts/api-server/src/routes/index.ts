import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import usersRouter from "./users";
import cropsRouter from "./crops";
import listingsRouter from "./listings";
import reviewsRouter from "./reviews";
import notificationsRouter from "./notifications";
import dashboardRouter from "./dashboard";
import adminRouter from "./admin";
import aiRouter from "./ai";
import logisticsRouter from "./logistics";
import ordersRouter from "./orders";
import chatRouter from "./chat";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(usersRouter);
router.use(cropsRouter);
router.use(listingsRouter);
router.use(reviewsRouter);
router.use(notificationsRouter);
router.use(dashboardRouter);
router.use(adminRouter);
router.use(aiRouter);
router.use(logisticsRouter);
router.use(ordersRouter);
router.use(chatRouter);

export default router;
