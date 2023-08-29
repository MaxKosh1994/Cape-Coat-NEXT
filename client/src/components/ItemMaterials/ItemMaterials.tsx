import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import './ItemMaterialsStyle.css';
import CartButton from '../CartButton/CartButton';
import { Item, Material } from '@/app/itemSlice';

interface IitemMaterialsProps {
  itemId: number;
  itemData: Item;
}

export default function ItemMaterials({
  itemId,
  itemData,
}: IitemMaterialsProps): JSX.Element {
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
        </>
      )}

      <CartButton
        itemId={itemId}
        itemData={itemData}
        selectedMaterialId={selectedMaterialId}
        setMaterialAlert={setMaterialAlert}
      />
    </div>
  );
}
