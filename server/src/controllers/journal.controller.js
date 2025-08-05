import Journal from "../../models/journal.model.js";
import User from "../../models/user.model.js";

// Route 1 Controller - Create New Journal
export const createJournal = async (req, res) => {
  // Taking userId from Middleware 
  const userId = req.userId ;

  // Validate userId
  if (!userId) {
    return res.status(401).json({
      status: "failed",
      message: "User Unauthorized. Please login to create a Journal."
    });
  }

  // Destructure request body
  const { title, content, iconUrl, mood, location, date } = req.body;

  // Validate title and content
  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({
      status: "failed",
      message: "Title and Content are required to create a Journal."
    });
  }

  try {
    //Getting the User for snapshot
    const user = await User.findById(userId).select("name");

    // Validate User
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found. Please Register!"
      });
    }

    // Creating New Journal if user exists
    const newJournal = await Journal.create({
      _uid: user.id,
      nameSnapshot: user.name,
      title: title.trim(),
      content:content.trim(),
      date: date ? new Date(date) : new Date(),
      mood,
      iconUrl,
      location,
    });

    return res.status(201).json({
      status: "success",
      message: "Successfully Created New Journal",
      data: newJournal
    });

  } catch (error) {
      console.error("Error while creating new Journal", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Route 2 Controller - Get Journal By Date
export const getJournalsByDate = async (req, res) => {
  // Taking userId from Middleware
    const userId = req.userId ;

  // Taking date from request params
    const { date } = req.params ;

  // Validate Date format using Validator
  if(!validator.isDate(date)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid Date format. Please provide a valid date."
    });
  }

  try {
    // Access all Journals by userId and date - find() returns an array
    const Journal = await Journal.find({ _uid : userId , date });

    // find() returns an array, so we check if it's empty
    if (Journal.length === 0) {
      return res.status(404).json({ 
        status : "failed",
        message: "No Journal found for this Date." });
    }

    res.status(200).json({
      status: "success",
      message: "Journal retrieved Successfully for the given Date!",
      data: Journal
    });

  } catch (error) {
    console.error("Error fetching journal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Route 3 Controller - Get All Journal
export const getAllJournals = async (req, res) => {
  // Taking userId from Middleware
    const userId = req.userId ;

  // Validate userId  
  if (!userId) {
    return res.status(401).json({
      status: "failed",
      message: "User Unauthorized. Please Register or Login!",
    });
  }

  try {
    // Access all Journals by userId - find() returns an array
    const Journal = await Journal
      .find({ _uid: userId })
      .sort({ date: -1 })
      .select(" title date mood iconUrl")
      .lean();

    // find() returns an array, so we check if it's empty
    if (Journal.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No Journals found! Please create a Journal.",
      });
    }

    return res.status(200).json({
      status: "success",
      count: Journal.length,
      data: Journal,
      message: "All Journals retrieved Successfully!",
    });

  } catch (error) {
    console.error("Error fetching Journal", error);
    return res.status(500).json({
      status: "failed",
      message: "Technical Error - Could not fetch Journal.",
    });
  }
};


// Route 4 Controller Get Journal By ID
export const viewJournal = async (req ,res) => {
  // Taking userId from Middleware
  const userId = req.userId;

  // Taking journalId from request params
  const { journalId } = req.params;

  // Validate journalId
  if (!journalId) {
    return res.status(400).json({
      status: "Failed",
      message: "Journal Id is required to fetch the journal.",
    });
  }

  // Validate userId
  if (!userId) {
    return res.status(401).json({
      status: "failed",
      message: "User Unauthorized. Please Register or Login!",
    });
  }

  try {
    // Accessing the Journal by journalId
    const Journal = await Journal.findById({ journalId }).lean();

    // Check if Journal exists
    if (!Journal) {
      return res.status(404).json({
        status: "failed",
        message: "Journal not found for this Journal ID.",
      });
    }

    // Check if the Journal belongs to the user
    if (Journal._uid.toString() !== userId.toString()) {
      return res.status(403).json({
        status: "failed",
        message: "Unauthorized access to this Journal.",
      });
    }

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
      message: "Technical Error - Could not fetch Journal.",
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
export const deleteAllJournals = async (req, res) => {
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