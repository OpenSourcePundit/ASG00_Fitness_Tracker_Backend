import express from 'express'
import {AddGoal,DeleteGoal,GetAllGoals} from '../controller/goal.controller.js'


const GoalRouter = express.Router()

GoalRouter.post('/new',AddGoal)
GoalRouter.get('/all',GetAllGoals)
GoalRouter.delete('/:id',DeleteGoal)

export default GoalRouter