import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const movies = [
    { title: 'Godzilla x Kong: The New Empire', image: '/images/godzilla-kong.jpg', genre: 'Action, Sci-Fi' },
    { title: 'Dune: Part Two', image: '/images/dune2.jpg', genre: 'Adventure, Drama' },
    { title: 'Deadpool & Wolverine', image: '/images/deadpool-wolverine.jpg', genre: 'Action, Comedy' },
    { title: 'Kung Fu Panda 4', image: '/images/kungfu-panda4.jpg', genre: 'Animation, Comedy' },
    { title: 'The Batman 2', image: '/images/batman2.jpg', genre: 'Action, Crime' },
];

const MovieList = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.85; // Cuộn theo 85% chiều rộng của container
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative w-full max-w-[1000px] mx-auto">
            {/* Nút sang trái */}
            <button 
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900/50 text-white p-3 rounded-full hover:bg-gray-700 transition-all"
            >
                <ChevronLeft size={32} />
            </button>

            {/* Danh sách phim có thể cuộn */}
            <div ref={scrollRef} className="overflow-hidden w-full">
                <div className="flex space-x-6 p-4 transition-all ease-in-out duration-500" style={{ scrollBehavior: 'smooth' }}>
                    {movies.map((movie, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg w-[32%] shrink-0">
                            <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover rounded-md" />
                            <h3 className="text-lg font-bold mt-2 text-white">{movie.title}</h3>
                            <p className="text-gray-400">{movie.genre}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nút sang phải */}
            <button 
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900/50 text-white p-3 rounded-full hover:bg-gray-700 transition-all"
            >
                <ChevronRight size={32} />
            </button>
        </div>
    );
};

export default MovieList;
