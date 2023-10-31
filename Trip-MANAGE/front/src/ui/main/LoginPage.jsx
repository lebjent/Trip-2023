import styled from '@emotion/styled';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Login from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* 페이지 하단 Copyright 부분 컴포넌트 */
function Copyright(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center" {...props}>
      {'Copyright © '}
        Wedding Bliss Tour Manager
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

/* 
다크모드 테마 추후 변경 기능추가 에정 
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // 어두운 테마 설정
    primary: {
      main: '#2196F3', // 주요 색상 변경
    },
    secondary: {
      main: '#FF5722', // 보조 색상 변경
    },
    background: {
      default: '#121212', // 배경색 변경
      paper: '#1E1E1E', // 페이퍼 배경색 변경
    },
    text: {
      primary: '#ffffff', // 텍스트 기본 색상 변경
      secondary: '#B0BEC5', // 텍스트 보조 색상 변경
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif', // 원하는 글꼴로 변경
  }
});
*/
/* 회원가입 및 아이디 비밀번호찾기 링크를 설정하기위한 styled 태그 */
const LinkTag = styled.span`
    font-size: 10pt;
`;

axios.defaults.xsrfCookieName = 'XSRF-TOKEN'; // Spring Boot에서 기본 설정된 이름을 사용
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

function LoginPage() {

  //아이디(사원번호)
  const [employeeId,setEmployeeId] = useState('');
  const handleChangeId = (e) =>{
    setEmployeeId(e.target.value);
    setLoginErrMsg('');
  };
  
  //비밀번호
  const [password,setPassword] = useState('');
  const handleChangePassword = (e) =>{
    setPassword(e.target.value);
    setLoginErrMsg('');
  };

  //아이디 기억하기 관련
  const [rememberId, setRememberId] = useState(false); // 아이디 기억하기 상태
  const handleChangeRememberId = (e) => {
    setRememberId(e.target.checked);
  };
  
  //로그인시 아이디와 패스워드가 틀릴 경우 메시지
  const [loginErrMsg,setLoginErrMsg] = useState("");

  //로그인 버튼 클릭시
  const handleSubmit = (e) =>{
    e.preventDefault();

    //아이디 또는 비밀번호를 입력하지 않은경우
    if(employeeId === '' || employeeId.length<=0){
      setLoginErrMsg('아이디(사원번호)를 입력해주세요.');
      return false;
    }

    if(password === '' || password.length <= 0){
      setLoginErrMsg('비밀번호를 입력해주세요.');
      return false;
    }

    // 사용자의 아이디 기억하기 설정을 저장
    if (rememberId) {
      localStorage.setItem('rememberedEmployeeId', employeeId);
    } else {
      localStorage.removeItem('rememberedEmployeeId');
    }

    const data = {
      'employeeId':employeeId,
      'password':password
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };

    axios
    .post('/tripManager/login', data, config)
    .then((response) => {
      if (response.status === 200) {
        axios.post('/tripManager/getLoginInfo').then((response)=>{
          console.log(response);
          if(response.data.loginStatus === "SUCCESS"){
            const loginInfo = {
              "division": response.data.division,
              "employeeId": response.data.employeeId,
              "name": response.data.name
            }
            sessionStorage.setItem("loginInfo",JSON.stringify(loginInfo));
            //navigate('/dashboard');
            window.location.href = '/'
          }else{
            setLoginErrMsg("회원정보를 가져오는대 실패하였습니다.");
          }
        }).catch((error)=>{
          setLoginErrMsg("회원정보를 가져오는대 실패하였습니다.");
        })
      }
    })
    .catch((error) => {
      if (error.response) {
        // 서버에서 오류 응답을 보낸 경우
        const returnCode = error.response.data.returnCode; // 서버에서 정의한 오류 메시지 필드 이름 사용
        const returnStatus = error.response.status;
        console.log(error);
        if(returnCode === "NO_ID"){
          setLoginErrMsg("등록된 아이디가 없습니다.");
        }else if(returnCode === "NO_CONFIRM"){
          setLoginErrMsg("회원가입의 승인이 되지않았습니다. 관리자에게 문의해주세요.");
        }else if(returnStatus === 401){
          setLoginErrMsg("아이디와 비밀번호를 확인해주세요.");
        } 
      } else {
        // 네트워크 또는 클라이언트 측 오류인 경우
        setLoginErrMsg('서버와의 통신 중 오류가 발생했습니다.');
      }
    });

  }

  
  useEffect(() => {
    //저장 되어있는 아이디(사번)이 있는지 체크
    const rememberedEmployeeId = localStorage.getItem('rememberedEmployeeId');
    //체크이후 useState에 저장
    if (rememberedEmployeeId) {
      setEmployeeId(rememberedEmployeeId);
      setRememberId(true);
    }
  }, []);
  
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(img/main/mainImage.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'dark' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 10,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h2" variant="h5">
              W.B.T.M System 로그인
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="employeeId"
                label="사번"
                name="employeeId"
                value={employeeId}
                onChange={handleChangeId}
                //autoFocus 자동 포커스 기pt
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                value={password}
                onChange={handleChangePassword}
                autoComplete="current-password"
              />
              <br/>
              {loginErrMsg && ( // loginErrMsg가 비어 있지 않다면 메시지 표시
                <Typography variant="body2" color="error" sx={{fontWeight:'bold',fontSize:'9pt'}}>
                  {loginErrMsg}
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox checked={rememberId} color="primary" onChange={handleChangeRememberId} />}
                label="아이디 기억하기"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                size='large'
                startIcon={<Login />}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                로그인
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to={'/'}>
                    <LinkTag>
                      아이디와 비밀번호를 잃어버리셨습니까?
                    </LinkTag>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={'/employeeJoin'}>
                    <LinkTag>
                      계정이 없으신가요? 가입하기
                    </LinkTag>
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
