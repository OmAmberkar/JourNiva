import Goals from "../../models/goals.model.js";
import User from "../../models/user.model.js";

//Route - 1 Goal Creation
export const createGoal = async (req , res) => {
     const { userID } = req.params ;

    if(!userID) {
        return res.status(400).json({
            status: "failed",
            message: "User ID is required."
        });
    }

        const { goalName, startDate, achieveByDate, icon, goalDetails, createdAt, checklist } = req.body;

    if(!goalName || !startDate || !achieveByDate) {
        return res.status(400).json({
            status: "failed",
            message: "Goal name, start date, and achieve by date are required."
        });
    }

    try {
  
    const user = await User.findById(userID).select("name");
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found.",
      });
    }

    // creating the new Goal if user exists
    const today = new Date();
    const newGoal = await Goals.create({
      userID: user._id,
      goalName,
      startDate: startDate ? new Date(startDate) : new Date(),
      achieveByDate,
      icon,
      goalDetails,
      checklist: [{
        date: today,
        status: false,
    }],
      createdAt: createdAt ? new Date(createdAt) : new Date(),
    });

    return res.status(201).json({
      status: "Success",
      message: "Successfully Posted New Goal",
      data: newGoal,
    });
  } catch (error) {
    console.error("Error while creating new Goal", error);
    return res
      .status(500)
      .json({ message: "Cant store data due to technical issue" });
  }
};

// Route 2 - Get Todays Checklist for All Goals by User ID

export const getGoalsToday = async (req, res) => {
  const { userID } = req.params;

  if (!userID) {
    return res.status(400).json({
      status: "failed",
      message: "User ID is required",
    });
  }

  try {
    const goals = await Goals.find({ userID: userID });
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to 00:00 for comparison


    const updatedGoals = await Promise.all(
      goals.map(async (goal) => {
        if (!Array.isArray(goal.checklist)) {
      goal.checklist = [];
    }
        const exists = goal.checklist.some((entry) => {
          const entryDate = new Date(entry.date);
          entryDate.setHours(0, 0, 0, 0);
          return entryDate.getTime() === today.getTime();
        });

        if (!exists) {
          goal.checklist.push({
            date: today,
            status: false
          });
          await goal.save(); // Update DB with new entry
        }

        return {
          goalID: goal._id,
          goalName: goal.goalName,
          startDate: goal.startDate,
          achieveByDate: goal.achieveByDate,
          icon: goal.icon,
          checklist: goal.checklist,
        };
      })
    );

    return res.status(200).json({
      status: "success",
      message: "Today's goals retrieved",
      data: updatedGoals,
    });
  } catch (error) {
    console.error("Error fetching today's goal checklist:", error);
    return res.status(500).json({
      status: "error",
      message: "Could not fetch today's goals due to technical issue.",
    });
  }
};



// Route 3 - Get All Goals Checklist for a Week by User ID

export const getGoalsWeek = async (req, res) => {
  const { userID } = req.params;
  const { date } = req.query;

  if (!userID || !date) {
    return res.status(400).json({
      status: "failed",
      message: "User ID and start date are required.",
    });
  }

  try {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(startDate.getDate() + 6); // 7-day range

    const userGoals = await Goals.find({ userID: userID });

    const filteredGoals = userGoals.map((goal) => {
      // if(!Array.isArray(goal.checklist)){
      //   goal.checklist = [];
      // }
      const weeklyChecklist = goal.checklist.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= endDate;
      });

      return {
        goalID: goal._id,
        goalName: goal.goalName,
        icon: goal.icon,
        startDate: goal.startDate,
        achieveByDate: goal.achieveByDate,
        checkList: weeklyChecklist,
      };
    });

    return res.status(200).json({
      status: "success",
      message: "Weekly goals retrieved successfully",
      data: filteredGoals,
    });

  } catch (error) {
    console.error("Error fetching weekly goal checklist:", error);
    return res.status(500).json({
      status: "error",
      message: "Could not fetch goals due to technical issue.",
    });
  }
};


// Route 4 - Update a Goal by Goal ID
export const updateGoal = async (req, res) => {
  const { goalID } = req.params;
  const { goalName, startDate, achieveByDate, icon, goalDetails } = req.body;

  if (!goalID) {
    return res.status(400).json({
      status: "failed",
      message: "Goal ID is required.",
    });
  }

  try {
    const updateGoal = await Goals.findByIdAndUpdate(
      goalID, 
      { goalName, startDate, achieveByDate, icon, goalDetails }, 
      { new : true}
    );

    if (!updateGoal) {
      return res.status(404).json({
        status: "failed",
        message: "Goal is not found.",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Goal is updated successfully.",
      data: updateGoal,
    });
   } catch (error) {
    console.error("Error while updating goal:", error);
    return res.status(500).json({
      status: "error",
      message: "Can't update goal due to a technical issue.",
    });
  }
};


//Route - 5 Delete the Goal
export const deleteGoal = async (req, res) => {
  const { goalID } = req.params;

  if (!goalID) {
    return res.status(400).json({
      status: "failed",
      message: "Goal ID is required.",
    });
  }

  try {
    const Goal = await Goals.find({ _id: goalID });
    if (!Goal) {
      return res.status(404).json({
        status: "failed",
        message: "Goal not found.",
      });
    }
    await Goals.deleteOne({ _id: goalID });
    return res.status(200).json({
      status: "success",
      goalID: Goal._id,
      message: "Goal deleted successfully."
    });
  } catch (error) {
    console.error("Error while deleting goal", error);
    return res
      .status(500)
      .json({ message: "Cant delete data due to technical issue" });
  }
};


// Route 6 - Goal Checklist Toggle
// Route - Checklist Toggle
export const goalChecklist = async (req, res) => {
  const { goalID } = req.params;
  const { date, status } = req.body;

  if (!goalID || !date || typeof status !== "boolean") {
    return res.status(400).json({
      status: "failed",
      message: "Goal ID, date, and status are required."
    });
  }

  try {
    const goal = await Goals.findById(goalID);
    if (!goal) {
      return res.status(404).json({
        status: "failed",
        message: "Goal not found."
      });
    }

    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid date format."
      });
    }

    // Find checklist entry for the given date (ignoring time)
    const checklistEntry = goal.checklist.find(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.toISOString().split('T')[0] === targetDate.toISOString().split('T')[0];
    });

    if (checklistEntry) {
      checklistEntry.status = status;
    } else {
      goal.checklist.push({ date: targetDate, status });
    }

    await goal.save();

    return res.status(200).json({
      status: "success",
      message: "Goal checklist updated successfully.",
      data: {
        goalID: goal._id,
        checklist: goal.checklist,
      }
    });
  } catch (error) {
    console.log('Error while toggling goal checklist:', error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while toggling goal checklist."
    });
  }
};

// Route 7 - Get Goal Analysis by user ID
