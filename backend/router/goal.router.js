import express from 'express'
import {AddGoal} from '../controller/goal.controller.js'


const GoalRouter = express.Router()

GoalRouter.post('/new',AddGoal)



export default GoalRouter