<<<<<<< HEAD
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
=======
const express = require('express')
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require("../middleware/requireAuth");

const router = express.Router()
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)


module.exports = router
>>>>>>> origin/mern_stack_templete_with_auth
