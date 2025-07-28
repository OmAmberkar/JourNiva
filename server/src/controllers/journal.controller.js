import Journal from "../../models/journal.model.js";
import User from "../../models/user.model.js";

// Route 1 - Create New Journal
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
      content,
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

// Route 3 - Getall Journal
export const getAllJournal = async (req, res) => {
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

// Route 2 - Get Journal by Date
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

// Route - 4 Get journal by ID
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

// Route - 6 update journal by ID
export const updateJournalByID = async (req, res) => {
  const { journalID } = req.params;
  const { date, title, mood, content } = req.body;

  if (!journalID) {
    return res.status(400).json({
      status: "Failed",
      message: "Journal ID is required to update the journal.",
    });
  }

  try {
    const updatedJournal = await Journal.findByIdAndUpdate(
      journalID,
      { date, title, mood, content },
      { new: true }
    );

    if (!updatedJournal) {
      return res.status(404).json({
        status: "Failed",
        message: "Journal not found.",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Journal Updated Successfully !",
      data: updatedJournal,
    });
  } catch (error) {
    console.error("Error updating Journal", error);
    return res.status(500).json({
      status: "error",
      message: "Technical error—could not update journal.",
    });
  }
}
// Route - 7 delete one journal using Journal ID
export const deleteOneJournal = async (req, res) => {
  const { journalID } = req.params;

  if (!journalID) {
    return res.status(400).json({
      status: "Failed",
      message: "Journal ID is required to delete the journal.",
    });
  }
  try {
    const Journal = await Journal.findByIdAndDelete({ _id: journalID });

    if (!Journal) {
      return res.status(404).json({ message: "No journal found for this journal ID." });
    }
    res.status(200).json({
      status: "Success",
      journalID: Journal._id,
      message: "Journal deleted Successfully."
    });
  }catch (error) {
    console.error("Error deleting Journal", error);
    return res.status(500).json({
      status: "error",
      message: "Technical error—could not delete journal.",
    });
  };
}
// Route - 8 :delete all journal by user Id
export const deleteAllJournal = async (req, res) => {
   const { userID } = req.params;

   if (!userID) {
    return res.status(400).json({
      status: "Failed",
      message: "User ID is required to delete all journal.",
    });
  }

  try {
    const User = await Journal.findOneAndDelete({ _uid: userID});
    if (!User) {
      return res.status(404).json({ message: "No user found for this user ID." });
    }
    res.status(200).json({
      status: "Success",
      userID: User._id,
      message: "All Journal deleted Successfully."
    });u
  }catch (error) {
    console.error("Error deleting Journal", error);
    return res.status(500).json({
      status: "error",
      message: "Technical error—could not delete Journal.",
    });
  };
}

