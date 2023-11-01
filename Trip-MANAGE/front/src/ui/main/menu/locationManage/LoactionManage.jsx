import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react'
import RegisterButton from '../../../../common/tag/RegisterButton';
import LocationReg from './dialog/LocationReg'; 


function TableGrid(props) {


    return (
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                <TableCell>INDEX</TableCell>
                <TableCell>도시명</TableCell>
                <TableCell>공항코드</TableCell>
                <TableCell>국가명</TableCell>
                <TableCell>등록일</TableCell>
                <TableCell>등록자명</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>ss</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

function LoactionManage() {

    /* 여행지 등록 dialog 관련 useState */
    const [isOpen,setIsOpen] = useState(true);
    const handleClose = () =>{
      setIsOpen(false);
    }

    const handleLocationDialogOpen = () =>{
      setIsOpen(true);
    }

  return (
    <div>
        <RegisterButton title={'여행지 등록'} onClick={handleLocationDialogOpen}/>
        <TableGrid/>
        <LocationReg isOpen={isOpen} handleClose={handleClose}/>
    </div>
  )
}

export default LoactionManage