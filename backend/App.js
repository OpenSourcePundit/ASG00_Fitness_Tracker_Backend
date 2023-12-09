import express from "express";
import helmet from "helmet";
import cors from 'cors';
import { config } from "dotenv";

import ExerciseRouter from "./router/exercise.router.js";
import FoodRouter from "./router/food.router.js";
import GoalRouter from "./router/goal.router.js";


import { errorHandler } from "./middlewares/errorHandler.js";



config({path:"backend/config/config.env"})

const app = express()

//applyting middlewares
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({extended:true})) 
app.use(express.json()) 



//Routes
app.use('/api/v1/exercises',ExerciseRouter)
app.use('/api/v1/food',FoodRouter)
app.use('/api/v1/goals',GoalRouter)




app.use(errorHandler)



export default app;