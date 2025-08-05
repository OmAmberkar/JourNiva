import Habit from "../../models/habits.model.js";
import User from "../../models/user.model.js";

//Route - 1 habit Creation.
export const createHabit = async (req , res) => {
     const { userID } = req.params ;

    if(!userID) {
        return res.status(400).json({
            status: "failed",
            message: "User ID is required."
        });
    }

        const { habitName, startDate, icon, habitDetails, createdAt, checklist } = req.body;

    if(!habitName || !startDate) {
        return res.status(400).json({
            status: "failed",
            message: "Habit name and start date are required."
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

    // creating the new habit if user exists
    const today = new Date();
    const newHabit = await Habits.create({
      userID: user._id,
      habitName,
      startDate: startDate ? new Date(startDate) : new Date(),
      icon,
      habitDetails,
      checklist: [{
        date: today,
        status: false,
    }],
      createdAt: createdAt ? new Date(createdAt) : new Date(),
    });

    return res.status(201).json({
      status: "Success",
      message: "Successfully Posted New Habit",
      data: newHabit,
    });
  } catch (error) {
    console.error("Error while creating new Habit", error);
    return res.status(500).json({ message: "Cant store data due to technical issue" });
  }
};

// Route 2 - Get Todays Checklist for All Habits by User ID

export const getHabitsToday = async (req, res) => {
  const { userID } = req.params;

  if (!userID) {
    return res.status(400).json({
      status: "failed",
      message: "User ID is required",
    });
  }

  try {
    const habits = await Habits.find({ userID: userID });
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to 00:00 for comparison


    const updatedHabits = await Promise.all(
      habits.map(async (habit) => {
        if (!Array.isArray(habit.checklist)) {
      habit.checklist = [];
    }
        const exists = habit.checklist.some((entry) => {
          const entryDate = new Date(entry.date);
          entryDate.setHours(0, 0, 0, 0);
          return entryDate.getTime() === today.getTime();
        });

        if (!exists) {
          habit.checklist.push({
            date: today,
            status: false
          });
          await habit.save(); // Update DB with new entry
        }

        return {
          habitID: habit._id,
          habitName: habit.habitName,
          startDate: habit.startDate,
          icon: habit.icon,
          checklist: habit.checklist,
        };
      })
    );

    return res.status(200).json({
      status: "success",
      message: "Today's habits retrieved",
      data: updatedHabits,
    });
  } catch (error) {
    console.error("Error fetching today's habit checklist:", error);
    return res.status(500).json({
      status: "error",
      message: "Could not fetch today's habits due to technical issue.",
    });
  }
};



// Route 3 - Get All Habits Checklist for a Week by User ID
export const getHabitsWeek = async (req, res) => {
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

    const userHabits = await Habits.find({ userID: userID });

    const filteredHabits = userHabits.map((habit) => {
      const weeklyChecklist = habit.checklist.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= endDate;
      });

      return {
        habitID: habit._id,
        habitName: habit.habitName,
        icon: habit.icon,
        startDate: habit.startDate,
        checkList: weeklyChecklist,
      };
    });

    return res.status(200).json({
      status: "success",
      message: "Weekly habits retrieved successfully",
      data: filteredHabits,
    });

  } catch (error) {
    console.error("Error fetching weekly habit checklist:", error);
    return res.status(500).json({
      status: "error",
      message: "Could not fetch habits due to technical issue.",
    });
  }
};

// Route 4 - Update a habit by Habit ID
export const updateHabit = async (req, res) => {
  const { habitID } = req.params;
  const { habitName, startDate, icon, habitDetails } = req.body;

  if (!habitID) {
    return res.status(400).json({
      status: "failed",
      message: "Habit ID is required.",
    });
  }

  try {
    const updateHabit = await Habits.findByIdAndUpdate(
      habitID,
      { habitName, startDate, icon, habitDetails },
      { new: true }
    );

    if (!updateHabit) {
      return res.status(404).json({
        status: "failed",
        message: "Habit is not found.",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Habit is updated successfully.",
      data: updateHabit,
    });
   } catch (error) {
    console.error("Error while updating habit:", error);
    return res.status(500).json({
      status: "error",
      message: "Can't update habit due to a technical issue.",
    });
  }
};


//Route - 5 Delete the Habit
export const deleteHabit = async (req, res) => {
  const { habitID } = req.params;

  if (!habitID) {
    return res.status(400).json({
      status: "failed",
      message: "Habit ID is required.",
    });
  }

  try {
    const habit = await Habit.findById(habitID);
    if (!habit) {
      return res.status(404).json({
        status: "failed",
        message: "Habit not found.",
      });
    }
    await Habit.deleteOne({ _id: habitID });
    return res.status(200).json({
      status: "success",
      habitID: habit._id,
      message: "Habit deleted successfully."
    });
  } catch (error) {
    console.error("Error while deleting habit", error);
    return res
      .status(500)
      .json({ message: "Cant delete data due to technical issue" });
  }
};

// Route 6 - Habit Checklist Toggle
export const habitChecklist = async (req, res) => {
  const { habitID } = req.params;
  const { date, status } = req.body;

  if (!habitID || !date || typeof status !== "boolean") {
    return res.status(400).json({
      status: "failed",
      message: "Habit ID, date, and status are required."
    });
  }

  try {
    const habit = await Habits.findById(habitID);
    if (!habit) {
      return res.status(404).json({
        status: "failed",
        message: "Habit not found."
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
    const checklistEntry = habit.checklist.find(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.toISOString().split('T')[0] === targetDate.toISOString().split('T')[0];
    });

    if (checklistEntry) {
      checklistEntry.status = status;
    } else {
      habit.checklist.push({ date: targetDate, status });
    }

    await goal.save();

    return res.status(200).json({
      status: "success",
      message: "Habit checklist updated successfully.",
      data: {
        habitID: habit._id,
        checklist: habit.checklist,
      }
    });
  } catch (error) {
    console.log('Error while toggling habit checklist:', error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while toggling habit checklist."
    });
  }
};

