import express from 'express'; 
import { createWorkout,getSingleWorkout,getAllWorkouts,deleteWorkout,updateWorkout } from '../controllers/workoutController.js'; 
   
const router = express.Router();

//get all workouts
router.get('/', getAllWorkouts);
//a single workout
router.get('/:id', getSingleWorkout);
//create a new workout
router.post('/', createWorkout);
//delete a workout
router.delete('/:id', deleteWorkout);
//update a workout
router.patch('/:id', updateWorkout);

export default router;