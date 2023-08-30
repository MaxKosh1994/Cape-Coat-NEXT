import Modal from "@mui/material/Modal";
import { useState, useEffect, useRef } from "react";
import CustomFormControl from "../CustomFormControl";
import { dataAxios } from "../HTTP/adminApi";
import styles from "../../../styles/admin/CatCol.module.css";
import InfoModal from "../InfoModal";
import CustomButton from "../CustomButton";
import InputFiles from "../InputFiles";
import AdminInput from "../AdminInput";

export default function MatModal({ openChange, setOpenChange }) {
  const formRef = useRef(null);
  const [files, setFile] = useState();
  const [description, setDescription] = useState({});
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const [nameCat, setNameCat] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const address = "material";
  const addressCat = "category";
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
      if (url === `add${address}` || url === `edit${address}`) {
        for (let key in files.photos) {
          formData.append("photos", files.photos[key]);
        }
      }
      formData.append("description", JSON.stringify(description));
      const val = await Object.fromEntries(formData.entries());
      await dataAxios(setContent, setMessage, address, formData, url, id);
      setOpen(true);
      setTimeout(() => {
        setMessage("");
        setOpen(false);
      }, 1000);
      formRef.current.reset();
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
            <div className={styles.mainDiv}>
              <div className={styles.headerDiv}>
                <h2>{"Коллекция"}</h2>
              </div>
              <form
                ref={formRef}
                onSubmit={submit}
                encType="multipart/form-data"
                style={{ marginTop: "10px" }}
              >
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
                  styleSize={"200"}
                  infoText={"Выберите материал"}
                  arr={content}
                  valueState={name}
                  name={"material_id"}
                  label={"material"}
                  handleChange={handleChange}
                  changeHandlerDescription={changeHandlerDescription}
                />
                <AdminInput
                  changeHandler={changeHandlerDescription}
                  name={"name"}
                  label={"Имя"}
                  types={"text"}
                />
                <InputFiles
                  text={"Фото материала"}
                  file={files}
                  changeHandlerFiles={changeHandlerFiles}
                  shouldAllowMultiple={false}
                />
                <CustomButton
                  label={"Добавить"}
                  submit={submit}
                  url={"addmaterial"}
                />
                <CustomButton
                  label={"Изменить"}
                  submit={submit}
                  url={"editmaterial"}
                />
                <CustomButton
                  label={"Удалить"}
                  submit={submit}
                  url={"delmaterial"}
                />
              </form>
              <div />
            </div>
            <InfoModal info={message} open={open} setOpen={setOpen} />
          </div>
        </div>
      </Modal>
    </>
  );
}
