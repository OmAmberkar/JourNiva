import express from "express";
import { createGoal, deleteGoal, getGoalsToday, getGoalsWeek, updateGoal, goalChecklist } from "../controllers/goal.controller.js";
const router = express.Router();

// Route 1 - Create Goal
router.post("/create/:userID" , createGoal );

// Route 2 - Get Todays Checklist for All Goals by User ID
router.get("/today/:userID" ,getGoalsToday);


// Route 3 - Get All Goals Checklist for a Week by User ID
router.get("/week/:userID" ,getGoalsWeek);

// Route 4 - Update a Goal by Goal ID
router.patch("/update/:goalID" , updateGoal);

// Route 5 - Delete a Goal by Goal ID
router.delete("/delete/:goalID" , deleteGoal);

// Route 6 - Goal Checklist Toggle
router.patch("/toggle/:goalID" , goalChecklist);

// Route 7 - Get Goal Analysis by user ID
router.get("/analysis/:userID" , (req, res) => {
    const { userID } = req.params ;
    
    res.status(200).json({message : "Goal Analysis Retrieved Successfully !"});
});

export default router ;