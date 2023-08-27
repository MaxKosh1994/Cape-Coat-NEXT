import React from 'react';
import { Button, Checkbox, FormControl, Collapse, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { IItem } from '@/components/accComp/orders/types';
import { getAllItems } from '@/components/SearchBar/fetchSearch';
import SearchItemCard from '@/components/SearchItemCard/SearchItemCard';
import styles from './FormAddOrder.module.css';
import TrousersSizeForm from '@/components/Cart/trousersSizeForm';
import TrenchSizeForm from '@/components/Cart/trenchSizeForm';
import CoatSizeForm from '@/components/Cart/coatSizeForm';
import FurCoatSizeForm from '@/components/Cart/furCoatSizeForm';

export default function FormAddOrder() {
  // стейт для всех товаров в выпадающий список
  const [allItems, setAllItems] = useState<IItem[]>([]);

  // стейт для выбранных товаров
  const [selectedItems, setSelectedItems] = useState<IItem[]>([]);

  // стейт для открытия/закрытия выпадающего списка
  const [isOpen, setIsOpen] = useState(false);

  // подгрузка всех товаров в выпадающий список

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllItems();
        setAllItems(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // логика добавления в список выбранных товаров
  const isItemChecked = (item: IItem) => {
    return selectedItems.some((i) => i.id === item.id);
  };

  const handleCheckBox = (item: IItem) => {
    if (isItemChecked(item)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // логика открытия/закрытия списка
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 250 }}>
        <Button className={styles.button} onClick={handleToggle}>
          {isOpen ? 'Скрыть список товаров' : 'Показать список товаров'}
        </Button>
        <Collapse in={isOpen}>
          <Grid container spacing={2}>
            {allItems.map((item, index) => (
              <Grid item xs={3} key={index}>
                <Checkbox
                  checked={isItemChecked(item)}
                  onChange={() => handleCheckBox(item)}
                />
                <SearchItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Collapse>
        <div className={styles.selectedItemsContainer}>
          {selectedItems.map((item) => (
            <div key={item.id} className={styles.oneItemConteiner}>
              <SearchItemCard key={item.id} item={item} />
              <form action=''>
                <div className={styles.sizesFormBlock}>
                  <div>
                    <label htmlFor='height' className={styles.sizesFormLabel}>
                      Ваш рост
                    </label>
                    <input
                      type='text'
                      name='height'
                      className={styles.sizesFormInput}
                      //  onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='length' className={styles.sizesFormLabel}>
                      Длина изделия
                    </label>
                    <input
                      type='text'
                      name='length'
                      className={styles.sizesFormInput}
                      //  onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='sleeve' className={styles.sizesFormLabel}>
                      Длина рукава
                    </label>
                    <input
                      type='text'
                      name='sleeve'
                      className={styles.sizesFormInput}
                      //  onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='bust' className={styles.sizesFormLabel}>
                      Объем груди
                    </label>
                    <input
                      type='text'
                      name='bust'
                      className={styles.sizesFormInput}
                      //  onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='waist' className={styles.sizesFormLabel}>
                      Объем талии
                    </label>
                    <input
                      type='text'
                      name='waist'
                      className={styles.sizesFormInput}
                      //  onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor='hips' className={styles.sizesFormLabel}>
                      Объем бедер
                    </label>
                    <input
                      type='text'
                      name='hips'
                      className={styles.sizesFormInput}
                      //  onChange={handleChange}
                    />
                  </div>
                  {item.category_id === 4 && (
                    <TrousersSizeForm
                    //  onTrousersSizeChange={handleCustomFormChange}
                    />
                  )}
                  {item.category_id === 1 && (
                    <TrenchSizeForm
                      itemId={item.id}
                      //  onTrenchSizeChange={handleCustomFormChange}
                    />
                  )}
                  {item.category_id === 2 && (
                    <CoatSizeForm
                      itemId={item.id}
                      //  onCoatSizeChange={handleCustomFormChange}
                    />
                  )}
                  {item.category_id === 5 && (
                    <FurCoatSizeForm
                      itemId={item.id}
                      //  onFurCoatSizeChange={handleCustomFormChange}
                    />
                  )}
                </div>
                <button
                  className={styles.sizesFormBtn}
                  onClick={(event) => {
                    event.preventDefault();
                    //   handleSaveSizesInputs(index, item.id);
                  }}
                >
                  Сохранить
                </button>
              </form>
            </div>
          ))}
        </div>
      </FormControl>
    </>
  );
}
