import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import axios from 'axios';

function AirLineReg(props) {

  const {isOpen,handleClose} = props;
  /* 항공사 등록 관련 useState */
  const [code,setCode] = useState('');
  const [codeError,setCodeError] = useState(false);
  const [codeErrorMsg,setCodeErrorMsg] = useState('');

  const handleCodeChange = (e) => {
    const inputValue = e.target.value.toUpperCase(); // 입력값을 대문자로 변환
    const filteredValue = inputValue.replace(/[^A-Z0-9]/g, '');
    const trimmedValue = filteredValue.slice(0, 2); // 처음 두글자만 유지
    setCode(trimmedValue);

    const param = {"code":inputValue};

    if(inputValue.length <= 0 || inputValue.length <2){
        setCodeError(true);
        setCodeErrorMsg("항공사코드는 2자만 등록이 가능합니다.");
        return false;
      }else{
        setCodeError(false);
        setCodeErrorMsg('');
      }

    axios.post("/tripManager/LEVEL1/airlinesCodeDupChk",param)
    .then((response) => {
      if(response.status===200){
        if(response.data){
          setCodeError(true);
          setCodeErrorMsg("이미 등록된 항공사코드가 있습니다.");
        }else{
          setCodeError(false);
          setCodeErrorMsg('');
        }
      }
    })
    .catch((error) => {
      console.error('요청 실패:', error);
    });

  }

  const [airlineName, setAirlineName] = useState('');
  const [airLineNameError,setAirLineNameError] = useState(false);
  const [airLineNameErrorMsg,setAirLineNameErrorMsg] = useState('');


  const handleAirLinesNameChange = (e) => {
    const inputValue = e.target.value;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if(!korean.test(inputValue)){
      setAirLineNameError(true);
      setAirLineNameErrorMsg('항공사명은 한글로 입력해주세요.');
    }else{
      setAirLineNameError(false);
      setAirLineNameErrorMsg('');
    }

    setAirlineName(e.target.value);

  }

  /* 항공사 등록 프로세스 */
  const handleRegProcess = (e) =>{
    
    if(airLineNameError || airlineName.length<=0){
        return false;
    }

    if(codeError || code.length <= 0){
        return false;
    }

    const param = {
        "code":code,
        "airlineName":airlineName
    }
    console.log(param);
    axios.post("/tripManager/LEVEL2/savedAirLines",param)
    .then((response) => {
        console.log(response);
      if(response.status===200){
        handleResetClose();
      }
    })
    .catch((error) => {
      console.error('요청 실패:', error);
    });

  }

  /* 리셋하고 클로즈 */
  const handleResetClose = (e) => {
    setAirlineName('');
    setCode('');
    setAirLineNameError(false);
    setAirLineNameErrorMsg('');
    setCodeError(false);
    setCodeErrorMsg('');

    handleClose();
  }

  return (
    <Dialog open={isOpen} onClose={handleResetClose}>
      <DialogTitle>항공사 등록</DialogTitle>
      <DialogContent>
        <Box component="div" noValidate sx={{ mt: 3 , width:'300px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="항공사명"
                    autoFocus
                    size="small"
                    value={airlineName}
                    onChange={handleAirLinesNameChange}
                    error={airLineNameError}
                    helperText={airLineNameErrorMsg}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="항공사코드"
                    autoFocus
                    size="small"
                    value={code}
                    onChange={handleCodeChange}
                    error={codeError}
                    helperText={codeErrorMsg}
                />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleResetClose}>
          취소
        </Button>
        <Button variant="outlined" type='button' onClick={handleRegProcess}>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AirLineReg