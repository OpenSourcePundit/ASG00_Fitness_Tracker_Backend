import express from 'express'

import { RemoveFoodItem, AddFoodItem, GetAllFoodItems} from '../controller/food.controller.js'



const FoodRouter = express.Router()

FoodRouter.post('/new',AddFoodItem)
FoodRouter.get('/all',GetAllFoodItems)
FoodRouter.delete(`/:id`,RemoveFoodItem)


export default FoodRouter