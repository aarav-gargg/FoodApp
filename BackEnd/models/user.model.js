import mongoose from "mongoose";
import crypto from "crypto"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type:String,
        enum: ['admin', 'user','owner','delivery partner'],
        default: 'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpg'
    },
    resetToken:String
});

userSchema.methods.createResetToken=function(){
    const reset=crypto.randomBytes(32).toString("hex");
    this.resetToken=reset;
    return reset;
}

userSchema.methods.resetpassword=function(password,conPassword){
   if(password==conPassword){
    this.password=password;
   }
   this.resetToken=undefined;
}


const userModel = mongoose.model('User', userSchema);

export default userModel;
