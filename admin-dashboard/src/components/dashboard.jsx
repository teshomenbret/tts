import React, { useState } from "react";
import { IoIosStats, IoMdAddCircleOutline } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import AddQuiz from "./addQuiz";
import UserList from "./user-list";
import Statistics from "./statistics";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("statistics");

  const handleClick = (tab) => {
    setActiveTab(!tab);
  };
  return (
    <div className=" flex h-screen">
      <div className=" bg-gray-800 text-white w-64 flex flex-col h-full">
        <div className="h-16 flex justify-center items-center font-bold text-2xl">
          <div className="block mt-8  space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src="https://picsum.photos/id/1025/200/200"
              alt="Admin Profile"
            />
            <div>
              <p className=" text-gray-800 dark:text-gray-200 font-medium">
                John Doe
              </p>
              <p className="block text-gray-600 dark:text-gray-400 text-sm">Admin</p>
            </div>
          </div>
        
        </div>
        <ul className="flex-grow flex flex-col justify-start items-start">
          <li className="hover:bg-slate-400 p-4">
            <a
              href="statistics"
              className={`flex items-center ${
                activeTab === "statistics" ? "text-blue-500" : ""
              }`}
              onClick={() => handleClick("statistics")}
            >
              <IoIosStats className="inline mr-2" />
              <span className="ml-1">Stats</span>
            </a>
          </li>
          <li className="hover:bg-slate-400 p-4">
            <Link
              to="/add-quiz"
              className={`flex items-center ${
                activeTab === "add-quiz" ? "text-blue-500" : ""
              }`}
              onClick={() => handleClick("add-quiz")}
            >
              <IoMdAddCircleOutline className="inline mr-2" />
              <span className="ml-1">Add Quiz</span>
            </Link>
          </li>
          <li className="hover:bg-slate-400 p-4">
            <a
              href="user-list"
              className={`flex items-center ${
                activeTab === "user-list" ? "text-blue-500" : ""
              }`}
              onClick={() => handleClick("user-list")}
            >
              <FaUsers className="inline mr-2" />
              <span className="ml-1">User List</span>
            </a>
          </li>
        </ul>
        <div className="h-16 flex justify-center items-center hover:bg-gray-700 p-4">
          <RiLogoutBoxRLine className="inline mr-2" />
          <span>Logout</span>
        </div>
      </div>
      <div className="flex-grow bg-gray-100">
        {activeTab === "add-quiz" && <AddQuiz />}
        {activeTab === "user-list" && <UserList />}
        {activeTab === "statistics" && <Statistics />}
      </div>
    </div>
  );
}

export default Dashboard;
