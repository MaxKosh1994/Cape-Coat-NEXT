import { useState, useEffect } from 'react';
import * as React from 'react';
import styles from '../../styles/admin/Content.module.css';

import NavAdminComp from '@/components/navAdminComp/NavAdminComp';
import ItemModal from '../../components/Admin/Modal/ItemModal/ItemModal';
import CatModal from '../../components/Admin/Modal/CatModal/CatModal';
import ColModal from '../../components/Admin/Modal/ColModal/ColModal';
import MatModal from '../../components/Admin/Modal/MatModal/MatModal';
import ItemTable from '../../components/Admin/ItemTable/ItemTable';
import InfoModal from '../../components/Admin/InfoModal';
import { dataAxios } from '../../components/Admin/HTTP/adminApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useRouter } from 'next/router';

import { Button } from '@mui/material';

export default function AddContent() {
  const [openCat, setOpenCat] = useState<boolean>(false);
  const [openCol, setOpenCol] = useState<boolean>(false);
  const [openMat, setOpenMat] = useState<boolean>(false);
  const [openItem, setOpenItem] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  let [id, setId] = useState();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    if (!openItem) {
      setId(undefined);
    }
  }, [openItem]);

  const handleOpenItem = (data) => {
    setOpenItem(true);
    setItemData(data);
  };
  const handleOpenCat = () => setOpenCat(true);
  const handleOpenCol = () => setOpenCol(true);
  const handleOpenMat = () => setOpenMat(true);

  const [content, setContent] = useState([]);
  const address = 'item';
  useEffect(() => {
    dataAxios(setContent, setMessage, address);
  }, []);

  const isAdmin = useSelector((state: RootState) => state.sessionSlice.isAdmin);

  const router = useRouter();

  return (
    <>
      {isAdmin && (
        <>
          <NavAdminComp />
          <div className={styles.routesDiv}>
            <Button
              className={styles.button}
              onClick={() => handleOpenItem(null)}
              type="button"
            >
              Добавить товар
            </Button>
            <Button
              className={styles.button}
              onClick={handleOpenCat}
              type="button"
            >
              Добавить категорию
            </Button>
            <Button
              className={styles.button}
              onClick={handleOpenCol}
              type="button"
            >
              Добавить коллекцию
            </Button>
            <Button
              className={styles.button}
              onClick={handleOpenMat}
              type="button"
            >
              Добавить материал
            </Button>
          </div>
          <ItemTable
            content={content}
            setContent={setContent}
            message={message}
            setMessage={setMessage}
            handleOpenItem={handleOpenItem}
            setId={setId}
          />
          <ItemModal
            openChange={openItem}
            setOpenChange={setOpenItem}
            id={id}
            setContent={setContent}
            open={open}
            setOpen={setOpen}
            message={message}
            setMessage={setMessage}
            itemData={itemData}
          />
          <MatModal
            openChange={openMat}
            setOpenChange={setOpenMat}
            open={open}
            setOpen={setOpen}
            message={message}
            setMessage={setMessage}
          />
          <CatModal
            openChange={openCat}
            setOpenChange={setOpenCat}
            open={open}
            setOpen={setOpen}
            message={message}
            setMessage={setMessage}
          />
          <ColModal
            openChange={openCol}
            setOpenChange={setOpenCol}
            open={open}
            setOpen={setOpen}
            message={message}
            setMessage={setMessage}
          />
          <InfoModal info={message} open={open} setOpen={setOpen} />
        </>
      )}
    </>
  );
}
