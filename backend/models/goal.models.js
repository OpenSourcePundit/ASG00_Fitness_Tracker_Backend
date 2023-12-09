import mongoose from "mongoose";
import Exercise from "./exercise.models.js";

const goalSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        default:Date.now()
    },
    targetDate:{
        type:Date,
        required:true
    },
    targetCalorieValue:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["In Progress","Achieved","Failed","Awaiting"],
        default:"Awaiting",
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

goalSchema.virtual("timePercent").get(function(){
    const dayUnit=24*3600*1000;
    const diffInMilliSec = new Date(this.targetDate).getTime()-new Date(this.startDate).getTime()
    const diffInDays = diffInMilliSec/dayUnit;
    return diffInDays        
})
// goalSchema.virtual("achievementPercent").get(function(){
//     const allexercises = Exercise.find({});
//     return allexercises    
// })
goalSchema.virtual("test").get(function(){
   
    return "Test"    
})

const Goal = mongoose.model("Goal",goalSchema)
export default Goal;