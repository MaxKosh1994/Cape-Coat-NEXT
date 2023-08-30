import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import CustomFormControl from "../CustomFormControl";
import { formDataMatAxios, categoryDataFetch } from "../HTTP/adminApi";
import styles from "../../../styles/admin/CatCol.module.css";
import InfoModal from "../InfoModal";
import CustomButton from "../CustomButton";
import InputFiles from "../InputFiles";
import AdminInput from "../AdminInput";

export default function MatModal({ openChange, setOpenChange }) {
  const [files, setFile] = useState();
  const [category, setCategory] = useState([]);
  const [descript, setDescription] = useState({});
  const [nameMat, setNameMat] = useState("");
  const [nameCat, setNameCat] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    categoryDataFetch(setCategory, setMessage);
  }, []);

  const changeHandlerDescription = (e) => {
    setDescription({ ...descript, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (event) => {
    setNameCat(event.target.value);
  };

  const changeHandlerFiles = (e) => {
    setFile({ ...files, photos: e.target.files });
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
      const response = await formDataMatAxios(formData, setMessage);
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
                <InputFiles
                  text={"Фото коллекции"}
                  file={files}
                  changeHandlerFiles={changeHandlerFiles}
                  shouldAllowMultiple={false}
                />
                <CustomButton label={"Добавить"} />
                <CustomButton label={"Изменить"} />
                <CustomButton label={"Удалить"} />
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
