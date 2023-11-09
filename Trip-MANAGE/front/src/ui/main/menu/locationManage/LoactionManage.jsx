import { Box, FormControl, Grid, InputLabel, MenuItem, Pagination, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RegisterButton from '../../../../common/tag/RegisterButton';
import * as formatDate from '../../../../js/formatDate';
import LocationReg from './dialog/LocationReg';

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
                <StyledTableCell>여행지역명</StyledTableCell>
                <StyledTableCell>공항코드</StyledTableCell>
                <StyledTableCell>국가명</StyledTableCell>
                <StyledTableCell>등록일</StyledTableCell>
                <StyledTableCell>등록자명</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {data.length > 0 ? data.map((item, index) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.acode}</TableCell>
                    <TableCell>{item.ccode.name}</TableCell>
                    <TableCell>{formatDate.formatFullDateTime(item.regTime)}</TableCell>
                    <TableCell>{item.createBy}</TableCell>
                </TableRow>
              )) : (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>여행지역이 없습니다.</TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

function LoactionManage() {

    /* 여행지 등록 dialog 관련 useState */
    const [isOpen,setIsOpen] = useState(false);
    const handleClose = () =>{
      setIsOpen(false);
    }
    //여행지 등록시 Dialog오픈
    const handleLocationDialogOpen = () =>{
      setIsOpen(true);
    }

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(1);
    
    /* 페이지 변경시 */
    const handlePageChange = (e,page) =>{
      setPage(page-1);
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
        axios.get(`/tripManager/getLocationList/${page}`,{
          params: {
              'sort': sort,
              'sortContent': sortContent
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
      },[page,isOpen,sort,sortContent]);



  return (
    <div>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <RegisterButton title={'여행지 등록'} onClick={handleLocationDialogOpen}/>
          </Grid>
          <Grid item xs={3}>
            <RegisterButton title={'여행지 등록'} onClick={handleLocationDialogOpen}/>
          </Grid>
          <Grid item xs={2}>
            <FormControl sx={{width:120}} size="small">
                <InputLabel>정렬내용</InputLabel>
                <Select
                  label="정렬내용"
                  required
                  value={sortContent}
                  onChange={handleSortContentChange}
                >
                  <MenuItem value={'NAME'}>여행지역명</MenuItem>
                  <MenuItem value={'ACODE'}>공항코드</MenuItem>
                  <MenuItem value={'CCODE'}>국가명</MenuItem>
                  <MenuItem value={'REGTIME'}>등록일</MenuItem>
                </Select>
            </FormControl>     
          </Grid>
          <Grid item xs={1}>
            <FormControl sx={{width:120}}  size="small">
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
        <TableGrid data={data}/>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop:'20px' }}>
          <Pagination count={pageSize} onChange={handlePageChange} variant="outlined" shape="rounded" />
        </Box>
        <LocationReg isOpen={isOpen} handleClose={handleClose}/>
    </div>
  )
}

export default LoactionManage