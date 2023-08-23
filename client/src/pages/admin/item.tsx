import { useState, useEffect } from "react";
import * as React from "react";

import NavAdminComp from "@/components/navAdminComp/NavAdminComp";
import ItemModal from "../../components/Admin/ItemModal";
import { Button } from "@mui/material";

export default function Iteam() {
  const [openChange, setOpenChange] = useState<boolean>(false);
  const handleOpen = () => setOpenChange(true);
  return (
    <>
      <NavAdminComp />
      <Button onClick={handleOpen} type="button">
        Добавить
      </Button>
      <ItemModal openChange={openChange} setOpenChange={setOpenChange} />
    </>
  );
}
