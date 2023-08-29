import { useState, useEffect } from "react";
import * as React from "react";

import NavAdminComp from "@/components/navAdminComp/NavAdminComp";
import ItemModal from "../../components/Admin/Modal/ItemModal";
import CatModal from "../../components/Admin/Modal/CatModal";
import ColModal from "../../components/Admin/Modal/ColModal";

import { Button } from "@mui/material";

export default function Iteam() {
  const [openItem, setOpenItem] = useState<boolean>(false);
  const [openCat, setOpenCat] = useState<boolean>(false);
  const [openCol, setOpenCol] = useState<boolean>(false);

  const handleOpenItem = () => setOpenItem(true);
  const handleOpenCat = () => setOpenCat(true);
  const handleOpenCol = () => setOpenCol(true);

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

      <ItemModal openChange={openItem} setOpenChange={setOpenItem} />
      <CatModal openChange={openCat} setOpenChange={setOpenCat} />
      <ColModal openChange={openCol} setOpenChange={setOpenCol} />
    </>
  );
}
