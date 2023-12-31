import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import './ItemMaterialsStyle.css';
import CartButton from '../CartButton/CartButton';
import { Item, Material } from '@/app/itemSlice';
import Image from 'next/image';
import { ImaterialsData } from '@/pages/catalog/[category]/[item]';

interface IitemMaterialsProps {
  itemId: number;
  itemData: Item;
  materialsData: ImaterialsData[];
}

export default function ItemMaterials({
  itemId,
  itemData,
  materialsData,
}: IitemMaterialsProps): JSX.Element {
  const materialsUrl = process.env.NEXT_PUBLIC_MATERIALS_URL;

  const textileData = materialsData?.map((material) => ({
    id: material.id,
    url: `${materialsUrl}${material.photo}`,
    name: material.name,
  }));

  const [selectedImage, setSelectedImage] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [selectedMaterialId, setSelectedMaterialId] = useState<number>(0);
  const [materialAlert, setMaterialAlert] = useState('');

  const handleImageClick = (
    url: string,
    name: string,
    materialId: number
  ): void => {
    setSelectedImage(url);
    setMaterialName(name);
    setSelectedMaterialId(materialId);
    setMaterialAlert('');
  };

  return (
    <div
      className="textile_choose_div"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {itemData.in_stock ? (
        <>
          <span className={`textile_choose ${materialAlert}`}>
            Материал изделия:{' '}
            {textileData.filter((el) => el.id === itemData.material_id)[0].name}
          </span>
          <div className="materials">
            {textileData
              .filter((el) => el.id === itemData.material_id)
              .map((textile, index) => (
                <div className="one_material_div" key={textile.id}>
                  <div className={`textile_icons selected`}>
                    <Image
                      src={textile.url}
                      alt={`Textile ${textile.id}`}
                      width={100}
                      height={100}
                      priority={true}
                      style={{
                        objectFit: 'cover',
                        borderRadius: '5px',
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <span className={`textile_choose ${materialAlert}`}>
            Выберите материал: {materialName}
          </span>
          <div className="materials">
            {textileData.map((textile, index) => (
              <div className="one_material_div" key={textile.id}>
                <div
                  className={`textile_icons${index === 0 ? ' first' : ''}${
                    index === textileData.length - 1 ? ' last' : ''
                  } ${selectedImage === textile.url ? 'selected' : ''}`}
                  onClick={() =>
                    handleImageClick(textile.url, textile.name, textile.id)
                  }
                >
                  <Image
                    src={textile.url}
                    alt={`Textile ${textile.id}`}
                    width={100}
                    height={100}
                    priority={true}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '5px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <CartButton
        itemId={itemId}
        itemData={itemData}
        selectedMaterialName={materialName}
        selectedMaterialId={selectedMaterialId}
        setMaterialAlert={setMaterialAlert}
      />
    </div>
  );
}
