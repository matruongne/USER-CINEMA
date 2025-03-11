import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const bannerData = [
    {
        title: 'Godzilla x Kong: The New Empire',
        image: '/images/godzilla-kong.jpg',
    },
    {
        title: 'Dune: Part Two',
        image: '/images/dune2.jpg',
    },
    {
        title: 'Deadpool & Wolverine',
        image: '/images/deadpool-wolverine.jpg',
    },
];

const Banner = () => {
    return (
        <div className="w-full h-[500px]">
            <Swiper navigation={true} modules={[Navigation]} className="h-full">
                {bannerData.map((item, index) => (
                    <SwiperSlide key={index} className="relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <h2 className="text-white text-3xl font-bold">{item.title}</h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
