import React from 'react';

const movies = [
    {
        title: 'Godzilla x Kong: The New Empire',
        image: '/images/godzilla-kong.jpg',
        genre: 'Action, Sci-Fi',
    },
    {
        title: 'Dune: Part Two',
        image: '/images/dune2.jpg',
        genre: 'Adventure, Drama',
    },
    {
        title: 'Deadpool & Wolverine',
        image: '/images/deadpool-wolverine.jpg',
        genre: 'Action, Comedy',
    },
];

const MovieList = ({ category }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {movies.map((movie, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <img src={movie.image} alt={movie.title} className="w-full h-60 object-cover rounded-md" />
                    <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
                    <p className="text-gray-400">{movie.genre}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieList;
