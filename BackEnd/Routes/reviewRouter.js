import express from "express";
import { isAuthorized, protectRoute } from "../Controller/authController.js";
import { getAllReviews , getPlanReview , createReview , deleteReview , updateReview } from "../Controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.route("/allReviews")
    .get(getAllReviews)

reviewRouter.route("/planReviews/:id")
    .get(getPlanReview);


reviewRouter.use(protectRoute)
reviewRouter.route("/:plan")
    .post(createReview);

reviewRouter.route("/:id")
    .patch(updateReview)
    .delete(deleteReview)



export default reviewRouter;