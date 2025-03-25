import React from "react";
import scheduleData from "../../data/scheduleData"; // Import file chứa data thực tế

const Schedule = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Lịch Chiếu</h2>
      <ul>
        {scheduleData.map((item) => (
          <li key={item.id} className="mb-4 flex items-center space-x-4">
            {/* Hiển thị ảnh */}
            <img 
              src={item.image} 
              alt={item.movie} 
              className="w-24 h-36 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h3 className="text-lg font-semibold text-white">{item.movie}</h3>
              <p className="text-gray-400">{item.times.join(" | ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
