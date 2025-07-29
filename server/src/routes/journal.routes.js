import express from "express";
import { createJournal, getJournalsByDate, getAllJournals, viewJournal, updateJournalById, deleteOneJournal, deleteAllJournals  } from '../controllers/journal.controller.js';

const router = express.Router();

// Route 1 - Create Journal
router.post("/create", createJournal);

// Route 2 - Get Journal by Date
router.get("/by-date/:date" ,getJournalsByDate);

// Route 3 - Get all Journals
router.get("/all" , getAllJournals);

// Route 4 - Get Specific Journal by ID (View Jorunal))
router.get("/view/:journalId" , viewJournal);

// Route 5 - Update by Journal ID
router.put("/update/:journalId", updateJournalById );

// Route 6 - Delete One Journal By Journal ID
router.delete("/delete/:journalId" , deleteOneJournal);

// Route 7 - Delete All Journals of User 
router.delete("/delete-all" , deleteAllJournals );

export default router;