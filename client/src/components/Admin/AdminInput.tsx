import TextField from '@mui/material/TextField';

// TODO типизация пропсов, any как заглушка
export default function AdminInput(props: any) {
  const isRequired = props.name === 'new_price' && props.formData.in_stock;

  return (
    <>
      <TextField
        value={props.value}
        style={{ marginBottom: '10px' }}
        autoComplete="off"
        required={isRequired}
        onChange={props.changeHandler}
        name={props.name}
        type={props.types}
        fullWidth
        label={props.label}
        id="fullWidth"
        InputLabelProps={{
          style: {
            fontWeight: '700',
            color: 'rgba(90, 90, 90, 0.833)',
          },
        }}
      />
    </>
  );
}
