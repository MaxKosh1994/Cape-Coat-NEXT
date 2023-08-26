import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import './ItemMaterialsStyle.css';

export default function ItemMaterials() {
  const materialsData = useSelector(
    (state: RootState) => state.itemSlice.materials
  );
  const materialsUrl = process.env.NEXT_PUBLIC_MATERIALS_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const textileData = materialsData?.map((material) => ({
    id: material.id,
    url: `${materialsUrl}${material.photo}`,
    name: material.name,
  }));
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };
  console.log('textileData', materialsData);
  return (
    <div
      className="textile_choose_div"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span className="textile_choose">Примеры материалов изделия</span>
      <div className="materials">
        {textileData.map((textile, index) => (
          <div className="one_material_div">
            <span>{textile.name}</span>
            <div
              className={`textile_icons${index === 0 ? ' first' : ''}${
                index === textileData.length - 1 ? ' last' : ''
              }`}
              key={textile.id}
              onClick={() => handleImageClick(textile.url)}
            >
              <img
                src={textile.url}
                alt={`Textile ${textile.id}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
