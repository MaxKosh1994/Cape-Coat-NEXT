import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import * as React from "react";
import {
  formDataIteamAxios,
  categoryDataFetch,
  collectionDataFetch,
} from "../HTTP/adminApi";

import InfoModal from "../InfoModal";
import ItemInputs from "../ItemInputs";
import CustomFormControl from "../CustomFormControl";
import InputFiles from "../InputFiles";
import CheckBox from "../checkbox";
import CustomButton from "../CustomButton";

import Box from "@mui/material/Box";

export default function ItemModal({ openChange, setOpenChange }) {
  const [files, setFile] = useState({});
  const [category, setCategory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [message, setMessage] = useState("");
  const [nameCat, setNameCat] = useState("");
  const [nameCol, setNameCol] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  const [descript, setDescription] = useState({
    category_id: "1",
    collection_id: "1",
    in_stock: false,
  });

  useEffect(() => {
    categoryDataFetch(setCategory, setMessage);
    collectionDataFetch(setCollection, setMessage);
  }, []);

  const changeHandlerFiles = (e) => {
    setFile({ ...files, photos: e.target.files });
  };

  const changeHandlerDescription = (e) => {
    setDescription({ ...descript, [e.target.name]: e.target.value });
  };

  const changeHandlerDescript = (e) => {
    setDescription({ ...descript, [e.target.name]: e.target.checked });
  };

  const handleCategoryChange = (event) => {
    setNameCat(event.target.value);
  };
  const handleCollectionChange = (event) => {
    setNameCol(event.target.value);
  };

  const submit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      for (let key in files.photos) {
        formData.append("photos", files.photos[key]);
      }
      formData.append("description", JSON.stringify(descript));
      const response = formDataIteamAxios(formData, setMessage);
      setOpen(true);
      setTimeout(() => {
        setMessage("");
        setOpen(false);
      }, 1000);
      e.target.reset();
      setNameCat("");
      setNameCol("");
      setDescription({
        category_id: "1",
        collection_id: "1",
        in_stock: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Modal
        sx={{ width: "750px", margin: "0 auto" }}
        open={openChange}
        onClose={() => setOpenChange(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            backgroundColor: "white",
            marginTop: "0px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form
              onSubmit={submit}
              encType="multipart/form-data"
              style={{ marginTop: "10px" }}
            >
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <CustomFormControl
                  styleSize={"200"}
                  infoText={"Выберите коллекцию"}
                  arr={collection}
                  valueState={nameCol}
                  name={"collection_id"}
                  label={"collection"}
                  handleChange={handleCollectionChange}
                  changeHandlerDescription={changeHandlerDescription}
                />
                <CustomFormControl
                  styleSize={"200"}
                  infoText={"Выберите категорию"}
                  arr={category}
                  valueState={nameCat}
                  name={"category_id"}
                  label={"category"}
                  handleChange={handleCategoryChange}
                  changeHandlerDescription={changeHandlerDescription}
                />
                <CustomFormControl
                  infoText={"Выберите материал"}
                  arr={category}
                  valueState={nameCat}
                  name={"category_id"}
                  label={"category"}
                  handleChange={handleCategoryChange}
                  changeHandlerDescription={changeHandlerDescription}
                />
              </div>
              <Box sx={{ width: 550, maxWidth: "100%" }}>
                <ItemInputs changeHandler={changeHandlerDescription} />
              </Box>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <CheckBox
                  changeHandler={changeHandlerDescript}
                  name={"bestseller"}
                  placeholder={"bestseller"}
                  label={" bestseller"}
                />
                <CheckBox
                  changeHandler={changeHandlerDescript}
                  name={"in_stock"}
                  placeholder={"in_stock"}
                  label={" В наличии"}
                />
                <InputFiles
                  file={files}
                  changeHandlerFiles={changeHandlerFiles}
                  shouldAllowMultiple={true}
                />
                <CustomButton label={"Сохранить"} />
              </div>
            </form>
          </div>
          <InfoModal info={message} open={open} setOpen={setOpen} />
        </div>
      </Modal>
    </>
  );
}
