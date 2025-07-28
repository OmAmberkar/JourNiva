import journals from "../../models/journal.model.js";
import User from "../../models/user.model.js";

// Route - 1 create new journal
export const createJournal = async (req, res) => {
  // checks if user is authorized or not
  const fromAuth = req.user?._uid || req.user?._id || req.user?.id; //requesting from auth
  const fromParam = req.params.userID; //requesting from the url as a parameter

  const userId = fromParam || fromAuth;

  if (!userId) {
    return res.status(400).json({
      status: "failed",
      message: "No user context—provide userID or be authenticated.",
    });
  }

  const { title, content, cardImageUrl, mood, location, date } = req.body;

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({
      status: "Failed",
      message: "Provide Title and Content",
    });
  }

  try {
    //getting the user snapshot
    const user = await User.findById(userId).select("name");
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found.",
      });
    }

    // creating the new journal if user exists
    const newJournal = await journals.create({
      _uid: user._id,
      nameSnapshot: user.name,
      title: title.trim(),
      content,
      date: date ? new Date(date) : new Date(),
      mood,
      cardImageUrl,
      location,
    });

    return res.status(201).json({
      status: "Success",
      message: "Successfully Posted New Journal",
    });
  } catch (error) {
    console.error("Error while creating new Journal", error);
    return res
      .status(500)
      .json({ message: "Cant store data due to technical issue" });
  }
};

// Route - 3 getall journals
export const getAllJournals = async (req, res) => {
  const userId = req.params.userID || req.user?._uid;
  if (!userId) {
    return res.status(400).json({
      status: "Failed",
      message: "No user context—provide userID or be authenticated.",
    });
  }

  try {
    const Journal = await journals.find({ _uid: userId })
      .sort({ date: -1 })
      .lean();
    return res.status(200).json({
      status: "success",
      count: Journal.length,
      data: Journal,
    });
  } catch (error) {
    console.error("Error fetching Journal", error);
    return res.status(500).json({
      status: "error",
      message: "Technical error—could not fetch journals.",
    });
  }
};

// Route - 2 get journal by date
export const getJournalbydate = async (req, res) => {
    const { userID } = req.params ;
    const { date } = req.params ;

  try {
    const Journal = await journals.find({ userID, date });

    if (!Journal) {
      return res.status(404).json({ message: "No journal found for this date." });
    }
    res.status(200).json({
      status: "Success",
      message: "Journal retrieved successfully by date!",
      data: Journal
    });
  } catch (error) {
    console.error("Error fetching journal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route - 4 get journal by ID
export const viewJournal = async (req ,res) => {
  const { journalID } = req.params;
  if (!journalID) {
    return res.status(400).json({
      status: "Failed",
      message: "Jaournal Id is required to fetch the journal.",
    });
  }
  try {
    const Journal = await journals.find({ _id: journalID });
    return res.status(200).json({
      status: "Success",
      message: "Journal retrieved successfully by Id !",
      data: Journal
      
    });
  }
  catch (error) {
    console.error("Error fetching Journal", error);
    return res.status(500).json({
      status: "error",
      message: "Technical error—could not fetch journals.",
    });
  }
};

// Route 5 - Update Journal by ID
export const updateJournalById = async (req, res) => {
  // Taking userId from Middleware
  const userId = req.userId ;

  // Destructure req.param & req.body
  const { journalId } = req.params;
  const { date, title, mood, content, iconUrl } = req.body;

  // Validating JournalId
  if (!journalId) {
    return res.status(400).json({
      status: "failed",
      message: "Update Failed - Journal ID is Required to Update the Journal!",
    });
  }

  try {
    // Checking if Journal Exists 
    const existingJournal = await Journal.findById(journalId) ;

    if (!existingJournal) {
      return res.status(404).json({
        status: "failed",
        message: "Update Failed - Journal Not Found!",
      });
    }

    // Check Ownership of Journal
    if (existingJournal._uid.toString() !== userId.toString()) {
      return res.status(403).json({
        status: "failed",
        message: "Update Failed - User Unauthorized",
      });
    }

    //  Update Journal
    const updatedJournal = await journals.findByIdAndUpdate(
      journalID,
      { date, title, mood, content, iconUrl },
      { new: true }
    );

    // Validate Updated Journal
    if (!updatedJournal) {
      return res.status(404).json({
        status: "failed",
        message: "Update Failed - Journal Not Found!",
      });
    }

    // Response to Frontend
    return res.status(200).json({
      status: "success",
      message: "Journal Updated Successfully!",
      data: updatedJournal
    });

  } catch (error) {
      console.error("Error Updating Journal", error);
      return res.status(500).json({
        status: "error",
        message: "Technical Error — Could Not Update Journal!"
      });
  } 
}

// Route 6 - Delete One Journal By Journal ID
export const deleteOneJournal = async (req, res) => {
  // Taking userId from Middleware
  const userId = req.userId ;
  
  // Destructure req.param
  const { journalId } = req.params;

  // Validate Journal ID
  if (!journalId) {
    return res.status(400).json({
      status: "failed",
      message: "Delete Failed - Journal ID is Required to Delete the Journal!",
    });
  }

  try {
    // Validate Ownership & Delete Journal
    const journal = await Journal.findOneAndDelete({
      _id: journalId,
      _uid: userId,
    });

    //Check if Journal Existed 
    if (!journal) {
      return res.status(404).json({
        status: "failed",
        message: "Delete Failed - No Journal Found for this Journal ID." 
      });
    }

    // Response to Frontend
    res.status(200).json({
      status: "success",
      deletedJournalTitle: journal.title,
      message: "Journal Deleted Successfully!"
    });

  }catch (error) {
    console.error("Error Deleting Journal", error);
    return res.status(500).json({
      status: "error",
      message: "Technical Error — Could Not Delete Journal!",
    });
  };
}

// Route 7 - Delete All Journals of User
export const deleteAllJournal = async (req, res) => {
  // Taking userId from Middleware
  const userId = req.userId ;

  try {
    // Delete All Journals Belonging to User
    const result = await Journal.deleteMany({ _uid: userId }) ;

    // Validate Deletion
    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Delete Failed - No Journals Found for the User!",
      });
    }
    
    // Response to Frontend
    res.status(200).json({
      status: "success",
      deletedJournalCount: result.deletedCount,
      message: "All Journals Deleted Successfully."
    });
  
  }catch (error) {
    console.error("Error Deleting Journals", error);
    return res.status(500).json({
      status: "error",
      message: "Technical Error — Could Not Delete Journals!",
    });
  };
}