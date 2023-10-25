import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function MonthSelection(props) {
  const { month, onChange } = props;

  const monthOptions = [
    { value: '01', label: '1월' },
    { value: '02', label: '2월' },
    { value: '03', label: '3월' },
    { value: '04', label: '4월' },
    { value: '05', label: '5월' },
    { value: '06', label: '6월' },
    { value: '07', label: '7월' },
    { value: '08', label: '8월' },
    { value: '09', label: '9월' },
    { value: '10', label: '10월' },
    { value: '11', label: '11월' },
    { value: '12', label: '12월' },
  ];

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel>월</InputLabel>
      <Select value={month || ""} label="월" onChange={onChange}>
        {monthOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MonthSelection;
