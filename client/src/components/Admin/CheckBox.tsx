export default function CheckBox(props) {
  return (
    <>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <input
          placeholder={props.placeholder}
          onChange={props.changeHandlerDescript}
          type="checkbox"
          name={props.name}
        ></input>
        <div
          style={{
            fontWeight: "700", // Замените "200px" на желаемую ширину
            color: "rgba(90, 90, 90, 0.833)",
            marginLeft: "8px",
          }}
        >
          {props.label}
        </div>
      </div>
    </>
  );
}
