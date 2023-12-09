import Exercise from "../models/exercise.models.js";


export const AddExercise = async(req,res) =>{
    try {
        const exercise = await Exercise.create(req.body)
        res.status(201).json({
            success:true,
            exercise
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })        
    }

}

export const GetAllExercises = async(req,res) =>{
    try {
        const exercises = await Exercise.find({})
        res.status(201).json({
            success:true,
            exercises
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })        
    }

}

export const DeleteExercise = async(req,res) =>{
    try {
        const exercise = await Exercise.findById(req.params.id)
        if(!exercise){
           return  res.status(404).json({ 
                success:false,message:"Exercise not Found in Database !"
            }) 
        }
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,message:"Exercise removed Successfully",
            deletedExercise
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}