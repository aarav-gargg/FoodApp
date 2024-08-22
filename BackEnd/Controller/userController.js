
import userModel from "../models/user.model.js";

// export function postUser(req, res) {
//     console.log(req.body);
//     users = req.body;
//     res.json({
//         message: "Data received",
//         user: req.body
//     });
// }

export async function updateUser(req, res) {
    try {
        const dt = req.body;
        let id =req.params.id;
        let user = await userModel.findById(id);
        if(user){
            const keys=[];
            for(let key in dt){
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++){
                user[keys[i]]=dt[keys[i]];
            }
            const updatedData=await user.save();
            res.json({
                message: "User updated successfully",
                user: updatedData
            })
        }
        else{
            return res.status(404).json({
                message: "User not found"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating data" });
    }
}

export async function getUser(req, res) {
    try {
        let id=req.id;
        let user = await userModel.findById(id);
        if(user){
            return res.json({
                message: "User found",
                user
            });
        }
        else{
            return res.json({
                message:"USER NOT FOUND"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving users" });
    }
}

export async function deleteUser(req,res){
    try {
        let id =req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(user){
            return res.json({
                message:"USER HAS BEEN DELETED SUCCESSFULLY",
                user:user
            })
        }
        else{
            return res.json({
                message:"NO SUCH USER EXISTS"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message
        });
    }
}

export async function getAllUsers(req, res) {
    try {
        let users=await userModel.find();
    if(users)
        res.json({
            message:"Users have been received",
            data:users
    })
    else{
        res.json({
            message:"NO USERS FOUND"
        })
    }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
    
}