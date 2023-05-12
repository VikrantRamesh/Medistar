import React, { useState, useEffect } from "react";
const StatisticBox = ({ title, number }) => {
    return (
        <div className="flex-1 m-2 rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-110 transition duration-500 ease-in-out">
            <div className="dark:bg-teal-400 bg-indigo-600 p-6  transition-all duration-1000">
            <div className="flex flex-col items-center">
                <div className="text-white text-4xl font-bold mb-2">
                {number}
                </div>
                <div className="text-white text-lg">{title}</div>
            </div>
            </div>
        </div>
    );
};
export default StatisticBox;