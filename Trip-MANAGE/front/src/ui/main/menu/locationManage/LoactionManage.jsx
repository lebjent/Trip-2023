import { Box, Pagination, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import RegisterButton from '../../../../common/tag/RegisterButton';
import LocationReg from './dialog/LocationReg'; 
import axios from 'axios';
import * as formatDate from '../../../../js/formatDate';

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
                <StyledTableCell>도시명</StyledTableCell>
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

    const handleLocationDialogOpen = () =>{
      setIsOpen(true);
    }

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(1);
  
      useEffect(()=>{
        axios.get(`/tripManager/getLocationList/${page}`)
        .then(response => {
            if (response.status === 200) {
              console.log(response.data.content);
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
      },[page,isOpen]);

      const handlePageChange = (e,page) =>{
        setPage(page-1);
      }

  return (
    <div>
        <RegisterButton title={'여행지 등록'} onClick={handleLocationDialogOpen}/>
        <TableGrid data={data}/>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop:'20px' }}>
          <Pagination count={pageSize} onChange={handlePageChange} variant="outlined" shape="rounded" />
        </Box>
        <LocationReg isOpen={isOpen} handleClose={handleClose}/>
    </div>
  )
}

export default LoactionManage