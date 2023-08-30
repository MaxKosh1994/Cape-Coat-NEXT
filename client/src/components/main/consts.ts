import { HorizontalBlockType, VerticalBlockType } from '@/TypeScript/mainTypes';

export const verticalBlockData: VerticalBlockType = {
  collection: {
    blockName: 'Коллекция Aw-2023',
    imgUrl: `${process.env.NEXT_PUBLIC_COLLECTION_URL}IMG_8836.JPG`,
    url: 'collection',
  },
  newArrivals: {
    blockName: 'Новые поступления',
    imgUrl: `${process.env.NEXT_PUBLIC_CATEGORY_URL}coats.jpg`,
    url: 'new-arrivals',
  },
};

export const horizontalBlockData: HorizontalBlockType = {
  bestsellers: {
    blockName: 'bestsellers',
    imgName: 'dresses.jpg',
  },
  sale: {
    blockName: 'sale',
    imgName: 'trenches.jpg',
  },
};
