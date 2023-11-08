import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import TravelExplore from '@mui/icons-material/TravelExplore';

axios.defaults.xsrfCookieName = 'XSRF-TOKEN'; // Spring Boot에서 기본 설정된 이름을 사용
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

function LocationReg({ isOpen, handleClose }) {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState('');
  const [acode, setAcode] = useState('');
  const [ccode, setCcode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('/tripManager/getCountyCode')
      .then((response) => {
        // 요청이 성공한 경우
        setCountries(response.data); // 서버에서 받은 국가 데이터를 상태로 설정
      })
      .catch((error) => {
        console.error('요청 실패:', error);
      });
  }, []);

  useEffect(() => {
    // 검색어에 따라 국가를 필터링
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  /* 도시명 */
  const handleNameChange = (e) => {
  // 정규 표현식을 사용하여 한글 이외의 문자를 모두 제거
  const inputValue = e.target.value;
  setName(inputValue);
  }

  /* 공항코드 */
  const handleAcodeChange = (e) => {
    const inputValue = e.target.value.toUpperCase(); // 입력값을 대문자로 변환
    const filteredValue = inputValue.replace(/[^A-Z]/g, ''); // 대문자 알파벳 외의 문자를 모두 제거
    const trimmedValue = filteredValue.slice(0, 3); // 처음 세 글자만 유지
  
    setAcode(trimmedValue);
  }

  const handleLocationReg = (e) => {

    const data = {
        "name": name,
        "acode": acode ,
        "ccode": ccode
    }
    axios.post('/tripManager/locationReg',data)
    .then((response) => {
      if(response.status===200){
        handleClose();
        setName('');
        setAcode('');
        setCcode('');
        setSearchTerm('');
      }
    })
    .catch((error) => {
      console.error('요청 실패:', error);
    });
  }

  const handleResetClose = () =>{
    handleClose();
    setName('');
    setAcode('');
    setCcode('');
    setSearchTerm('');
  }

  return (
    <Dialog open={isOpen} onClose={handleResetClose}>
      <DialogTitle>여행지 등록</DialogTitle>
      <DialogContent>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="도시명(한글입력)"
                autoFocus
                size="small"
                onChange={handleNameChange}
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="공항코드명"
                size="small"
                value={acode}
                onChange={handleAcodeChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  label="국가 검색(한글입력)"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TravelExplore />
                      </InputAdornment>
                    ),
                  }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>국가명</InputLabel>
                <Select
                  label="국가명*"
                  value={ccode}
                  required
                  onChange={(e) => setCcode(e.target.value)}
                >
                  {filteredCountries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name + '(' + country.code + ')'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleResetClose}>
          취소
        </Button>
        <Button variant="outlined" type='button' onClick={handleLocationReg}>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LocationReg;
