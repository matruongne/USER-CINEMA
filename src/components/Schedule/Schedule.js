import React from 'react';

// Dữ liệu lịch chiếu với đường dẫn ảnh từ thư mục src/Photo/
const scheduleData = [
    {
        movie: 'Godzilla x Kong: The New Empire',
        times: ['10:00', '13:30', '17:00', '20:00'],
        image: '/godzilla-kong.jpg'
    },
    {
        movie: 'Dune: Part Two',
        times: ['11:00', '14:45', '18:30', '21:15'],
        image: '/dune2.jpg'
    },
    {
        movie: 'Deadpool & Wolverine',
        times: ['09:30', '12:15', '16:00', '19:45'],
        image: '/deadpool-wolverine.jpg'
    },
];

const Schedule = () => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Lịch Chiếu</h2>
            <ul>
                {scheduleData.map((item, index) => (
                    <li key={index} className="mb-4 flex items-center space-x-4">
                        <img src={item.image} alt={item.movie} className="w-24 h-36 object-cover rounded-lg shadow" />
                        <div>
                            <h3 className="text-lg font-semibold">{item.movie}</h3>
                            <p className="text-gray-400">{item.times.join(' | ')}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Schedule;
