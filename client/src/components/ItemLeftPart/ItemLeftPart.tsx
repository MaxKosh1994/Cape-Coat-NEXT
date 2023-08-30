import React from 'react';

import './itemLeftPartComp.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomCarousel from '../carousel/CustomCarousel';
import Image from 'next/image';

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
                className="product-img"
                id={`img${index}`}
                data-target={`#img${index}`}
                key={`img${index}`}
              >
                <Image
                  src={item.url}
                  alt="photo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
