export default function InputFiles(props) {
  return (
    <>
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
          {props.text}
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
          filename={props.files}
          onChange={props.changeHandlerFiles}
          type="file"
          accept="image/*"
          multiple={props.shouldAllowMultiple ? true : false}
          style={{ display: "none" }}
        ></input>
      </div>
    </>
  );
}
