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
    totalCalBur:{
        type:Number,
        default:0
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

goalSchema.virtual("totalCalorieBurned").get(async function(){
    const allexercises = await Exercise.find({
        "doneDate":{$gte:this.startDate, $lt: this.targetDate}
    });
    console.log(`AllExercises:${allexercises} `)

     const cal = allexercises.reduce((total,curr)=>total+curr.calories,0)
     console.log(`Caloriiiiees: ${cal}`)
     this.totalCalBur = cal
    await this.save()
})

goalSchema.virtual("achievementPercent").get(async function(){
    const allexercises = await Exercise.find({
    "doneDate":{$gte:this.startDate, $lt: this.targetDate}
    });

    const totalCaloriesBurned = await allexercises.reduce((total,curr)=>total+curr.calories,0)
    // console.log(`calories====${totalCaloriesBurned}`)

    // console.log(`checktotalcalburnpercent: ${totalCaloriesBurned/this.targetCalorieValue*100}`)
    if(totalCaloriesBurned/this.targetCalorieValue*100>100){
        // console.log('truecase 100')
        return  100
    }
        const ret =totalCaloriesBurned/this.targetCalorieValue*100

        // console.log(`falsecase ${ret}`)
        return ret
    
    
})

const Goal = mongoose.model("Goal",goalSchema)
export default Goal;