import Food from "../models/food.models.js";

export const AddFoodItem = async(req,res) =>{
    try {

        const {name, calories,protein, carbs, fats} = req.body;

        if(!name || !calories || !protein || !carbs || !fats ){
            return res.status(404).json({
                message:"Please provide all the required fields"
            })
        }


        const newFoodItem = await Food.create(req.body);
        res.status(201).json({
            success:true,
            newFoodItem
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })        
    }
}

export const RemoveFoodItem = async(req,res) =>{
    try {
        const foodItem = await Food.findById(req.params.id);
        if(!foodItem){
            res.status(404).json({
                success:false,
                message:"Food Item not found in database !"
            })
        }

        const deletedItem = await Food.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,message:"Food Item removed Successfully",
            deletedItem
        })
      
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })        
    }
}

export const GetAllFoodItems = async(req,res) =>{
    try {
        const allFoodItems = await Food.find({})
        res.status(200).json({
            success:true,
            allFoodItems
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        }) 
        
    }

}