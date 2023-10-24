import React, { useState } from 'react';
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
import PasswordTag from '../../tag/PasswordTag';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const LinkTag = styled.span`
    font-size: 10pt;
`;

export default function EmployeeJoin() {
  
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
                  defaultValue={'WBTM0001'}
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
                <PasswordTag 
                    label={'비밀번호'} 
                    value={password}
                    error={passwordError}
                    helperText = {passwordMsg}
                    onChange = {handlePasswordChange}
                    success={passwordSuccess}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordTag 
                  label={'비밀번호 확인'}
                  value={passwordChk}
                  error={passwordChkError}
                  helperText={passwordChkMsg}
                  onChange={handlePasswordChkChange}
                  success={passwordChkSuccess}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordCheck"
                  label="비밀번호 확인"
                  type="password"
                  id="passwordCheck"
                  autoComplete="new-password"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="이름"
                  name="name"
                  size='small'
                />
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
