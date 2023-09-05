import Modal from '@mui/material/Modal';
import { useState, useEffect, useRef } from 'react';
import CustomFormControl from '../../CustomFormControl';
import { dataAxios } from '../../HTTP/adminApi';
// import styles from '../../../../styles/admin/CatCol.module.css';
import InfoModal from '../../InfoModal';
import CustomButton from '../../CustomButton';
import InputFiles from '../../InputFiles';
import AdminInput from '../../AdminInput';
import styles from './MatModal.module.css';

export default function MatModal({
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
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState([]);
  const [name, setName] = useState('');
  const [nameCat, setNameCat] = useState('');
  const address = 'material';
  const addressCat = 'category';
  const id = description.material_id;

  useEffect(() => {
    dataAxios(setCategory, setMessage, addressCat);
    dataAxios(setContent, setMessage, address);
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

  const handleCategoryChange = (e) => {
    setNameCat(e.target.value);
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
            <h2>Материал</h2>
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
                arr={category}
                valueState={nameCat}
                name={'category_id'}
                label={'category'}
                handleChange={handleCategoryChange}
                changeHandlerDescription={changeHandlerDescription}
              />
              <CustomFormControl
                styleSize={'200'}
                infoText={'Выберите материал'}
                arr={content}
                valueState={name}
                name={'material_id'}
                label={'material'}
                handleChange={handleChange}
                changeHandlerDescription={changeHandlerDescription}
              />
            </div>

            <div className={styles.inputContainer}>
              <AdminInput
                changeHandler={changeHandlerDescription}
                name={'name'}
                label={'Имя'}
                types={'text'}
              />
            </div>

            <div className={styles.inputContainer}>
              <InputFiles
                text={'Фото материала'}
                file={files}
                changeHandlerFiles={changeHandlerFiles}
                shouldAllowMultiple={false}
              />
            </div>

            <div className={styles.buttonContainer}>
              <CustomButton
                label={'Добавить'}
                submit={submit}
                url={'create-material'}
              />
              <CustomButton
                label={'Изменить'}
                submit={submit}
                url={'update-material'}
              />
              <CustomButton
                label={'Удалить'}
                submit={submit}
                url={'delete-material'}
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
