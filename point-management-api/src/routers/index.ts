import express from "express";
import middleware from "@/middleware";
import activityRoute from "./activityRouter";
import pointRuleRoute from "./pointRule";
import pointRoute from "./pointRouter";
import apiKeyRoute from "./apiKeyRouter";

const routes = express.Router();

routes.use("/activity", middleware.authentication, activityRoute); // จัดการกิจกรรม
routes.use("/pointRule", middleware.authentication, pointRuleRoute); // จัดการกติกา
routes.use("/point", middleware.authentication, pointRoute); // จัดการคะแนน

routes.use("/apiKey", middleware.authentication, apiKeyRoute); // จัดการ app token
// routes.use('/public/point', middleware.apiKeyMiddleware, apiKeyRoute);

export default routes;
