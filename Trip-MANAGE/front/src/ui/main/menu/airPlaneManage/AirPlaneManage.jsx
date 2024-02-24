import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, tableCellClasses } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RegisterButton from '../../../../common/tag/RegisterButton';
import AirPlaneReg from './dialog/AirPlaneReg';
import { styled } from '@mui/material/styles';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'XSRF-TOKEN'; // Spring Boot에서 기본 설정된 이름을 사용
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#61d4ca',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TableGrid(props) {

    const {data} = props;

    return (
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table stickyHeader  sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                <StyledTableCell>INDEX</StyledTableCell>
                <StyledTableCell>항공편명</StyledTableCell>
                <StyledTableCell>출발공항</StyledTableCell>
                <StyledTableCell>도착공항</StyledTableCell>
                <StyledTableCell>출발시간</StyledTableCell>
                <StyledTableCell>도착시간</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {data.length > 0 ? data.map((item, index) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.departure.acode+'('+ item.departure.name +')'}</TableCell>
                <TableCell>{item.arrive.acode+'('+ item.arrive.name +')'}</TableCell>
                <TableCell>{item.departureTime}</TableCell>
                <TableCell>{item.arriveTime}</TableCell>
            </TableRow>
              )) : (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', fontWeight: 'bold' }}>등록된 항공편이 없습니다.</TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

function AirPlaneManage() {
  
  /* 테이블리스트 데이터 */
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(1);

  /* 항공편 등록 Dialog */
  const [isOpenAirPlaneReg,setIsOpenAirPlaneReg] = useState(false);
  const handleCloseAirPlaneReg = (e) => {
    setIsOpenAirPlaneReg(false);
  }

  const handleOpenAirPlaneReg = (e)=>{
    setIsOpenAirPlaneReg(true);
  }
  
  /* 페이지 변경시 */
  const handlePageChange = (e,page) =>{
    setPage(page-1);
  }
  
  //항공편명 검색
  const [keyword,setKeyword] = useState('');

  const handleKeywordChange = (e) =>{
    setKeyword(e.target.value);
  }

  //정렬조건
  const [sort,setSort] = useState('');
  const [sortContent,setSortContent] = useState('');
  
  const handleSortContentChange = (e) =>{
    setSortContent(e.target.value);
  }

  const handleSortChange = (e) =>{
    setSort(e.target.value);
  }

  useEffect(()=>{
    axios.get(`/tripManager/LEVEL1/getAirPlaneList/${page}`,{
      params: {
        'sort': sort,
        'sortContent': sortContent,
        'keyword': keyword
      }
  })
    .then(response => {
        if (response.status === 200) {
          setData(response.data.content);
          if (response.data.totalPages === 0) {
              setPageSize(1);
          } else {
              setPageSize(response.data.totalPages);
          }
        }
    })
    .catch(error => {
        alert(error);
    });
  },[page,isOpenAirPlaneReg,keyword,sort,sortContent]);

  return (
    <div>
      <Typography variant="h5" sx={{marginBottom:4, color:'#7a7672'}} gutterBottom>
        항공편관리
      </Typography>
      <Grid container spacing={2}>
          <Grid item xs={5}>
            <Grid container spacing={0}>
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
              onChange={handleKeywordChange}
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
                  value={sortContent}
                  onChange={handleSortContentChange}
                >
                  <MenuItem value={'NAME'}>항공편명</MenuItem>
                  <MenuItem value={'DECODE'}>출발공항 코드명</MenuItem>
                  <MenuItem value={'ARCODE'}>도착공항 코드명</MenuItem>
                </Select>
            </FormControl>     
          </Grid>
          <Grid item xs={3} sm={2}>
            <FormControl fullWidth  size="small">
                <InputLabel>정렬방법</InputLabel>
                <Select
                  label="정렬방법"
                  required
                  value={sort}
                  onChange={handleSortChange}
                >
                  <MenuItem value={'ASC'}>오름차순</MenuItem>
                  <MenuItem value={'DESC'}>내림차순</MenuItem>
                </Select>
            </FormControl>     
          </Grid>
        </Grid>
        <TableGrid data={data} />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop:'20px' }}>
          <Pagination count={pageSize} onChange={handlePageChange} variant="outlined" shape="rounded" />
        </Box>
        <AirPlaneReg isOpen={isOpenAirPlaneReg} handleClose={handleCloseAirPlaneReg} />
    </div>
  )
}

export default AirPlaneManage