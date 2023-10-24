import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function YearSelection(props) {
  const { year, onChange } = props;

  const currentYear = new Date().getFullYear();
  const startYear = 1930;

  const yearOptions = [];
  for (let year = startYear; year <= currentYear; year++) {
    yearOptions.push(year);
  }

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel>출생년도</InputLabel>
      <Select
        value={year}
        label="출생년도"
        onChange={onChange}
      >
        {yearOptions.map((year) => (
          <MenuItem key={year} value={year}>
            {year+'년'}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default YearSelection;
