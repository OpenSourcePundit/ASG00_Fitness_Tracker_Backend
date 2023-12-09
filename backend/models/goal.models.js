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

goalSchema.virtual("timePercentLeft").get(function(){
    const dayUnit=24*3600*1000;    
    const currentDiffInMilliSec = new Date(this.targetDate).getTime()-new Date(Date.now()).getTime()
    const currentDiffInDays = currentDiffInMilliSec/dayUnit;

    if(currentDiffInDays<0){
        return 0
    }
    const totalDiffInMilliSec = new Date(this.targetDate).getTime()-new Date(this.startDate).getTime()
    const totalDiffInDays = totalDiffInMilliSec/dayUnit;
    
    return (currentDiffInDays/totalDiffInDays*100)        
})
goalSchema.virtual("achievementPercent").get(async function(){
    const allexercises = await Exercise.find({});
    const percent = {Exercises:allexercises}
    console.log(percent)
    return percent   
})

const Goal = mongoose.model("Goal",goalSchema)
export default Goal;