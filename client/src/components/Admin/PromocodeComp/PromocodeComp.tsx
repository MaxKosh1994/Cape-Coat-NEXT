import React, { useState, useEffect } from 'react';
import styles from './PromocodeComp.module.css';
import IPromo from './types';
import { createPromo, deletePromo, getAllPromo, updatePromo } from './api';

export default function PromocodeComp() {
  const [promoArr, setPromoArr] = useState<IPromo[]>([]); // state для всех промокодов
  const [code, setCode] = useState(''); // state для инпута code
  const [percent, setPercent] = useState(''); // state для инпута percent
  const [editingPromo, setEditingPromo] = useState<IPromo | null>(null);
  const [editingCode, setEditingCode] = useState(''); // state для инпута code в форме редактирования
  const [editingPercent, setEditingPercent] = useState(''); // state для инпута percent в форме редактирования

  //! Получение всех промокодов

  useEffect(() => {
    (async function fetchData() {
      const result = await getAllPromo();
      setPromoArr(result.allPromocodes);
    })();
  }, []);

  //! Создание нового промокода

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const result = await createPromo(code, Number(percent));
      setPromoArr((prev) => [...prev, result.newPromo]);
      setCode('');
      setPercent('');
    } catch (error) {
      console.error(error);
    }
  };

  //! Удаление промокода

  const handleDelete = async (id) => {
    try {
      await deletePromo(id);
      const result = await getAllPromo();
      setPromoArr(result.allPromocodes);
    } catch (error) {
      console.error(error);
    }
  };

  //! Редактирование промокода

  const handleEdit = (promo) => {
    setEditingPromo(promo);
    setEditingCode(promo.code);
    setEditingPercent(promo.percent.toString());
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedPromo = await updatePromo(
        editingPromo!.id,
        editingCode,
        Number(editingPercent)
      );
      setPromoArr(
        promoArr.map((promo) =>
          promo.id === editingPromo!.id ? updatedPromo : promo
        )
      );
      setEditingPromo(null);
      setEditingCode('');
      setEditingPercent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={handleCreate}>
        <input
          type='text'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='Code'
        />
        <input
          type='number'
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          placeholder='Discount percent'
        />
        <button type='submit'>Create</button>
      </form>
      {promoArr?.map((promo) => (
        <div className={styles.promoContainer} key={promo.id}>
          <div className={styles.leftInfoContainer}>
            <p className={styles.infoP}>Текст промокода:</p>
            <p className={styles.infoP}>Размер скидки(%):</p>
            <p className={styles.infoP}>Дата создания:</p>
          </div>
          <div className={styles.rightInfoContainer}>
            <p className={styles.infoMainP}>{promo.code}</p>
            <p className={styles.infoMainP}>{promo.percent}</p>
            <p className={styles.infoMainP}>
              {new Date(promo.createdAt).toLocaleDateString()}
            </p>
          </div>

          {editingPromo !== null && editingPromo.id === promo.id ? (
            <form onSubmit={handleUpdate}>
              <input
                type='text'
                value={editingCode}
                onChange={(e) => setEditingCode(e.target.value)}
                placeholder='Code'
              />
              <input
                type='number'
                value={editingPercent}
                onChange={(e) => setEditingPercent(e.target.value)}
                placeholder='Discount percent'
              />
              <button type='submit'>Save</button>
              <button type='button' onClick={() => setEditingPromo(null)}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              <button onClick={() => handleEdit(promo)}>Edit</button>
            </>
          )}

          <button onClick={() => handleDelete(promo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
