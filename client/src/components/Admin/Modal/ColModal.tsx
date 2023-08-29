import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { formDataCollectionAxios, collectionDataFetch } from "../HTTP/adminApi";
import styles from "../../../styles/admin/CatCol.module.css";
import AdminInput from "../AdminInput";
import InputFiles from "../InputFiles";
import CustomButton from "../CustomButton";
import InfoModal from "../InfoModal";
import CheckBox from "../checkbox";
import CustomFormControl from "../CustomFormControl";

export default function ColModal({ openChange, setOpenChange }) {
  const [files, setFile] = useState();
  const [descript, setDescription] = useState({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [nameCol, setNameCol] = useState("");
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    collectionDataFetch(setCollection, setMessage);
  }, []);

  const changeHandlerFiles = (e) => {
    setFile({ ...files, photos: e.target.files });
  };

  const changeHandlerDescript = (e) => {
    setDescription({ ...descript, [e.target.name]: e.target.checked });
  };

  const changeHandlerDescription = (e) => {
    setDescription({ ...descript, [e.target.name]: e.target.value });
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
      const val = await Object.fromEntries(formData.entries());
      const response = await formDataCollectionAxios(formData, setMessage);
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
                  infoText={"Выберите коллекцию"}
                  arr={collection}
                  valueState={nameCol}
                  name={"collection_id"}
                  label={"collection"}
                  handleChange={handleCollectionChange}
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
                  name={"description"}
                  label={"Описание"}
                  types={"text"}
                />
                <AdminInput
                  changeHandler={changeHandlerDescription}
                  name={"urlName"}
                  label={"Английское название"}
                  types={"text"}
                />
                <CheckBox
                  changeHandler={changeHandlerDescript}
                  name={"current"}
                  placeholder={"current"}
                  label={" Актуальность"}
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
