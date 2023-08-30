import Modal from "@mui/material/Modal";
import { useState, useEffect, useRef } from "react";
import { formDataCategoryAxios, categoryDataFetch } from "../HTTP/adminApi";
import styles from "../../../styles/admin/CatCol.module.css";
import AdminInput from "../AdminInput";
import InputFiles from "../InputFiles";
import CustomButton from "../CustomButton";
import InfoModal from "../InfoModal";
import CustomFormControl from "../CustomFormControl";

export default function CatModal({ openChange, setOpenChange }) {
  const formCatRef = useRef(null);
  const [files, setFile] = useState();
  const [descript, setDescription] = useState({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [nameCat, setNameCat] = useState("");
  console.log(category)
  useEffect(() => {
    categoryDataFetch(setCategory, setMessage);
  }, []);

  const changeHandlerFiles = (e) => {
    setFile({ ...files, photos: e.target.files });
  };

  const changeHandlerDescription = (e) => {
    setDescription({ ...descript, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (event) => {
    setNameCat(event.target.value);
  };
  const submit = async (e, url) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (url === "addcategory" || url === "editcategory") {
        for (let key in files.photos) {
          formData.append("photos", files.photos[key]);
        }
      }
      formData.append("description", JSON.stringify(descript));
      const val = await Object.fromEntries(formData.entries());
      const id = descript.category_id;
      const response = await formDataCategoryAxios(
        formData,
        setCategory,
        setMessage,
        url,
        id
      );
      setOpen(true);
      setTimeout(() => {
        setMessage("");
        setOpen(false);
      }, 1000);
      formCatRef.current.reset();
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
                <h2>{"Категория"}</h2>
              </div>
              <form
                ref={formCatRef}
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
                <AdminInput
                  changeHandler={changeHandlerDescription}
                  name={"name"}
                  label={"Название"}
                  types={"text"}
                />
                <AdminInput
                  changeHandler={changeHandlerDescription}
                  name={"urlName"}
                  label={"Английское название"}
                  types={"text"}
                />
                <InputFiles
                  text={"Фото категории"}
                  file={files}
                  changeHandlerFiles={changeHandlerFiles}
                  shouldAllowMultiple={false}
                />
                <CustomButton
                  label={"Добавить"}
                  submit={submit}
                  url={"addcategory"}
                />
                <CustomButton
                  label={"Изменить"}
                  submit={submit}
                  url={"editcategory"}
                />
                <CustomButton
                  label={"Удалить"}
                  submit={submit}
                  url={"dellcategory"}
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
