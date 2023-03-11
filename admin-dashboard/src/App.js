import React, {useState} from "react";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";

import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Landing from "./pages/landing/Landing";
import Dashboard from "./components/dashboard";
import SignUp from './components/register'
function App() {
  const { loading } = useSelector((state) => state.alerts);
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={darkMode ? "dark" : ""}>
 
     <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <div className='container'>
      <Routes>
      <Route
          path="/login"
          element={
            // <PublicRoute>
              <Login />
            //  </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            // <PublicRoute>
              <Landing />
            //  </PublicRoute>
          }
        />
         
        <Route
          path="/home"
          element={
            // <PublicRoute>
              <Dashboard/>
            // </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            // <PublicRoute>
              <SignUp />
            //  </PublicRoute>
          }
        />
      </Routes>
      </div>
    </BrowserRouter> 
   
    </div>
  );
}

export default App;