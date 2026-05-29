import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import cropsRouter from "./crops";
import transactionsRouter from "./transactions";
import usersRouter from "./users";
import chatRouter from "./chat";
import nasaWeatherRouter from "./nasaWeather";
import statsRouter from "./stats";
import storageRouter from "./storage";



const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(cropsRouter);
router.use(transactionsRouter);
router.use(usersRouter);
router.use(chatRouter);
router.use(nasaWeatherRouter);
router.use(statsRouter);
router.use(storageRouter);

export default router;
