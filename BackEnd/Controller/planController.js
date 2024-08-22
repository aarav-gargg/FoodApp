import express from "express";
import plansModel from "../models/plans.model.js"

export async function getAllPlans(req, res) {
    try {
        let plans = await plansModel.find();
        if (plans) {
            return res.json({
                message: "PLANS HAVE BEEN FETCHED",
                plans: plans
            })
        }
        else {
            return res.json({
                message: "NO PLANS EXIST"
            })
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

export async function getPlan(req, res) {
    try {
        let id = req.params.id;
        let plan = await plansModel.findById(id);
        if (plan) {
            return res.json({
                message: "PLAN HAS BEEN RETREIVED",
                plans: plan
            })
        }
        else {
            return res.json({
                message: "NO PLANS EXIST"
            })
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

export async function createPlan(req, res) {
    try {
        let planData = req.body;
        let createdPlan = await plansModel.create(planData);
        if (createdPlan) {
            return res.json({
                message: "SUCCESSFULLY CREATED PLAN",
                createdPlan: createdPlan
            })
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

export async function deletePlan(req, res) {
    try {
        let id = req.params.id;
        let deletedPlan = await plansModel.findByIdAndDelete(id);
        if (deletedPlan) {
            return res.json({
                message: "PLAN HAS BEEN DELETED",
                deletedPlan: deletedPlan
            })
        }
        else {
            return res.json({
                message: "NO SUCH PLAN EXIST"
            })
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

export async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let data = req.body;
        let keys = [];
        for (let key in data) {
            keys.push(key);
        }
        let plan = await plansModel.findById(id);
        if (plan) {
            for (let key of keys) {
                plan[key] = data[key];
            }
            await plan.save();
            res.json({
                message: "User updated successfully",
                updatedPlan: plan
            })
        }
        else {
            return res.json({
                message: "NO SUCH PLAN EXIST"
            })
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}