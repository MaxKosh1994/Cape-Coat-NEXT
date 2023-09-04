import Modal from '@mui/material/Modal';
import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import { dataAxios } from '../../HTTP/adminApi';
import styles from './ItemModal.module.css';

import InfoModal from '../../InfoModal';
import ItemInputs from '../../ItemInputs';
import CustomFormControl from '../../CustomFormControl';
import InputFiles from '../../InputFiles';
import CheckBox from '../../checkbox';
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
}) {
  console.log(id);
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

  useEffect(() => {
    dataAxios(setCategory, setMessage, addressCat);
    dataAxios(setCollection, setMessage, addressCol);
    dataAxios(setMaterial, setMessage, addressMat);
  }, []);

  const changeHandlerFiles = (e) => {
    setFile({ ...files, photos: e.target.files });
  };

  const changeHandlerDescription = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };

  const changeHandlerDescript = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.checked });
  };

  const handleCategoryChange = (e) => {
    setNameCat(e.target.value);
  };
  const handleCollectionChange = (e) => {
    setNameCol(e.target.value);
  };

  const handleMaterialChange = (e) => {
    setNameMat(e.target.value);
  };

  const submit = async (e, url) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (
        url === `create-${address}` ||
        (url === `update-${address}` && files)
      ) {
        for (let key in files.photos) {
          formData.append('photos', files.photos[key]);
        }
      }
      formData.append('description', JSON.stringify(description));
      const val = await Object.fromEntries(formData.entries());
      await dataAxios(setContent, setMessage, address, formData, url, id);
      setOpen(true);
      setTimeout(() => {
        setMessage('');
        setOpen(false);
      }, 1000);
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
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className={styles.mainContainer}>
          <form
            ref={formRef}
            onSubmit={submit}
            encType='multipart/form-data'
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
                changeHandlerDescription={changeHandlerDescription}
              />
              <CustomFormControl
                styleSize={'200'}
                infoText={'Выберите категорию'}
                arr={category}
                valueState={nameCat}
                name={'category_id'}
                label={'category'}
                handleChange={handleCategoryChange}
                changeHandlerDescription={changeHandlerDescription}
              />
              <CustomFormControl
                infoText={'Выберите материал'}
                arr={material}
                valueState={nameMat}
                name={'material_id'}
                label={'material'}
                handleChange={handleMaterialChange}
                changeHandlerDescription={changeHandlerDescription}
              />
            </div>
            <Box className={styles.inputBox}>
              <ItemInputs changeHandler={changeHandlerDescription} />
            </Box>

            <div className={styles.checkBoxContainer}>
              <div className={styles.checkBoxMiniContainer}>
                <CheckBox
                  changeHandler={changeHandlerDescript}
                  name={'bestseller'}
                  placeholder={'bestseller'}
                  label={' bestseller'}
                />
                <CheckBox
                  changeHandler={changeHandlerDescript}
                  name={'in_stock'}
                  placeholder={'in_stock'}
                  label={' В наличии'}
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