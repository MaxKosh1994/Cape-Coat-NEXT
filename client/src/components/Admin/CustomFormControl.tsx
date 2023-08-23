import * as React from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

export default function CustomFormControl(props) {
  return (
    <>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel
            style={{
              fontWeight: "700",
              color: "rgba(90, 90, 90, 0.833)",
            }}
            id="demo-simple-select-autowidth-label"
          >
            {props.infoText}
          </InputLabel>
          <Select
            onChange={(e) => {
              props.handleChange(e); // Сначала обновляем состояние nameCat
              props.changeHandlerDescription(e); // Затем обновляем состояние descript
            }}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={props.valueState}
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