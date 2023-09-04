import Modal from '@mui/material/Modal';
import { useState, useEffect, useRef } from 'react';
import { dataAxios } from '../../HTTP/adminApi';
import styles from './CatModal.module.css';
import AdminInput from '../../AdminInput';
import InputFiles from '../../InputFiles';
import CustomButton from '../../CustomButton';
import InfoModal from '../../InfoModal';
import CustomFormControl from '../../CustomFormControl';

export default function CatModal({
  openChange,
  setOpenChange,
  open,
  setOpen,
  message,
  setMessage,
}) {
  const formRef = useRef(null);
  const [files, setFile] = useState();
  const [description, setDescription] = useState({});
  const [conten, setConten] = useState([]);
  const [name, setName] = useState('');
  const address = 'category';
  const id = description.category_id;

  useEffect(() => {
    dataAxios(setConten, setMessage, address);
  }, []);

  const changeHandlerFiles = (e) => {
    setFile({ ...files, photos: e.target.files });
  };

  const changeHandlerDescription = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    setName(e.target.value);
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
      await dataAxios(setConten, setMessage, address, formData, url, id);
      setOpen(true);
      setTimeout(() => {
        setMessage('');
        setOpen(false);
      }, 1000);
      setOpenChange(false);
      formRef.current.reset();
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
          <div className={styles.headerDiv}>
            <h2>Категория</h2>
          </div>
          <form
            ref={formRef}
            onSubmit={submit}
            encType='multipart/form-data'
            className={styles.formContainer}
          >
            <div className={styles.selectContainer}>
              <CustomFormControl
                styleSize={'200'}
                infoText={'Выберите категорию'}
                arr={conten}
                valueState={name}
                name={'category_id'}
                label={'category'}
                handleChange={handleChange}
                changeHandlerDescription={changeHandlerDescription}
              />
            </div>

            <div className={styles.inputContainer}>
              <AdminInput
                changeHandler={changeHandlerDescription}
                name={'name'}
                label={'Название'}
                types={'text'}
              />
              <AdminInput
                changeHandler={changeHandlerDescription}
                name={'urlName'}
                label={'Английское название'}
                types={'text'}
              />
            </div>

            <div className={styles.inputContainer}>
              <InputFiles
                text={'Фото категории'}
                file={files}
                changeHandlerFiles={changeHandlerFiles}
                shouldAllowMultiple={false}
              />
            </div>

            <div className={styles.buttonContainer}>
              <CustomButton
                label={'Добавить'}
                submit={submit}
                url={'create-category'}
              />
              <CustomButton
                label={'Изменить'}
                submit={submit}
                url={'update-category'}
              />
              <CustomButton
                label={'Удалить'}
                submit={submit}
                url={'delete-category'}
              />
            </div>
          </form>
          <div />
          <InfoModal info={message} open={open} setOpen={setOpen} />
        </div>
      </Modal>
    </>
  );
}