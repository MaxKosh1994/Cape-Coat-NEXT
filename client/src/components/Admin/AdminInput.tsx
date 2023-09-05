import TextField from '@mui/material/TextField';

export default function AdminInput(props) {
  return (
    <>
      <TextField
        style={{ marginBottom: '10px' }}
        autoComplete='off'
        required
        onChange={props.changeHandler}
        name={props.name}
        type={props.types}
        fullWidth
        label={props.label}
        id='fullWidth'
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
