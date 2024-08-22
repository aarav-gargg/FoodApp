import reviewModel from "../models/review.model.js";
import plansModel from "../models/plans.model.js"


export async function getAllReviews(req, res) {
    try {
        let reviews = await reviewModel.find();
        if (reviews) {
            return res.json({
                message: "ALL THE REVIEWS HAVE BEEN FETCHED",
                reviews: reviews
            })
        }
        else {
            return res.json({
                message: "NO REVIEWS TO DISPLAY",
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            message: "Error fetching reviews",
            error: error.message
        })
    }
}

export async function getPlanReview(req, res) {
    try {
        let id = req.params.id;
        let reviews= await reviewModel.find();

        if(reviews){
            reviews=reviews.filter(review=>review.plan["_id"]==id);
            return res.json({
                message:"REVIEWS HAVE BEEN FETCHED",
                reviews:reviews,
            })
        }
        else{
            return res.json({
                message: "NO REVIEWS TO DISPLAY",
            })
        }
    } catch (error) {
        return res.json({
            message: error.message,
        })
    }
}

export async function createReview(req, res) {
    try {
        let data = req.body;
        let id = req.params.plan;
        let plan = await plansModel.findById(id);
        let review = await reviewModel.create(data);
        // plan.averageRating = (data.rating + plan.averageRating) / 2;
        await plan.save();
        return res.json({
            message: "REVIEW HAS BEEN CREATED",
            review: review
        })

    } catch (error) {
        return res.json({
            message: error.message,
        })
    }
}

export async function updateReview(req, res) {
    try {
        let id = req.params.id;
        let data = req.body;
        let review = await reviewModel.findById(id);
        if (review) {
            let keys = [];
            for (let key in data) {
                keys.push(key);
            }
            for(let key of keys){
                review[key] = data[key];
            }
            await review.save();
            return res.json({
                message: "REVIEW HAS BEEN UPDATED",
                updatedReview:review
            })
        }
        else{
            return res.json({
                message: "REVIEW NOT FOUND"
            })
        }

    } catch (error) {
        return res.json({
            message: error.message,
        })
    }
}

export async function deleteReview(req, res) {
    try {
        let id = req.params.id;
        let review=await reviewModel.findByIdAndDelete(id);
        if(review){
            return res.json({
                message: "REVIEW HAS BEEN DELETED",
                review:review
            })
        }
        else{
            return res.json({
                message: "REVIEW NOT FOUND"
            })
        }
    } catch (error) {
        return res.json({
            message: error.message,
        })
    }
}