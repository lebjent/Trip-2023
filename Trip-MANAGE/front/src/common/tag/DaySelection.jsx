import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function DaySelection(props) {
  const { year, month, day,onChange } = props;
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    // 월이 변경될 때 해당 월의 일자 업데이트
    const lastDay = new Date(year, month, 0).getDate();
    const newDaysInMonth = Array.from({ length: lastDay }, (_, index) => index + 1);
    setDaysInMonth(newDaysInMonth);
  }, [year, month]);


  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel>일</InputLabel>
      <Select 
            value={day || ""} 
            label="일" 
            onChange={onChange}>
        {daysInMonth.map((day) => (
          <MenuItem key={day} value={day}>
            {day+'일'}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DaySelection;
