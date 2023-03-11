import React from "react";

function Statistics() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Statistics</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Total Users</h2>
          <p className="text-4xl font-bold">42</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Total Quizzes</h2>
          <p className="text-4xl font-bold">13</p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
