import Journal from "../../models/journal.model.js";
import User from "../../models/user.model.js";

//create new journal
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
    const newJournal = await Journal.create({
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

//getall journals
export const getAllJournals = async (req, res) => {
  const userId = req.params.userID || req.user?._uid;
  if (!userId) {
    return res.status(400).json({
      status: "Failed",
      message: "No user context—provide userID or be authenticated.",
    });
  }

  try {
    const journals = await Journal.find({ _uid: userId })
      .sort({ date: -1 })
      .lean();
    return res.status(200).json({
      status: "success",
      count: journals.length,
      data: journals,
    });
  } catch (error) {
    console.error("Error fetching Journal", error);
    return res.status(500).json({
      status: "error",
      message: "Technical error—could not fetch journals.",
    });
  }
};
