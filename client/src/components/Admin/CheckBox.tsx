import React, { useState, useEffect } from 'react';

export default function CheckBox(props) {
  const [checked, setChecked] = useState(props.defaultChecked || false);

  useEffect(() => {
    setChecked(props.checked || false);
  }, [props.checked]);

  const handleChange = (e) => {
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
