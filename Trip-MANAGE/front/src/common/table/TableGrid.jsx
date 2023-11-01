import { Table, TableCell, TableContainer, TableHead, TableRow,Paper, TableBody } from '@mui/material'
import React from 'react'

function TableGrid(props) {
    const header = ['도시명', '도시코드', '등록일', '등록자명'];
  
    const rows = [
      // 여기에 데이터 배열을 추가하세요
      { 도시명: '서울', 도시코드: '001', 등록일: '2023-11-01', 등록자명: 'John' },
      { 도시명: '뉴욕', 도시코드: '002', 등록일: '2023-11-02', 등록자명: 'Alice' },
      // 더 많은 데이터를 추가할 수 있습니다.
    ];
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {header.map((item, index) => (
                <TableCell key={index}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {header.map((item, index) => (
                  <TableCell key={index}>{row[item]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  export default TableGrid;