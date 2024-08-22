import express from "express";
import { isAuthorized, protectRoute } from "../Controller/authController.js";
import { getAllPlans, getPlan, createPlan, updatePlan, deletePlan } from "../Controller/planController.js";


const planRouter = express.Router();

planRouter.route("/allPlans")
    .get(getAllPlans)

planRouter.use(protectRoute)
planRouter.route("/:id")
    .get(getPlan)

planRouter.use(isAuthorized(['admin']));
planRouter.route("/")
    .post(createPlan)


planRouter.route("/:id")
    .patch(updatePlan)
    .delete(deletePlan)


export default planRouter;