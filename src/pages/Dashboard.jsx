import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  generateBulletPoints,
  generateSummary,
} from "./../store/data/dataSlice";
import { Link } from "react-router-dom";
import { logout } from "../store/auth/authSlice"; 
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {messages ,loading} = useSelector((state) => state.data);
  const [input, setInput] = useState("");
  console.log("mess", loading);



const handleLogout = () => {
  dispatch(logout());
  navigate("/signin"); 
  console.log('navigating');
};
  const handleSend = (type) => {
    if (input.trim().length === 0) return;

    const message = input.trim();

    // 🟩 Step 1: Add user's message
    dispatch(addMessage({ data: message, from: "user" }));

    // 🟩 Step 2: Call respective API
    if (type === "bullet") {
      dispatch(generateBulletPoints(message));
    } else if (type === "summary") {
      dispatch(generateSummary(message));
    }

    setInput(""); // clear input
  };

  return (
    <div className="flex h-screen dark:bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 dark:bg-gray-900 p-4">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block p-2 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-800 dark:bg-gray-900 p-4 flex justify-between items-center border-b border-gray-700">
          <h1 className="text-xl font-bold">squareAI Chatbot</h1>
          {/* <Link to="/" className="text-red-400 hover:text-red-300 font-medium">
            Logout
          </Link> */}
          <button
  onClick={handleLogout}
  className="text-red-400 hover:text-red-300 font-medium"
>
  Logout
</button>
        </div>

        {/* Chat Box */}
       
        <div className="flex-1 p-4 overflow-y-auto space-y-2 flex flex-col">
  {messages.map(({ data, from }, index) => (
    <div
      key={index}
      className={`w-full flex ${from === "bot" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`p-3 rounded-lg max-w-lg ${
          from === "bot" ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
        }`}
      >
        {data}
      </div>
    </div>
  ))}
</div>


        {/* Input Area */}
        <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-gray-800 dark:bg-gray-900">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
            onKeyDown={(e) => {

              if (e.key === "Enter"){ loading || handleSend("bullet")};
            }}
          />
          <button
            onClick={() => handleSend("bullet")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
            disabled={loading}
         >
            Generate bullet-point
          </button>
          <button
            onClick={() => handleSend("summary")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
            disabled={loading}

          >
            Generate Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;