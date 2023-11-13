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
  
  //Select에 채워넣을 국가
  const [countries, setCountries] = useState([]);
  
  //도시명
  const [name, setName] = useState('');
  const [nameError,setNameError] = useState(false);
  const [nameMsg,setNameMsg] = useState('');
  
  //공항코드
  const [acode, setAcode] = useState('');
  const [acodeError,setAcodeError] = useState(false);
  const [acodeMsg,setAcodeMsg] = useState('');

  //국가코드
  const [ccode, setCcode] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  useEffect(() => {
    axios
      .get('/tripManager/LEVEL1/getCountyCode')
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
    const inputValue = e.target.value;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if(!korean.test(inputValue)){
      setNameError(true);
      setNameMsg('여행지역명은 한글로 입력해주세요.');
    }else{
      setNameError(false);
      setNameMsg('');
    }

    setName(inputValue);
  }

  /* 공항코드 */
  const handleAcodeChange = (e) => {
    const inputValue = e.target.value.toUpperCase(); // 입력값을 대문자로 변환
    const filteredValue = inputValue.replace(/[^A-Z]/g, ''); // 대문자 알파벳 외의 문자를 모두 제거
    const trimmedValue = filteredValue.slice(0, 3); // 처음 세 글자만 유지
    
    setAcode(trimmedValue);

    if(inputValue.length <= 0 || inputValue.length <3){
      setAcodeError(true);
      setAcodeMsg("공항코드는 3자만 등록이 가능합니다.");
      return false;
    }else{
      setAcodeError(false);
      setAcodeMsg('');
    }

    const param = {"acode":inputValue};

    axios.post("/tripManager/LEVEL1/acodeDupChk",param)
    .then((response) => {
      if(response.status===200){
        if(response.data){
          setAcodeError(true);
          setAcodeMsg("이미 등록된 공항코드가 있습니다.");
        }else{
          setAcodeError(false);
          setAcodeMsg('');
        }
      }
    })
    .catch((error) => {
      console.error('요청 실패:', error);
    });

  }

  const handleLocationReg = (e) => {

    if(name.length <= 0 || nameError){
      return false;
    }

    if(acode.length <= 0 || acodeError){
      return false;
    }

    if(ccode.length <= 0){
      return false;
    }

    const param = {
        "name": name,
        "acode": acode ,
        "ccode": ccode
    }
    axios.post('/tripManager/LEVEL2/locationReg',param)
    .then((response) => {
      if(response.status===200){
        handleResetClose();
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
                error={nameError}
                helperText={nameMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="공항코드명"
                size="small"
                error={acodeError}
                helperText={acodeMsg}
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
