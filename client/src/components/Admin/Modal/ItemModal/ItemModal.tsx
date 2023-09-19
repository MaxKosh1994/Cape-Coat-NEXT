import Modal from '@mui/material/Modal';
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import * as React from 'react';
import { dataAxios } from '../../HTTP/adminApi';
import styles from './ItemModal.module.css';

import InfoModal from '../../InfoModal';
import ItemInputs from '../../ItemInputs';
import CustomFormControl from '../../CustomFormControl';
import InputFiles from '../../InputFiles';
import CheckBox from '../../CheckBox';
import CustomButton from '../../CustomButton';

import Box from '@mui/material/Box';

export default function ItemModal({
  openChange,
  setOpenChange,
  id,
  setContent,
  open,
  setOpen,
  message,
  setMessage,
  itemData,
}: {
  openChange: boolean;
  setOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | undefined;
  setContent: React.Dispatch<React.SetStateAction<[]>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  // TODO типизация - any заглушка
  itemData: any;
}) {
  const formRef = useRef(null);
  const [files, setFile] = useState({});
  const [description, setDescription] = useState({
    category_id: 1,
    collection_id: 1,
    material_id: 1,
    in_stock: false,
    bestseller: false,
  });

  const [category, setCategory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [material, setMaterial] = useState([]);
  const [nameCat, setNameCat] = useState('');
  const [nameCol, setNameCol] = useState('');
  const [nameMat, setNameMat] = useState('');
  const address = 'item';
  const addressCat = 'category';
  const addressCol = 'collection';
  const addressMat = 'material';
  const [formData, setFormData] = useState({
    name: '',
    article: '',
    description: '',
    model_params: '',
    characteristics: '',
    price: '',
    new_price: '',
    in_stock: false,
    purchased: false,
    bestseller: false,
    collection_id: 1,
    material_id: 1,
    category_id: 1,
  });
  const [isInStock, setIsInStock] = useState(false);
  const resetFormData = () => {
    setFormData({
      name: '',
      article: '',
      description: '',
      model_params: '',
      characteristics: '',
      price: '',
      new_price: '',
      in_stock: false,
      purchased: false,
      bestseller: false,
      collection_id: 1,
      material_id: 1,
      category_id: 1,
    });
    setNameCat('');
    setNameCol('');
    setNameMat('');
  };
  useEffect(() => {
    if (itemData !== null) {
      setFormData({
        name: itemData.name || '',
        article: itemData.article || '',
        description: itemData.description || '',
        model_params: itemData.model_params || '',
        characteristics: itemData.characteristics || '',
        price: itemData.price || '',
        new_price: itemData.new_price || '',
        in_stock: itemData.in_stock || false,
        purchased: itemData.purchased || false,
        bestseller: itemData.bestseller || false,
        collection_id: itemData.collection_id || 1,
        material_id: itemData.material_id || 1,
        category_id: itemData.category_id || 1,
      });
      setNameCat(itemData.category_id || 1);
      setNameCol(itemData.collection_id || 1);
      setNameMat(itemData.material_id || 1);
    }
  }, [itemData]);

  useEffect(() => {
    dataAxios(setCategory, setMessage, addressCat);
    dataAxios(setCollection, setMessage, addressCol);
    dataAxios(setMaterial, setMessage, addressMat);
  }, []);
  useEffect(() => {
    if (!openChange) {
      resetFormData();
    }
  }, [openChange]);

  const changeHandlerFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setFile({ ...files, photos: e.target.files });
  };

  // TODO типизация - any заглушка
  const changeHandler = (props: any) => {
    const { name, value } = props.target;

    setDescription({ ...description, [name]: value });
    setFormData({ ...formData, [name]: value });
  };
  const changeCheckboxHandler = (name: string, value: string) => {
    setDescription({ ...description, [name]: value });
    setFormData({ ...formData, [name]: value });

    if (name === 'in_stock') {
      setIsInStock(Boolean(value));
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameCat(e.target.value);
  };
  const handleCollectionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameCol(e.target.value);
  };

  const handleMaterialChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameMat(e.target.value);
  };

  const submit = async (e: FormEvent<HTMLFormElement>, url: string) => {
    try {
      e.preventDefault();

      if (formData.in_stock && !formData.new_price) {
        setMessage('Заполните поле с новой ценой');
        setOpen(true);
        setTimeout(() => {
          setMessage('');
          setOpen(false);
        }, 1000);
        return;
      }

      const formDataToSend = new FormData();

      if (
        url === `create-${address}` ||
        (url === `update-${address}` && files)
      ) {
        // TODO ошибка типизации
        for (let key in files.photos) {
          formDataToSend.append('photos', files.photos[key]);
        }
      }

      formDataToSend.append('description', JSON.stringify(description));

      // TODO ошибка типизации
      await dataAxios(setContent, setMessage, address, formDataToSend, url, id);
      setOpen(true);
      setTimeout(() => {
        setMessage('');
        setOpen(false);
      }, 1000);
      // TODO ошибка типизации
      formRef.current.reset();
      setOpenChange(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        className={styles.modal}
        open={openChange}
        onClose={() => setOpenChange(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.mainContainer}>
          <form
            ref={formRef}
            // TODO ошибка типизации
            onSubmit={submit}
            encType="multipart/form-data"
            className={styles.formContainer}
          >
            <div className={styles.selectContainer}>
              <CustomFormControl
                styleSize={'200'}
                infoText={'Выберите коллекцию'}
                arr={collection}
                valueState={nameCol}
                name={'collection_id'}
                label={'collection'}
                handleChange={handleCollectionChange}
                changeHandlerDescription={changeHandler}
              />
              <CustomFormControl
                styleSize={'200'}
                infoText={'Выберите категорию'}
                arr={category}
                valueState={nameCat}
                name={'category_id'}
                label={'category'}
                handleChange={handleCategoryChange}
                changeHandlerDescription={changeHandler}
              />
              <CustomFormControl
                infoText={'Выберите материал'}
                arr={material}
                valueState={nameMat}
                name={'material_id'}
                label={'material'}
                handleChange={handleMaterialChange}
                changeHandlerDescription={changeHandler}
                required={isInStock}
              />
            </div>
            <Box className={styles.inputBox}>
              <ItemInputs changeHandler={changeHandler} formData={formData} />
            </Box>

            <div className={styles.checkBoxContainer}>
              <div className={styles.checkBoxMiniContainer}>
                <CheckBox
                  changeCheckboxHandler={changeCheckboxHandler}
                  name={'bestseller'}
                  placeholder={'bestseller'}
                  label={' bestseller'}
                  checked={formData.bestseller}
                />
                <CheckBox
                  changeCheckboxHandler={changeCheckboxHandler}
                  name={'in_stock'}
                  placeholder={'in_stock'}
                  label={' В наличии'}
                  checked={formData.in_stock}
                />
              </div>
              <InputFiles
                file={files}
                changeHandlerFiles={changeHandlerFiles}
                shouldAllowMultiple={true}
              />
              {id === undefined ? (
                <>
                  <CustomButton
                    label={'Добавить'}
                    submit={submit}
                    url={'create-item'}
                  />
                </>
              ) : (
                <>
                  <CustomButton
                    label={'Изменить'}
                    submit={submit}
                    url={'update-item'}
                  />
                  <CustomButton
                    label={'Удалить'}
                    submit={submit}
                    url={'delete-item'}
                  />
                </>
              )}
            </div>
          </form>
          <InfoModal info={message} open={open} setOpen={setOpen} />
        </div>
      </Modal>
    </>
  );
}
