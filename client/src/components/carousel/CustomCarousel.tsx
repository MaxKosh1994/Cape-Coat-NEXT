import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Pagination, Navigation]);

interface ImageData {
  id: number;
  url: string;
}

interface CustomCarouselProps {
  imageData: ImageData[];
}

export default function CustomCarousel({
  imageData,
}: CustomCarouselProps): JSX.Element {
  return (
    <Swiper
      slidesPerView={3}
      centeredSlides={true}
      spaceBetween={0}
      pagination={{
        type: 'bullets',
      }}
      loop={true}
      slideToClickedSlide={true}
      className="mySwiper"
      breakpoints={{
        180: {
          slidesPerView: 1,
        },
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
      }}
    >
      {imageData &&
        imageData.map((item) => (
          <SwiperSlide key={item.id} className="slide-container">
            <img
              src={item.url}
              alt={`Image ${item.id}`}
              style={{ width: '100%' }}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
