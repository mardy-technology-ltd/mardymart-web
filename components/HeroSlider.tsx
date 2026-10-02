"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSlider() {
  const slides = [
    { id: 1, image: 'https://picsum.photos/seed/slider1/1400/450' },
    { id: 2, image: 'https://picsum.photos/seed/slider2/1400/450' },
    { id: 3, image: 'https://picsum.photos/seed/slider3/1400/450' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-pagination-bullet {
          background: #ffffff !important;
          opacity: 0.7;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: var(--primary) !important;
          opacity: 1;
          width: 22px !important;
          border-radius: 9999px !important;
        }
        .swiper-button-next, .swiper-button-prev {
          color: var(--primary) !important;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(6px);
          width: 44px !important;
          height: 44px !important;
          border-radius: 50% !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          transition: all 0.25s ease;
        }
        .swiper-button-prev {
          left: 20px !important;
        }
        .swiper-button-next {
          right: 20px !important;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: #ffffff;
          transform: scale(1.1);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 1.15rem !important;
          font-weight: 800;
        }
        @media (max-width: 768px) {
          .swiper-button-next, .swiper-button-prev {
            display: none !important;
          }
        }
      `}} />
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ width: '100%', height: '100%' }}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <img 
              src={slide.image} 
              alt={`Slide ${slide.id}`} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
