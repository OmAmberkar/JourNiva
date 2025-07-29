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
    const updatedJournal = await journals.findByIdAndUpdate(
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
};

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
    const Journal = await journals.findByIdAndDelete({ _id: journalID });

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
    const User = await journals.findOneAndDelete({ _uid: userID});
    if (!User) {
      return res.status(404).json({ message: "No user found for this user ID." });
    }
    res.status(200).json({
      status: "Success",
      userID: User._id,
      message: "All journals deleted Successfully."
    });u
  }catch (error) {
    console.error("Error deleting Journals", error);
    return res.status(500).json({
      status: "error",
      message: "Technical error—could not delete journals.",
    });
  };
}

