import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    type:{type:String,

        enum:[
            "Aerobics", "Running", "Dancing", "Rock Climbing", "Swimming", "Skipping", "Yoga", "Cycling", "Walking", "Weight Lifting"],
        default:"Walking",
    },
    duration:{
        type:Number,
        required:true,
    },
    doneDate:{
        type:Date,
        default:Date.now()
    }

},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

exerciseSchema.virtual('calories').get( function(){
    const calorieChart =[
        {typeofexercise:"Aerobics",calpermin:10}, {typeofexercise:"Running",calpermin:8.5}, {typeofexercise:"Dancing",calpermin:6.6}, {typeofexercise:"Rock Climbing",calpermin:13}, {typeofexercise:"Swimming",calpermin:12}, {typeofexercise:"Skipping",calpermin:12}, {typeofexercise:"Yoga",calpermin:7}, {typeofexercise:"Cycling",calpermin:4.8}, {typeofexercise:"Walking",calpermin:4}, {typeofexercise:"Weight Lifting",calpermin:9}];
    

    return (calorieChart.find((exercise)=>exercise.typeofexercise===this.type).calpermin * this.duration)
})


const Exercise = mongoose.model('Exercise',exerciseSchema);
export default Exercise;

