import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import RegisterButton from '../../../../common/tag/RegisterButton'
import SearchIcon from '@mui/icons-material/Search';
import AirLineReg from './dialog/AirLineReg';
import AirPlaneReg from './dialog/AirPlaneReg';

function AirLineManage() {

  /* 항공사 등록 Dialog */
  const [isOpenAirLineReg,setIsOpenAirLineReg] = useState(false);
  const handleCloseAirLineReg = (e) => {
    setIsOpenAirLineReg(false);
  }
  const handleOpenAirLineReg = (e) => {
    setIsOpenAirLineReg(true);
  }

  /* 항공편 등록 Dialog */
  const [isOpenAirPlaneReg,setIsOpenAirPlaneReg] = useState(false);
  const handleCloseAirPlaneReg = (e) => {
    setIsOpenAirPlaneReg(false);
  }

  const handleOpenAirPlaneReg = (e)=>{
    setIsOpenAirPlaneReg(true);
  }

  return (
    <div>
      <Typography variant="h5" sx={{marginBottom:4, color:'#7a7672'}} gutterBottom>
        항공관리
      </Typography>
      <Grid container spacing={2}>
          <Grid item xs={5}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4}>
                <RegisterButton title={'항공사 등록'} icon={'airline'} onClick={handleOpenAirLineReg}  />
              </Grid>
              <Grid item xs={12} sm={4}>
                <RegisterButton title={'항공편 등록'} icon={'airplane'} onClick={handleOpenAirPlaneReg} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} sm={3}>
            <TextField
              id="input-with-icon-textfield"
              label="항공편 검색"
              size='small'
              fullWidth
              //onChange={handleKeywordChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <FormControl fullWidth size="small">
                <InputLabel>정렬내용</InputLabel>
                <Select
                  label="정렬내용"
                  required
                  //value={sortContent}
                  //onChange={handleSortContentChange}
                >
                  <MenuItem value={'NAME'}>여행지역명</MenuItem>
                  <MenuItem value={'ACODE'}>공항코드</MenuItem>
                  <MenuItem value={'CCODE'}>국가명</MenuItem>
                  <MenuItem value={'REGTIME'}>등록일</MenuItem>
                </Select>
            </FormControl>     
          </Grid>
          <Grid item xs={3} sm={2}>
            <FormControl fullWidth  size="small">
                <InputLabel>정렬방법</InputLabel>
                <Select
                  label="정렬방법"
                  required
                  //value={sort}
                  //onChange={handleSortChange}
                >
                  <MenuItem value={'ASC'}>오름차순</MenuItem>
                  <MenuItem value={'DESC'}>내림차순</MenuItem>
                </Select>
            </FormControl>     
          </Grid>
        </Grid>
        <AirLineReg isOpen={isOpenAirLineReg} handleClose={handleCloseAirLineReg} />
        <AirPlaneReg isOpen={isOpenAirPlaneReg} handleClose={handleCloseAirPlaneReg} />
    </div>
  )
}

export default AirLineManage