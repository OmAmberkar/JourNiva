/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.) - Convert to Monday start
  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    // Convert Sunday (0) to 6, Monday (1) to 0, etc.
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  // Check if date is today
  const isToday = (year, month, day) => {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  // Check if date is selected
  const isSelected = (year, month, day) => {
    if (!selectedDate) return false;
    return (
      year === selectedDate.getFullYear() &&
      month === selectedDate.getMonth() &&
      day === selectedDate.getDate()
    );
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add blank days for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, isBlank: true });
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isBlank: false,
        isToday: isToday(currentYear, currentMonth, day),
        isSelected: isSelected(currentYear, currentMonth, day)
      });
    }

    // Fill remaining slots to complete the grid (42 total cells for 6 weeks)
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push({ day: null, isBlank: true });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDateClick = (day) => {
    if (day) {
      const newSelectedDate = new Date(currentYear, currentMonth, day);
      setSelectedDate(newSelectedDate);
    }
  };

  return (
    <div className="w-full h-full bg-transparent">
      <div className="w-full bg-transparent">
        {/* Calendar Header */}
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-lg font-medium text-gray-600">
            {months[currentMonth]} {currentYear}
          </h2>
          
          <button
            onClick={() => navigateMonth('next')}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Weekdays Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((weekday, index) => (
            <div
              key={index}
              className="h-8 flex items-center justify-center text-sm font-medium text-gray-400"
            >
              {weekday}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays().map((dayObj, index) => {
            const { day, isBlank, isToday, isSelected } = dayObj;
            
            return (
              <div
                key={index}
                onClick={() => handleDateClick(day)}
                className={`
                  h-10 flex items-center justify-center text-sm transition-all duration-200 rounded-lg
                  ${isBlank 
                    ? 'text-transparent cursor-default' 
                    : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
                  }
                  ${isToday 
                    ? 'bg-blue-500 text-white font-medium shadow-sm hover:bg-blue-600' 
                    : ''
                  }
                  ${isSelected && !isToday 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : ''
                  }
                `}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Journal Status */}
        <div className="mt-4 px-4 py-2 text-center">
          <p className="text-sm text-gray-400">
            {selectedDate ? (
              <span>
                Journal entry for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </span>
            ) : (
              "No journal was written on this date"
            )}
          </p>
          {selectedDate && (
            <p className="text-xs text-gray-500 mt-1">
              on date mood emoji<br />
              title on hover
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;