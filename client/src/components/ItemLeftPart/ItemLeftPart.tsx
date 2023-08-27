import React from 'react';

import './itemLeftPartComp.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomCarousel from '../carousel/CustomCarousel';

interface ImageData {
  id: number;
  url: string;
}

interface CustomCarouselProps {
  imageData: ImageData[];
}

export default function ItemLeftPart({
  imageData,
}: CustomCarouselProps): JSX.Element {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className="product__media">
      {isMobile ? (
        <CustomCarousel imageData={imageData} />
      ) : (
        <div className="product__media-list">
          {imageData.map((item, index) => (
            <div className="product__media-item" key={`img-${item.id}`}>
              <div
                className={`product-img swiper-slide ${
                  index === 0 ? 'active' : ''
                }`}
                id={`img${index}`}
                data-target={`#img${index}`}
                key={`img${index}`}
              >
                <img src={item.url} alt="" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
