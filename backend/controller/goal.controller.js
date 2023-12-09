import Goal from "../models/goal.models.js";

export const AddGoal = async(req,res) =>{
    try {
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