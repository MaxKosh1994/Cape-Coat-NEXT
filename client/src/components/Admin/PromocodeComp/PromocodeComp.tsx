import React, { useState, useEffect, FormEvent } from 'react';
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

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code || !percent) {
      console.error('Code and percent are required');
      return;
    }

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

  const handleDelete = async (id: number) => {
    try {
      await deletePromo(id);
      const result = await getAllPromo();
      setPromoArr(result.allPromocodes);
    } catch (error) {
      console.error(error);
    }
  };

  //! Редактирование промокода

  const handleEdit = (promo: IPromo) => {
    setEditingPromo(promo);
    setEditingCode(promo.code);
    setEditingPercent(promo.percent.toString());
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
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
      <form className={styles.form} onSubmit={handleCreate}>
        <input
          className={styles.input}
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code"
        />
        <input
          className={styles.input}
          type="number"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          placeholder="Discount percent"
        />
        <button className={styles.button} type="submit">
          СОЗДАТЬ
        </button>
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
            <form className={styles.formEdit} onSubmit={handleUpdate}>
              <input
                className={styles.inputEditForm}
                type="text"
                value={editingCode}
                onChange={(e) => setEditingCode(e.target.value)}
                placeholder="Code"
              />
              <input
                type="number"
                value={editingPercent}
                onChange={(e) => setEditingPercent(e.target.value)}
                placeholder="Discount percent"
              />
              <div className={styles.buttonEditContainer}>
                <button className={styles.buttonSave} type="submit">
                  SAVE
                </button>
                <button
                  className={styles.buttonCancel}
                  type="button"
                  onClick={() => setEditingPromo(null)}
                >
                  CLOSE
                </button>
              </div>
              <button
                className={styles.buttonDel}
                onClick={() => handleDelete(promo.id)}
              >
                DELETE
              </button>
            </form>
          ) : (
            <div className={styles.buttonContainer}>
              <button
                className={styles.buttonEdit}
                onClick={() => handleEdit(promo)}
              >
                ИЗМЕНИТЬ
              </button>
              <button
                className={styles.buttonDel}
                onClick={() => handleDelete(promo.id)}
              >
                DELETE
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
