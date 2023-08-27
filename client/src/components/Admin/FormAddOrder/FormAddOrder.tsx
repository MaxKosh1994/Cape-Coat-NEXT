import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { IItem } from '@/components/accComp/orders/types';
import { getAllItems } from '@/components/SearchBar/fetchSearch';
import SearchItemCard from '@/components/SearchItemCard/SearchItemCard';
import styles from './FormAddOrder.module.css';
import FormAddUser from '../FormAddUser/FormAddUser';

export default function FormAddOrder() {
  const [allItems, setAllItems] = useState<IItem[]>([]);

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

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h3>Форма добавления заказа</h3>
        </div>

        <FormAddUser />

        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel
            style={{
              fontWeight: '700',
              color: 'rgba(90, 90, 90, 0.833)',
            }}
            id='demo-simple-select-autowidth-label'
          >
            Выберите товар
          </InputLabel>
          <Select
            labelId='demo-simple-select-autowidth-label'
            id='demo-simple-select-autowidth'
            name='category_id'
            autoWidth
            label='category'
          >
            {allItems.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                <SearchItemCard key={item.id} item={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}
