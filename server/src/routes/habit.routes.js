import express from "express";
import { createHabit } from "../controllers/habit.controller.js";
const router = express.Router();

// Route 1 - Create Habit
router.post("/create/:userID" , createHabit);


// Route 2 - Get Todays Checklist for All Habits by User ID
router.get("/today/:userID" , (req, res) => {
    const { userID } = req.params ;

    res.status(200).json({message : "Today's Habit Checklist Retrieved Successfully !"});
});


// Route 3 - Get All Habits Checklist for a Week by User ID
router.get("/week/:userID" , (req, res) => {
    const { userID } = req.params ;
    const { date } = req.query ;
    res.status(200).json({message : "All Habits Checklist for the Week Retrieved Successfully !"});
});

// Route 4 - Update a Habit by Habit ID
router.patch("/update/:habitID" , (req, res) => {
    const { habitID } = req.params ;
    const { habitName, startDate, icon, habitDetails, updatedAt } = req.body ;

    res.status(200).json({message : "Habit Updated Successfully !"});


});

// Route 5 - Delete a Habit by Habit ID
router.delete("/delete/:habitID" , (req, res) => {
    const { habitID } = req.params ;

    res.status(200).json({message : "Habit Deleted Successfully !"});
});

// Route 6 - Checklist Toggle
router.patch("/toggle/:habitID" , (req, res) => {
    const { habitID } = req.params ;
    const { date, status } = req.body ;

    res.status(200).json({message : "Habit Checklist Toggled Successfully !"});
});

// Route 7 - Get Habit Analysis by user ID
router.get("/analysis/:userID" , (req, res) => {
    const { userID } = req.params ;
    
    res.status(200).json({message : "Habit Analysis Retrieved Successfully !"});
});

export default router ;
