import React, { useState, useEffect, ChangeEvent } from 'react';

// TODO типизация пропсов, any как заглушка
export default function CheckBox(props: any) {
  const [checked, setChecked] = useState(props.defaultChecked || false);

  useEffect(() => {
    setChecked(props.checked || false);
  }, [props.checked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setChecked(newValue);
    props.changeCheckboxHandler(props.name, newValue);
  };

  return (
    <div style={{ display: 'flex', marginBottom: '1rem' }}>
      <input
        placeholder={props.placeholder}
        onChange={handleChange}
        type="checkbox"
        name={props.name}
        checked={checked}
      />
      <div
        style={{
          fontWeight: '700',
          color: 'rgba(90, 90, 90, 0.833)',
          marginLeft: '8px',
        }}
      >
        {props.label}
      </div>
    </div>
  );
}
