import mongoose from "mongoose";

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        maxLength:[20,"THE MAXIMUM LENGTH FOR THE NAME SHOULD NOT EXCEED 20"],
    },
    duration: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    averageRating: {
        type:Number,
    },
    discount:{
        type:Number,
        validate:function(){
            this.discount<90;
        }
    },
    
});

const plansModel = mongoose.model("Plans",planSchema);

export default plansModel;