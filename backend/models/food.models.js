import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    calories:{
        type:Number,
        required:true,
    },
    protien:{
        type:Number,
        default:0,
    },
    carbs:{
        type:Number,
        default:0,
    },
    fats:{
        type:Number,
        default:0,
    }
},{
    timestamps:true
})

const Food = mongoose.model("Food",foodSchema)
export default Food;
