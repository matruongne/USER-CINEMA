import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
    { src: '/images/Banner_1.jpg', link: '/dat-ve/phim1' },
    { src: '/images/Banner_2.jpg', link: '/dat-ve/phim2' },
    { src: '/images/Banner_3.jpg', link: '/dat-ve/phim3' }
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
            {banners.map((banner, index) => (
                <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                        src={banner.src}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
            
            {/* Nút điều hướng */}
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
                onClick={prevSlide}
            >
                <ChevronLeft size={30} className="text-white" />
            </button>
            
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition"
                onClick={nextSlide}
            >
                <ChevronRight size={30} className="text-white" />
            </button>
        </div>
    );
};

export default Banner;
