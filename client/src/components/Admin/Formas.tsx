import { useState, useEffect } from "react";

import styles from "../../styles/admin/CatCol.module.css";
import { Button, TextField } from "@mui/material";
import InfoModal from "./InfoModal";

export default function Category(props) {
  const [files, setFile] = useState();
  const [descript, setDescription] = useState({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const changeHandlerFiles = (e) => {
    setFile({ ...files, photos: e.target.files });
  };

  const changeHandlerDescription = (e) => {
    setDescription({ ...descript, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      for (let key in files.photos) {
        formData.append("photos", files.photos[key]);
      }
      formData.append("description", JSON.stringify(descript));
      const val = await Object.fromEntries(formData.entries());
      const response = await props.formDataCategoryAxios(formData, setMessage);
      setOpen(true);
      setTimeout(() => {
        setMessage("");
        setOpen(false);
      }, 1000);
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return <> </>;
}
