import { useState, useEffect } from "react";
import * as React from "react";

import NavAdminComp from "@/components/navAdminComp/NavAdminComp";
import ItemModal from "../../components/Admin/Modal/ItemModal";
import CatModal from "../../components/Admin/Modal/CatModal";
import ColModal from "../../components/Admin/Modal/ColModal";
import MatModal from "../../components/Admin/Modal/MatModal";
import ItemTable from "../../components/Admin/ItemTable";
import InfoModal from "../../components/Admin/InfoModal";
import { dataAxios } from "../../components/Admin/HTTP/adminApi";

import { Button } from "@mui/material";

export default function Iteam() {
  const [openCat, setOpenCat] = useState<boolean>(false);
  const [openCol, setOpenCol] = useState<boolean>(false);
  const [openMat, setOpenMat] = useState<boolean>(false);
  const [openItem, setOpenItem] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  let [id, setId] = useState();
  useEffect(() => {
    if (!openItem) {
      setId(undefined);
    }
  }, [openItem]);

  const handleOpenItem = () => setOpenItem(true);
  const handleOpenCat = () => setOpenCat(true);
  const handleOpenCol = () => setOpenCol(true);
  const handleOpenMat = () => setOpenMat(true);

  const [content, setContent] = useState([]);
  const address = "item";
  useEffect(() => {
    dataAxios(setContent, setMessage, address);
  }, []);

  return (
    <>
      <NavAdminComp />
      <Button onClick={handleOpenItem} type="button">
        Добавить товар
      </Button>
      <Button onClick={handleOpenCat} type="button">
        Добавить категорию
      </Button>
      <Button onClick={handleOpenCol} type="button">
        Добавить коллекцию
      </Button>
      <Button onClick={handleOpenMat} type="button">
        Добавить материал
      </Button>
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
  );
}
