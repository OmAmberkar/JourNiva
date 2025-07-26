import React, { useState } from "react";

const SettingsModal = ({ onClose }) => {
  const [displayName, setDisplayName] = useState("Username");
  const [reminderTime, setReminderTime] = useState("08:00");
  const [avatarUrl, setAvatarUrl] = useState("/Logo.png");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  const avatars = ["Logo.png", "Avatar1.png", "Avatar2.png", "Avatar3.png"];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleSave = () => {
    // You can later replace this with real save logic (e.g., API/localStorage)
    const settings = {
      displayName,
      reminderTime,
      avatarUrl,
      dateFormat,
    };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("Settings saved!");
    onClose(); // Optional: close modal after saving
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center backdrop-blur-sm bg-black/30 text-[#3E5973]">
      <div className="bg-[#c3d7e8] rounded-2xl p-8 shadow-2xl w-[90%] max-w-xl animate-settingsOpen border border-[#3E5973]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#3E5973]">Settings</h2>
          <button
            onClick={onClose}
            className="text-4xl text-[#3E5973] hover:text-[#2c4258] transition cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Settings Fields */}
        <div className="space-y-6 text-[#3E5973]">
          {/* Display Name */}
          <div>
            <label className="block font-semibold mb-2 text-[15px]">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border border-[#3E5973] px-4 py-2 rounded-lg text-black outline-none focus:ring-1 focus:ring-[#435e79]"
            />
          </div>

          {/* Reminder Time */}
          <div>
            <label className="block font-semibold mb-2 text-[15px]">
              Daily Reminder Time
            </label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full border border-[#3E5973] px-4 py-2 rounded-lg text-black cursor-pointer outline-none focus:ring-1 focus:ring-[#435e79]"
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block font-semibold mb-2 text-[15px]">
              Choose Avatar
            </label>
            <div className="flex flex-wrap justify-left gap-4">
              {avatars.map((img) => (
                <img
                  key={img}
                  src={`/${img}`}
                  alt="avatar"
                  onClick={() => setAvatarUrl(`/${img}`)}
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 p-0.5 transition-transform hover:scale-105 ${
                    avatarUrl === `/${img}`
                      ? "border-[#3E5973]"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Date Format */}
          <div>
            <label className="block font-semibold mb-2 text-[15px]">
              Date Format
            </label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full border border-[#3E5973] px-4 py-2 rounded-lg text-black cursor-pointer outline-none focus:ring-1 focus:ring-[#435e79]"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex justify-between pt-6">
          <button
            onClick={handleSave}
            className="bg-[#3E5973] hover:bg-[#2c4258] text-white font-semibold py-2 px-8 rounded-lg transition duration-200 cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={handleLogout}
            className="bg-[#3E5973] hover:bg-[#2c4258] text-white font-semibold py-2 px-8 rounded-lg transition duration-200 cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

// import React, { useState } from "react";

// const SettingsModal = ({ onClose }) => {
//   const [displayName, setDisplayName] = useState("Username");
//   const [reminderTime, setReminderTime] = useState("08:00");
//   const [avatarUrl, setAvatarUrl] = useState("/Logo.png");
//   const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

//   const avatars = ["Logo.png", "Avatar1.png", "Avatar2.png", "Avatar3.png"];

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div className="fixed inset-0 z-70 flex items-center justify-center backdrop-blur-sm bg-black/30 text-[#3E5973]">
//       <div className="bg-[#c3d7e8] rounded-2xl p-8 shadow-2xl w-[90%] max-w-xl animate-settingsOpen border border-[#3E5973]">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-[#3E5973]">Settings</h2>
//           <button
//             onClick={onClose}
//             className="text-4xl text-[#3E5973] hover:text-[#2c4258] transition cursor-pointer"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Settings Fields */}
//         <div className="space-y-6 text-[#3E5973]">
//           {/* Display Name */}
//           <div>
//             <label className="block font-semibold mb-2 text-[15px]">
//               Display Name
//             </label>
//             <input
//               type="text"
//               value={displayName}
//               onChange={(e) => setDisplayName(e.target.value)}
//               className="w-full border border-[#3E5973] px-4 py-2 rounded-lg text-black outline-none focus:ring-2 focus:ring-[#DCEEFF]"
//             />
//           </div>

//           {/* Reminder Time */}
//           <div>
//             <label className="block font-semibold mb-2 text-[15px]">
//               Daily Reminder Time
//             </label>
//             <input
//               type="time"
//               value={reminderTime}
//               onChange={(e) => setReminderTime(e.target.value)}
//               className="w-full border border-[#3E5973] px-4 py-2 rounded-lg text-black cursor-pointer outline-none focus:ring-2 focus:ring-[#DCEEFF]"
//             />
//           </div>

//           {/* Avatar Selection */}
//           <div>
//             <label className="block font-semibold mb-2 text-[15px]">
//               Choose Avatar
//             </label>
//             <div className="flex flex-wrap justify-left gap-4">
//               {avatars.map((img) => (
//                 <img
//                   key={img}
//                   src={`/${img}`}
//                   alt="avatar"
//                   onClick={() => setAvatarUrl(`/${img}`)}
//                   className={`w-16 h-16 rounded-full cursor-pointer border-2 border-[#3E5973] p-0.5 transition-transform hover:scale-105 ${
//                     avatarUrl === `/${img}`
//                       ? "border-[#3E5973]"
//                       : "border-transparent"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Date Format */}
//           <div>
//             <label className="block font-semibold mb-2 text-[15px]">
//               Date Format
//             </label>
//             <select
//               value={dateFormat}
//               onChange={(e) => setDateFormat(e.target.value)}
//               className="w-full border border-[#3E5973] px-4 py-2 rounded-lg text-black cursor-pointer outline-none focus:ring-2 focus:ring-[#DCEEFF]"
//             >
//               <option value="DD/MM/YYYY">DD/MM/YYYY</option>
//               <option value="MM/DD/YYYY">MM/DD/YYYY</option>
//               <option value="YYYY-MM-DD">YYYY-MM-DD</option>
//             </select>
//           </div>

//           {/* Logout Button */}
//           <div className="text-center pt-4">
//             <button
//               onClick={handleLogout}
//               className="bg-[#3E5973] hover:bg-[#2c4258] text-white font-semibold py-2 px-8 rounded-lg transition duration-200 cursor-pointer"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsModal;
