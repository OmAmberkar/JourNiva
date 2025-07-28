import express from "express";
import { createJournal, getAllJournals, getJournalbydate, updateJournalById, deleteOneJournal, deleteAllJournal, viewJournal} from '../controllers/journal.controller.js';

const router = express.Router();

// Route 1 - Create Journal
router.post("/create/:userID",createJournal);

// Route 2 - Get Journal by Date
router.get("/by-date/:date" ,getJournalbydate);

// Route 3 - Get all Journals
router.get("/all/:userID" , getAllJournals);

// Route 4 - Get Specific Journal by ID (View Jorunal))
router.get("/view/:journalID" , viewJournal);

// Route 5 - Update by Journal ID
router.put("/update/:journalId", updateJournalById );

// Route 6 - Delete One Journal By Journal ID
router.delete("/delete/:journalId" , deleteOneJournal);

// Route 7 - Delete All Journals of User 
router.delete("/delete-all" , deleteAllJournal );

export default router;