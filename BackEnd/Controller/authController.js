import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";
import express from "express";

const secret=process.env.SECRET_KEY;

// export async function getSignup(req, res) {
//     let users= await userModel.find();
//     res.json({
//      message:"USERS HAVE BEEN FETCHED",
//      users:users
//     });
//  }
 
export async function signup(req, res) {
     try {
         let data = req.body;
         let userData = await userModel.create(data);
         if(userData){
            res.json({
                message: "User registered",
                obj: userData
            });
         }else{
            res.json({
                message: "User not registered",
            })
         }
     } catch (error) {
         console.log(error);
         res.status(500).json({ message: "Error signing up" });
     }
 }
 
export async function login(req,res){
     try {
         let data=req.body;
        if(data.email){
         let user=await userModel.findOne({email:data.email});
         if(user){
             if(user.password==data.password){
                 let uid=user['_id'];
                 let token=jwt.sign({payload:uid},process.env.SECRET_KEY);
                 console.log(token);
                 res.cookie("isLoggedIn",token);
                 return res.json({
                     message:"USER HAS BEEN LOGGED IN",
                     userData:data
                 });
             }
             else{
                 return res.json({
                     message:"WRONG CREDENTIALS!!"
                 });
             }
         }
         else{
             return res.json({
                 message:"USER NOT FOUND!!"
             });
         }
        }
     } catch (error) {
         return res.json({
             message:error.message
         })
     }
 }

export function isAuthorized(roles){
    return function(req,res,next){
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json({
                message:"OPERATION NOT ALLOWED",
            })
        }
    }
}

export async function protectRoute(req, res, next) {
     if (req.cookies.isLoggedIn) {
         try {
             const isVerified = jwt.verify(req.cookies.isLoggedIn, process.env.SECRET_KEY);

             if(isVerified && isVerified.payload){
                 const userId=isVerified.payload;
                 const user=await userModel.findById(userId);
                if(user){
                    req.role=user.role;
                    req.id=user.id;
                    console.log(req.role,req.id);
                    next();
                }
             }
             else{
                res.status(401).json({ message: "VERIFICATION FAILED"});
             }
         } catch (error) {
             res.status(401).json({ message: "VERIFICATION FAILED", error: error.message });
         }
     } else {
         res.status(401).json({ message: "USER HAS NOT BEEN LOGGED IN YET. PLEASE LOGIN FIRST!" });
     }
 }

export async function forgotpassword(req,res){
    try {
       let email=req.body;
       let user = await  userModel.findOne({email:email});
       if(user){
        const resetToken=user.createResetToken();
        let resetPassword=`${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;
       } 
       else{
        return res.json({
            message:"EMAIL NOT FOUND"
        })
       }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

export async function resetPassword(req,res){
    try {
        let {password,conPassword}=req.body;
        const token=req.params.token;
        const user=await userModel.findOne({resetToken:token});
        if(user){
            user.resetpassword(password,conPassword);
            await user.save();
            res.json({
                message:"PASSWORD RESET SUCCESSFULL"
            })
        }
        else{
            res.json({
                message:"USER NOT FOUND"
            })
        }
    } catch (error) {
        res.json({
            message:error.message,
        })
    }
}

export function logout(req,res){
    res.cookie("isLoggedIn",' ',{maxAge:1});
    res.json({
        message:"USER HAS BEEN LOGGED OUT"
    })
}