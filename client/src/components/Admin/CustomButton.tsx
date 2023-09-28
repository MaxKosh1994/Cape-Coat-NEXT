import { Button } from '@mui/material';

// TODO типизация пропсов, any заглушка
export default function CustomButton(props: any) {
  return (
    <>
      <Button
        onClick={(event) => props.submit(event, props.url)}
        type="submit"
        style={{
          fontWeight: '700',
          color: ' rgb(220, 220, 220)',
          backgroundColor: 'rgba(90, 90, 90, 0.833)',
          marginTop: '25px',
        }}
        variant="contained"
      >
        {props.label}
      </Button>
    </>
  );
}
