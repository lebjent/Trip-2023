import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import YearSelection from '../../common/tag/YearSelection';
import MonthSelection from '../../common/tag/MonthSelection';
import DaySelection from '../../common/tag/DaySelection';
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const LinkTag = styled.span`
    font-size: 10pt;
`;

export default function EmployeeJoin() {
  
  const [employeeId,setEmployeeId] = useState('');

  useEffect(()=>{
    axios.post('/tripManager/getEmployeeId')
    .then((response) => {
      console.log('POST 요청 결과:', response);
      if(response.status === 200){
        setEmployeeId(response.data);
      }
    })
    .catch((error) => {
      console.error('POST 요청 실패:', error);
    });
    },[employeeId]);

  /* 비밀번호 유효성 검사 */
  const [password,setPassword] = useState('');
  const [passwordError,setPasswordError] = useState(false);
  const [passwordMsg,setPasswordMsg] = useState('');
  const [passwordSuccess, setPasswordsuccess] = useState("");

  const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      if(newPassword.length < 6 || newPassword.length > 8){
        setPasswordError(true);
        setPasswordMsg('비밀번호는 6자에서 8자 사이여야 합니다.');
        setPasswordsuccess("");
      }else{
        setPasswordError(false);
        setPasswordMsg('');
        setPasswordsuccess("success");
        if(e.target.value !== passwordChk && passwordChk.length > 0){
          setPasswordChkError(true);
          setPasswordChkMsg('비밀번호가 일치하지 않습니다.');
          setPasswordChkSuccess('');
        }else{
          setPasswordChkError(false);
          setPasswordChkMsg('');
          setPasswordChkSuccess('success');
        }
      }
  }

  /* 비밀번호 확인 유효성 검사 */
  const [passwordChk,setPasswordChk] = useState("");
  const [passwordChkError,setPasswordChkError] = useState(false);
  const [passwordChkMsg,setPasswordChkMsg] = useState("");
  const [passwordChkSuccess,setPasswordChkSuccess] = useState("");

  const handlePasswordChkChange = (e) =>{
      const newPasswordChk = e.target.value;
      setPasswordChk(e.target.value);

      if(newPasswordChk !== password){
        setPasswordChkError(true);
        setPasswordChkMsg('비밀번호가 일치하지 않습니다.');
      }else{
        setPasswordChkError(false);
        setPasswordChkMsg('');
        setPasswordChkSuccess('success');
      }
  }

  /* 이름 유효성 검사 */
  const [name,setName] = useState('');
  const [nameError,setNameError] = useState(false);
  const [nameMsg,setNameMsg] = useState('');

  const handleNameChange = (e) =>{
    const newName = e.target.value;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    setName(newName);
    if(newName.length > 4 || !korean.test(newName)){
      setNameError(true);
      setNameMsg("이름을 다시 확인해주세요.");
    }else{
      setNameError(false);
      setNameMsg('');
    }
  }

  /* 성별 */
  const [gender,setGender] = useState('M');
  const handleGenderChange = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);
  }

  /* 생년월일 */
  const [year,setYear] = useState(new Date().getFullYear());
  const handleChangeYear = (e) => {
    setYear(e.target.value);
  }

  const [month,setMonth] = useState(1);
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  }

  const [day,setDay] = useState(1);
  const handleChangeDay = (e) => {
    setDay(e.target.value);
  }

  /* 전화번호 */
  const [phone,setPhone] = useState("");
  const [phoneError,setPhoneError] = useState(false);
  const [phoneMsg,setPhoneMsg] = useState("");
  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    const regPhone = /^(01[016789]{1})\d{3,4}\d{4}$/;
    if(!regPhone.test(newPhone)){
      setPhoneError(true);
      setPhoneMsg("휴대폰 번호를 다시 한번 확인해주세요.");
    }else{
      setPhoneError(false);
      setPhoneMsg("");
    }
    setPhone(newPhone);
  }
  /* 이메일 */
  const [email,setEmail] = useState('');
  const [emailError,setEmailError] = useState(false);
  const [emailMsg,setEmailMsg] = useState('');
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(newEmail);
    if(!emailPattern.test(newEmail)){
      setEmailError(true);
      setEmailMsg("유효한 이메일 형식이 아닙니다.");
    }else{
      setEmailError(false);
      setEmailMsg("");
    }
  } 

  /* 담당부서 */
  const [division,setDivision] = useState('');
  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom:8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            W.B.T.M System 회원가입
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="employeeId"
                  required
                  fullWidth
                  id="employeeId"
                  label="사번"
                  value={employeeId}
                  helperText="사번은 자동으로 배정 됩니다."
                  size="small"
                  InputProps={{
                    readOnly : true
                  }}
                  variant="filled"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label='비밀번호' 
                    value={password}
                    error={passwordError}
                    helperText = {passwordMsg}
                    onChange = {handlePasswordChange}
                    color={passwordSuccess}
                    size='small'
                    type='password'
                    autoComplete="new-password"
                    required
                    fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  value={passwordChk}
                  error={passwordChkError}
                  helperText={passwordChkMsg}
                  onChange={handlePasswordChkChange}
                  color={passwordChkSuccess}
                  label='비밀번호 확인'
                  size='small'
                  type='password'
                  autoComplete="new-password"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="이름"
                  size='small'
                  onChange={handleNameChange}
                  error={nameError}
                  helperText={nameMsg}
                  value={name}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth size='small'>
                <InputLabel>성별</InputLabel>
                <Select
                  value={gender || ''}
                  label="성별"
                  onChange={handleGenderChange}
                >
                  <MenuItem value='M'>남성</MenuItem>
                  <MenuItem value='F'>여성</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={4}>
                  <YearSelection year={year} onChange={handleChangeYear} />
              </Grid>
              <Grid item xs={4}>
                  <MonthSelection month={month} onChange={handleChangeMonth}  />
              </Grid>
              <Grid item xs={4}>
                  <DaySelection year={year} month={month} day={day} onChange={handleChangeDay} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="전화번호"
                  size='small'
                  onChange={handlePhoneChange}
                  error={phoneError}
                  helperText={phoneMsg}
                  value={phone}
                  placeholder="-를 제외하고 입력해주세요."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="이메일"
                  size='small'
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailMsg}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth size='small'>
                <InputLabel>담당부서</InputLabel>
                <Select
                  value={division || ''}
                  label="담당부서"
                  onChange={handleDivisionChange}
                >
                  <MenuItem value='동남아팀'>동남아팀</MenuItem>
                  <MenuItem value='유럽1팀'>유럽1팀</MenuItem>
                  <MenuItem value='유럽2팀'>유럽2팀</MenuItem>
                  <MenuItem value='미주팀'>미주팀</MenuItem>
                  <MenuItem value='기타지역팀'>기타지역팀</MenuItem>
                  <MenuItem value='IT팀'>IT팀</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label={
                    <Typography variant="body2" style={{ fontSize: '10pt' }}>
                      회원가입 이후 관리자의 승인이 필요하며 15일이내 승인이 없을시 자동으로 요청이 취소 됩니다.
                    </Typography>
                  }
               />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={'/'}>
                    <LinkTag>
                        이미 회원이신가요? 로그인
                    </LinkTag>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
