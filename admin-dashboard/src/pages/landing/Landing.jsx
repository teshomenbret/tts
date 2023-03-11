import React from "react";

function Landing() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-purple-800 to-indigo-500">
      <div className="flex flex-1 items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">Welcome to Quiz Bot Admin Dashboard</h1>
          <p className="mt-4 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className="mt-8 px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white">
            <a href="/register">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;

