import express from "express";
import activityRoute from "./activityRouter";
import pointRuleRoute from "./pointRule";
import pointRoute from "./pointRouter";
import apiKeyRoute from "./apiKeyRouter";

const routes = express.Router();

routes.use("/activity", activityRoute); // จัดการกิจกรรม
routes.use("/pointRule", pointRuleRoute); // จัดการกติกา
routes.use("/point", pointRoute); // จัดการคะแนน

routes.use("/apiKey", apiKeyRoute); // จัดการ app token
// routes.use('/public/point', middleware.apiKeyMiddleware, apiKeyRoute);

export default routes;
