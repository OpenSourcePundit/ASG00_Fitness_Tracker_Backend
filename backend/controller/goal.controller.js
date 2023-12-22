import Goal from "../models/goal.models.js";

export const AddGoal = async(req,res) =>{
    try {

        const {name, description,startDate, targetDate, targetCalorieValue} = req.body;

        if(!name || !description || !startDate || !targetDate || !targetCalorieValue  ){
            return res.status(404).json({
                message:"Please provide all the required fields"
            })
        }

        const newGoal = await Goal.create(req.body);
        res.status(201).json({
            success:true,
            newGoal
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })                      
    }
}

export const DeleteGoal = async(req,res) =>{
    try {
        const goal = await Goal.findById(req.params.id);
        if(!goal){
            res.status(404).json({
                success:false,
                message:"Goal not found in database !"
            })
        }

        const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,message:`Goal ${deletedGoal.name} removed Successfully`,
            deletedGoal
        })
      
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })        
    }
}


export const GetAllGoals = async(req,res) =>{
    try {
        const allGoals = await Goal.find({});
        res.status(201).json({
            success:true,
            allGoals
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })                      
    }
}