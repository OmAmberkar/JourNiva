import express from "express";

const router = express.Router();

// Route 1 - Create Goal
router.post("/create/:userID" , (req, res) => {
    const { userID } = req.params ;
    const { goalName, startDate, achieveByDate, icon, goalDetails, createdAt } = req.body;

    res.status(201).json({message : "Goal Created Successfully !"});
});


// Route 2 - Get Todays Checklist for All Goals by User ID
router.get("/today/:userID" , (req, res) => {
    const { userID } = req.params ;

    res.status(200).json({message : "Today's Goals Checklist Retrieved Successfully !"});
});


// Route 3 - Get All Goals Checklist for a Week by User ID
router.get("/week/:userID?date=yyyy-mm-dd" , (req, res) => {
    const { userID } = req.params ;
    const { date } = req.query ;
    res.status(200).json({message : "All Goals Checklist for the Week Retrieved Successfully !"});
});


// Route 4 - Update a Goal by Goal ID
router.patch("/update/:goalID" , (req, res) => {
    const { goalID } = req.params ;
    const { goalName, startDate, achieveByDate, icon, goalDetails, updatedAt } = req.body ;

    res.status(200).json({message : "Goal Updated Successfully !"});
});


// Route 5 - Delete a Goal by Goal ID
router.delete("/delete/:goalID" , (req, res) => {
    const { goalID } = req.params ;

    res.status(200).json({message : "Goal Deleted Successfully !"});
});

// Route 6 - Goal Checklist Toggle
router.patch("/toggle/:goalID" , (req, res) => {
    const { goalID } = req.params ;
    const { date, status } = req.body ;

    res.status(200).json({message : "Goal Checklist Toggled Successfully !"});
});

// Route 7 - Get Goal Analysis by user ID
router.get("/analysis/:userID" , (req, res) => {
    const { userID } = req.params ;
    
    res.status(200).json({message : "Goal Analysis Retrieved Successfully !"});
});