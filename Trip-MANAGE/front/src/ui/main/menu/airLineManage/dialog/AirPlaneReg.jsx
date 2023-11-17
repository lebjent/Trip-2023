import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Airlines from '@mui/icons-material/AirlinesRounded';
import Departure from '@mui/icons-material/FlightTakeoff';
import Arrive from '@mui/icons-material/FlightLand';

function AirPlaneReg(props) {
   
  const {isOpen,handleClose} = props;
  
  /* 포커싱을 위해서 */
  const airlineCodeRef = useRef(null);
  const flightCodeRef = useRef(null);
  const departureRef = useRef(null);
  const arriveRef = useRef(null);
  const departureTimeRef = useRef(null);
  const arriveTimeRef = useRef(null);

  /* 항공사 관련 */
  const [airlines,setAirlines] = useState([]);
  const [searchAirline, setSearchAirline] = useState('');
  const [filteredAirlines, setFilteredAirlines] = useState([]);
  const [airlineCode,setAirlineCode] = useState('');

  useEffect(()=>{
    axios.get("/tripManager/LEVEL1/getAirLinesCode")
    .then((response) => {
      if(response.status===200){
        setAirlines(response.data);
      }
    })
    .catch((error) => {
      console.error('요청 실패:', error);
    });
  },[isOpen])
  

  useEffect(() => {
    // 검색어에 따라 항공사 코드를 필터링
    const filtered = airlines.filter((airline) =>
      airline.airlineName.includes(searchAirline) || airline.code.includes(searchAirline)
    );
    setFilteredAirlines(filtered);
  }, [searchAirline, airlines]);

  const [flightCode, setFlightCode] = useState('');

  const handleFlightCodeChange = (e) => {
    const value = e.target.value;
  
    // 정규표현식을 사용하여 숫자만 포함되어 있는지 확인
    if (/^\d*$/.test(value) && value.length <= 4) {
      // 숫자만 포함된 경우에만 값을 업데이트
      setFlightCode(value);
    }
  };


  /* 지역관련 */
  const [departure,setDeparture] = useState('');
  const [searchDeparture,setSearchDeparture] = useState('');
  const [deparureCodeList,setDepartureCodeList] = useState([]);
  const [filterDepartureCodeList,setFilterDepartureCodeList] = useState([]);

  const [arrive,setArrive] = useState('');
  const [searchArrive,setSearchArrive] = useState('');
  const [arriveCodeList,setArriveCodeList] = useState([]);
  const [filterArriveCodeList,setFilterArriveCodeList] = useState([]);

  useEffect(()=>{
    axios.get("/tripManager/LEVEL1/getLoactionCode")
    .then((response) => {
      if(response.status===200){
        setDepartureCodeList(response.data);
        setArriveCodeList(response.data);
      }
    })
    .catch((error) => {
      console.error('요청 실패:', error);
    });
  },[])
  
  useEffect(()=>{
    const filtered = deparureCodeList.filter((departure) =>
      departure.name.includes(searchDeparture) || departure.acode.includes(searchDeparture)
    );
    setFilterArriveCodeList(filtered);
  },[deparureCodeList,searchDeparture])

  useEffect(()=>{
    const filtered = arriveCodeList.filter((arrive) =>
      arrive.name.includes(searchArrive) || arrive.acode.includes(searchArrive)
    );
    setFilterDepartureCodeList(filtered);
  },[arriveCodeList,searchArrive])

 const [departureTime,setDepartureTime] = useState('');
 const [arriveTime,setArriveTime] = useState('');

  /* 항공편 등록 */
  const handleAirPlaneReg = (e) =>{
    
    if(airlineCode.length <= 0){
      airlineCodeRef.current.focus();
      return false;
    }

    if(flightCode.length <=0){
      flightCodeRef.current.focus();
      return false;
    }

    if(departure.length <= 0){
      departureRef.current.focus();
      return false;
    }


    if(departureTime <= 0){
      departureTimeRef.current.focus();
      return false;
    }

    if(arrive.length <= 0){
      arriveRef.current.focus();
      return false;
    }

    if(arriveTime <= 0){
      arriveTimeRef.current.focus();
      return false;
    }

    const param = {
      "code": airlineCode+flightCode,
      "airlineCode":airlineCode,
      "flightCode":flightCode,
      "departure":departure,
      "arrive":arrive,
      "departureTime":departureTime,
      "arriveTime":arriveTime
    }

    axios.post("/tripManager/LEVEL2/airPlaneReg",param)
    .then((response) => {
      if(response.status===200){
        handleCloseReset();
      }
    })
    .catch((error) => {
      console.error('요청 실패:', error);
    });

  } 

  const handleCloseReset = () =>{
    setAirlineCode('');
    setArrive('');
    setArriveTime('');
    setDeparture('');
    setDepartureTime('');
    setFlightCode('');
    handleClose();
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseReset}>
    <DialogTitle>항공편 등록</DialogTitle>
    <DialogContent>
      <Box component="div" noValidate sx={{ mt: 3 , width:'500px'}}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                  label="항공사검색"
                  size="small"
                  value={searchAirline}
                  onChange={(e) => setSearchAirline(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Airlines />
                      </InputAdornment>
                    ),
                  }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>항공사명</InputLabel>
                <Select
                  label="항공사명*"
                  required
                  value={airlineCode}
                  onChange={(e)=>setAirlineCode(e.target.value)}
                  inputRef={airlineCodeRef}
                >
                  {filteredAirlines.map((airline) => (
                    <MenuItem key={airline.code} value={airline.code}>
                      {airline.airlineName + '(' + airline.code + ')'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  label="항공편명"
                  autoFocus
                  size="small"
                  type='text'
                  value={flightCode}
                  onChange={handleFlightCodeChange}
                  inputRef={flightCodeRef}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                  label="출발지검색"
                  size="small"
                  value={searchDeparture}
                  onChange={(e) => setSearchDeparture(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Departure />
                      </InputAdornment>
                    ),
                  }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>출발공항</InputLabel>
                <Select
                  label="출발공항*"
                  required
                  value={departure}
                  onChange={(e)=>setDeparture(e.target.value)}
                  inputRef={departureRef}
                >
                  {filterDepartureCodeList.map((departure) => (
                    <MenuItem key={departure.acode} value={departure.acode}>
                      {departure.acode + '(' + departure.name + ')'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          <Grid item xs={12}>
              <TextField
                  type='time'
                  required
                  fullWidth
                  label="출발시간"
                  autoFocus
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={departureTime}
                  onChange={(e)=>setDepartureTime(e.target.value)}
                  inputRef={departureTimeRef}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                  label="도착지검색"
                  size="small"
                  value={searchAirline}
                  onChange={(e) => setSearchArrive(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Arrive />
                      </InputAdornment>
                    ),
                  }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>도착공항</InputLabel>
                <Select
                  label="도착공항*"
                  required
                  value={arrive}
                  onChange={(e)=>setArrive(e.target.value)}
                  inputRef={arriveRef}
                >
                  {filterArriveCodeList.map((arrive) => (
                    <MenuItem key={arrive.acode} value={arrive.acode}>
                      {arrive.acode + '(' + arrive.name + ')'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          <Grid item xs={12}>
              <TextField
                  type='time'
                  required
                  fullWidth
                  label="도착시간"
                  autoFocus
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputRef={arriveTimeRef}
                  onChange={(e)=>setArriveTime(e.target.value)}
              />
          </Grid>
        </Grid>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" onClick={handleCloseReset} >
        취소
      </Button>
      <Button variant="outlined" type='button' onClick={handleAirPlaneReg} >
        등록
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default AirPlaneReg