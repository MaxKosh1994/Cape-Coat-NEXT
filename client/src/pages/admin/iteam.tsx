import { useState, useEffect } from "react";
import * as React from "react";
import {
  formDataIteamAxios,
  categoryDataFetch,
  collectionDataFetch,
} from "../../components/Admin/HTTP/adminApi";
import InfoModal from "../../components/Admin/InfoModal";
import ItemInput from "../../components/Admin/ItemInput";

import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function Iteam() {
  const [files, setFile] = useState({});
  const [category, setCategory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [message, setMessage] = useState("");
  const [nameCat, setNameCat] = useState("");
  const [nameCol, setNameCol] = useState("");
  const [open, setOpen] = useState(false);
  const [descript, setDescription] = useState({
    category_id: "1",
    collection_id: "1",
    in_stock: false,
  });
  useEffect(() => {
    categoryDataFetch(setCategory, setMessage);
  }, []);
  useEffect(() => {
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
      <div
        style={{
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
            style={{ marginTop: "10px" }}
            encType="multipart/form-data"
          >
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel
                  style={{
                    fontWeight: "700",
                    color: "rgba(90, 90, 90, 0.833)",
                  }}
                  id="demo-simple-select-autowidth-label"
                >
                  Выберите категорию
                </InputLabel>
                <Select
                  onChange={(e) => {
                    handleCategoryChange(e); // Сначала обновляем состояние nameCat
                    changeHandlerDescription(e); // Затем обновляем состояние descript
                  }}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={nameCat}
                  name="category_id"
                  autoWidth
                  label="category"
                >
                  {category.map((el) => (
                    <MenuItem value={el.id} key={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel
                  style={{
                    fontWeight: "700",
                    color: "rgba(90, 90, 90, 0.833)",
                  }}
                  id="demo-simple-select-autowidth-label"
                >
                  Выберите коллекцию
                </InputLabel>
                <Select
                  onChange={(e) => {
                    handleCollectionChange(e); // Сначала обновляем состояние nameCol
                    changeHandlerDescription(e); // Затем обновляем состояние descript
                  }}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={nameCol}
                  name="collection_id"
                  autoWidth
                  label="collection"
                >
                  {collection.map((el) => (
                    <MenuItem value={el.id} key={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Box
              sx={{
                width: 550,
                maxWidth: "100%",
              }}
            >
              <ItemInput
                changeHandler={changeHandlerDescription}
                name={"nameModel"}
                label={"Имя модели"}
              />
              <ItemInput
                changeHandler={changeHandlerDescription}
                name={"description"}
                label={"Описание"}
              />
              <ItemInput
                changeHandler={changeHandlerDescription}
                name={"model_sizes"}
                label={"Размер модели"}
              />

              <ItemInput
                changeHandler={changeHandlerDescription}
                name={"characteristics"}
                label={"Характеристики"}
              />
              <ItemInput
                changeHandler={changeHandlerDescription}
                name={"price"}
                label={"Цена"}
              />
              <ItemInput
                changeHandler={changeHandlerDescription}
                name={"color"}
                label={"Цвет"}
              />
            </Box>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", marginBottom: "1rem" }}>
                <input
                  placeholder="in_stock"
                  onChange={changeHandlerDescript}
                  type="checkbox"
                  name="in_stock"
                ></input>
                <div
                  style={{
                    fontWeight: "700", // Замените "200px" на желаемую ширину
                    color: "rgba(90, 90, 90, 0.833)",
                    marginLeft: "8px",
                  }}
                >
                  {" В наличии"}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <h5
                  style={{
                    color: " rgba(90, 90, 90, 0.833)",
                    fontSize: "1rem",
                    marginBottom: "10px",
                    fontWeight: "700",
                  }}
                >
                  Фото товара
                </h5>
                <label
                  htmlFor="fileCatInput"
                  style={{
                    padding: "5px 10px",
                    border: "1px solid rgba(90, 90, 90, 0.3)",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Выберите файлы
                </label>
                <input
                  id="fileCatInput"
                  required
                  filename={files}
                  onChange={changeHandlerFiles}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                ></input>
              </div>
              <Button
                type="submit"
                style={{
                  fontWeight: "700",
                  color: " rgb(220, 220, 220)",
                  backgroundColor: "rgba(90, 90, 90, 0.833)",
                  marginTop: "25px",
                }}
                variant="contained"
              >
                Добавить
              </Button>
            </div>
          </form>
        </div>
        <InfoModal info={message} open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
