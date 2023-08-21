import TextField from "@mui/material/TextField";

export default function ItemInput(props) {

  return (
    <>
      <TextField
        autoComplete="off"
        required
        onChange={props.changeHandler}
        name={props.name}
        type="text"
        fullWidth
        label={props.label}
        id="fullWidth"
        InputLabelProps={{
          style: {
            fontWeight: "700", // Замените "200px" на желаемую ширину
            color: "rgba(90, 90, 90, 0.833)",
          },
        }}
      />
    </>
  );
}
