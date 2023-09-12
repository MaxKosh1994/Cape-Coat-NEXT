import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function CustomFormControl(props) {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel
          style={{
            fontWeight: '700',
            color: 'rgba(90, 90, 90, 0.833)',
          }}
          id="demo-simple-select-autowidth-label"
        >
          {props.infoText}
        </InputLabel>
        <Select
          onChange={(e) => {
            props.handleChange(e);
            props.changeHandlerDescription(e);
          }}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={props.valueState}
          defaultValue={props.valueState}
          name={props.name}
          autoWidth
          label={props.label}
        >
          {props.arr.map((el) => (
            <MenuItem value={el.id} key={el.id}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
