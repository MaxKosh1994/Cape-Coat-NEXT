import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import styles from '../../styles/admin/CatCol.module.css';
import { Button, TextField } from '@mui/material';
import InfoModal from './InfoModal';

// TODO типизация пропсов, any заглушка
export default function Category(props: any) {
  const [files, setFile] = useState();
  const [descript, setDescription] = useState({});
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const changeHandlerFiles = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO типизация
    setFile({ ...files, photos: e.target.files });
  };
  const changeHandlerDescription = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO типизация
    setDescription({ ...descript, [e.target.name]: e.target.value });
  };
  // TODO типизация нужна
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      // TODO типизация нужна
      for (let key in files.photos) {
        formData.append('photos', files.photos[key]);
      }
      formData.append('description', JSON.stringify(descript));
      const val = await Object.fromEntries(formData.entries());
      const response = await props.formDataCategoryAxios(formData, setMessage);
      setOpen(true);
      setTimeout(() => {
        setMessage('');
        setOpen(false);
      }, 1000);
      // TODO ошибка типизации
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles.headerDiv}>
          <h2>{props.h2}</h2>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            {/* // TODO проблема типизации 
            */}
            <form
              onSubmit={submit}
              enctype="multipart/form-data"
            >
              <div className={styles.liContainer}>
                <h5 className={styles.headerFive}>{props.h5}</h5>
                <div className={styles.pContainer}>
                  <TextField
                    autoComplete="off"
                    required
                    placeholder="Category"
                    onChange={changeHandlerDescription}
                    name="name"
                    type="text"
                    className={styles.pFive}
                  />
                </div>
              </div>
              <div className={styles.liContainer}>
                <h5 className={styles.headerFive}>{props.foto}</h5>
                <label htmlFor="fileColInput" className={styles.customButton}>
                  Выберите файл
                </label>
                <input
                  required
                  id={props.fileInput}
                  // TODO проблема типизации
                  filename={files}
                  onChange={changeHandlerFiles}
                  type="file"
                  accept="image/*"
                  className={styles.inputFile}
                />
              </div>
              <div className={styles.containerButton}>
                <Button
                  className={styles.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                >
                  Добавить
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <InfoModal info={message} open={open} setOpen={setOpen} />
    </>
  );
}
