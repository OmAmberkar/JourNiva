import express from "express";

const router = express.Router();

// Route 1 - Create Journal
router.post("/create/:userID" , (req,res) => {
    const {userID} = req.params;
    const {date, title, mood, content} = req.body ;

    res.status(201).json({message : "Journal Created Successfully !"});
});

// Route 2 - Get Journal by Date
router.get("/by-date/:userID?date=yyyy-mm-dd" , (req, res)=> {
    const {userID, date} = req.params ;

    res.status(200).json({message : "Journal Retrieved Successfully !"}) ;
});

// Route 3 - Get all Journals
router.get("/all/:userID" , (req, res) => {
    const {userID} = req.params ;

    res.status(200).json({message : "All Journals Retrieved Successfully !"});
});

// Route 4 - Get Specific Journal by ID (View Jorunal))
router.get("/view/:journalID" , (req, res) => {
    const {journalID} = req.params ;

    res.status(200).json({messsage : "Journal Retrieved Successfully by ID !"});
});

// Route 5 - Update Journalby Date --> Not Needed 

// Route 6 - Updage by Journal ID
router.put("/update/:journalID", (req, res) => {
    const { journalID} = req.params ;
    const { date, title, mood, content } = req.body;

    res.status(200).json({message : "Journal Updated Successfully !"});
});

// Route 7 - Delete one Journal using Journal ID
router.delete("/delete/:journalID" , (req, res) => {
    const { journalID } = req.params;

    res.status(200).json({message : "Journal Deleted Successfully !"});
});

// Route 8 - Delete All Journals using User ID
router.delete("/delete-all/:userID" , (req, res) => {
    const { userID } = req.params;

    res.status(200).json({message : "All Journals Deleted Successfully !"});
});
   
export default router;