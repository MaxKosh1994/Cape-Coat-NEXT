import Modal from "@mui/material/Modal";
import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { dataAxios } from "../HTTP/adminApi";

import InfoModal from "../InfoModal";
import ItemInputs from "../ItemInputs";
import CustomFormControl from "../CustomFormControl";
import InputFiles from "../InputFiles";
import CheckBox from "../checkbox";
import CustomButton from "../CustomButton";

import Box from "@mui/material/Box";

export default function ItemModal({ openChange, setOpenChange, id }) {
  const formRef = useRef(null);
  const [files, setFile] = useState({});
  const [description, setDescription] = useState({
    category_id: "1",
    collection_id: "1",
    material_id: "1",
    in_stock: false,
    bestseller: false,
  });
  const [conten, setConten] = useState([]);
  const [category, setCategory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [material, setMaterial] = useState([]);
  const [nameCat, setNameCat] = useState("");
  const [nameCol, setNameCol] = useState("");
  const [nameMat, setNameMat] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const address = "item";
  const addressCat = "category";
  const addressCol = "collection";

  useEffect(() => {
    dataAxios(setCategory, setMessage, addressCat);
    dataAxios(setCollection, setMessage, addressCol);
    dataAxios(setMaterial, setMessage, addressCol);
    dataAxios(setConten, setMessage, address);
  }, []);

  const changeHandlerFiles = (e) => {
    setFile({ ...files, photos: e.target.files });
  };

  const changeHandlerDescription = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };

  const changeHandlerDescript = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.checked });
  };

  const handleCategoryChange = (e) => {
    setNameCat(e.target.value);
  };
  const handleCollectionChange = (e) => {
    setNameCol(e.target.value);
  };

  const handleMaterialChange = (e) => {
    setNameMat(e.target.value);
  };

  const submit = async (e, url) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (url === `add${address}` || url === `edit${address}`) {
        for (let key in files.photos) {
          formData.append("photos", files.photos[key]);
        }
      }
      formData.append("description", JSON.stringify(description));
      const val = await Object.fromEntries(formData.entries());
      await dataAxios(setConten, setMessage, address, formData, url, id);
      setOpen(true);
      setTimeout(() => {
        setMessage("");
        setOpen(false);
      }, 1000);
      formRef.current.reset();
      setNameCat("");
      setNameCol("");
      setDescription({
        category_id: "1",
        collection_id: "1",
        material_id: "1",
        in_stock: false,
        bestseller: false,
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
              ref={formRef}
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
                  arr={material}
                  valueState={nameMat}
                  name={"material_id"}
                  label={"material"}
                  handleChange={handleMaterialChange}
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
                <CustomButton
                  label={"Добавить"}
                  submit={submit}
                  url={"additem"}
                />
                <CustomButton
                  label={"Изменить"}
                  submit={submit}
                  url={"edititem"}
                />
                <CustomButton
                  label={"Удалить"}
                  submit={submit}
                  url={"delitem"}
                />
              </div>
            </form>
          </div>
          <InfoModal info={message} open={open} setOpen={setOpen} />
        </div>
      </Modal>
    </>
  );
}
