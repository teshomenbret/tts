import React,{useState} from "react";
import { IoIosStats, IoMdAddCircleOutline, IoMdList } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import AddQuiz from "./addQuiz";
import UserList from "./user-list";
import Statistics from "./statistics";
function Dashboard() {
    const [activeTab, setActiveTab] = useState("add-quiz");
  
    const handleClick = (tab) => {

      setActiveTab(tab);
    };
    const renderTab = () => {
      switch (activeTab) {
        case "add-quiz":
          return <AddQuiz />;
        case "user-list":
          return <UserList />;
        case "statistics":
          return <Statistics />;
        default:
          return null;
      }
    };
  
    return (
   
        <div className="flex h-screen">
          <div className="bg-gray-800 text-white w-64 flex flex-col">
            <div className="h-16 flex justify-center items-center font-bold text-2xl">
              Admin Dashboard
            </div>
            <ul className="flex-grow ">
              <li className="hover:bg-slate-400 p-4">
                <a href="statistics" onClick={() => handleClick("add-quiz")}>
                <IoIosStats className="inline mr-2" />Stats
                </a>
              </li>
              <li className="hover:bg-slate-400 p-4">
                <a href="add-quiz" onClick={() => handleClick("add-quiz")}>
                <IoMdAddCircleOutline className="inline mr-2" />Add Quiz
                </a>
              </li>
              <li className="hover:bg-slate-400 p-4">
                <a href="user-list" onClick={() => handleClick("user-list")}>
                <FaUsers className="inline mr-2" />User List
                </a>
              </li>
            </ul>
            <div className="h-16 flex justify-center items-center hover:bg-gray-700 p-4">
              <RiLogoutBoxRLine className="inline mr-2" />
              Logout
            </div>
          </div>
          <div className="flex-grow bg-gray-100">{renderTab()}</div>
        </div>
    
    );
  }

  export default Dashboard;