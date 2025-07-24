import express from "express";
import { createJournal, getAllJournals, getJournalbydate, updateJournalByID, deleteOneJournal, deleteAllJournal, viewJournal} from '../controllers/journal.controller.js';

const router = express.Router();

// Route 1 - Create Journal
router.post("/create/:userID",createJournal);

// Route 2 - Get Journal by Date
router.get("/by-date/:date" ,getJournalbydate);

// Route 3 - Get all Journals
router.get("/all/:userID" , getAllJournals);

// Route 4 - Get Specific Journal by ID (View Jorunal))
router.get("/view/:journalID" , viewJournal);

// Route 5 - Update Journalby Date --> Not Needed 

// Route 6 - Update by Journal ID
router.put("/update/:journalID", updateJournalByID );

// Route 7 - Delete one Journal using Journal ID
router.delete("/delete/:journalID" , deleteOneJournal);

// Route 8 - Delete All Journals using User ID
router.delete("/delete-all/:userID" , deleteAllJournal );

export default router;