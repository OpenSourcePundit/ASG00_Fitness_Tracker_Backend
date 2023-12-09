import express from 'express'
import {AddExercise,GetAllExercises,DeleteExercise} from '../controller/exercise.controller.js'





const ExerciseRouter = express.Router()

ExerciseRouter.post('/new',AddExercise)
ExerciseRouter.get('/all',GetAllExercises)
ExerciseRouter.delete(`/:id`,DeleteExercise)


export default ExerciseRouter