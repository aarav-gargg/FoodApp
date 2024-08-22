import mongoose from "mongoose"
import userModel from "./user.model.js";
import plansModel from "./plans.model.js";

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true,"Review is required"]
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,"RATING IS REQUIRED"]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true,"REVIEW MUST BELONG TO A USER"],
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:"Plans",
        required:[true,"REVIEW MUST BELONG TO A PLAN"],
    }
});

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"name email"
    }).populate("plan");
    next();
});

const reviewModel=mongoose.model("Reviews",reviewSchema);

export default reviewModel;