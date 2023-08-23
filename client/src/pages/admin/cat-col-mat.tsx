import styles from '../../styles/admin/CatAndCol.module.css';

import {
  formDataCollectionAxios,
  formDataCategoryAxios,
} from '../../components/Admin/HTTP/adminApi';

import FormCatAndCol from '../../components/Admin/FormCatAndCol';
import NavAdminComp from '@/components/navAdminComp/NavAdminComp';

export default function CatAndCol() {
  return (
    <>
      <NavAdminComp />
      <div className={styles.catColWrapper}>
        <FormCatAndCol
          formDataAxios={formDataCategoryAxios}
          h2={'Добавить категорию'}
          h5={'Название категории'}
          foto={'Фото обложки коллекции'}
          fileInput={'fileColInput'}
          placeholder={'Category'}
        />
        <FormCatAndCol
          formDataAxios={formDataCollectionAxios}
          h2={'Добавить коллекцию'}
          h5={'Название коллекции'}
          foto={'Фото обложки категории'}
          fileInput={'fileCatInput'}
          placeholder={'Collection'}
        />
      </div>
    </>
  );
}
