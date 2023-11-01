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
        console.log('데이터를 가져왔습니다:', response.data);
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
    setName(e.target.value);
  }
  /* 공항코드 */
  const handleAcodeChange = (e) => {
    setAcode(e.target.value);
  }

  const handleLocationReg = (e) => {

    const data = {
        "name": name,
        "acode": acode ,
        "ccode": ccode
    }

    console.log(data);

    axios.post('/tripManager/locationReg',data)
    .then((response) => {
      // 요청이 성공한 경우
      console.log('데이터를 가져왔습니다:', response.data);
      setCountries(response.data); // 서버에서 받은 국가 데이터를 상태로 설정
    })
    .catch((error) => {
      console.error('요청 실패:', error);
    });
  }


  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>여행지 등록</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="도시명"
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
                  label="국가명"
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
        <Button variant="outlined" onClick={handleClose}>
          취소
        </Button>
        <Button variant="outlined" onClick={handleLocationReg}>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LocationReg;
