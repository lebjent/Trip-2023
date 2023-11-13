import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import React from 'react'

function AirPlaneReg(props) {
   
  const {isOpen,handleClose} = props;
    
  return (
    <Dialog open={isOpen} onClose={handleClose}>
    <DialogTitle>항공편 등록</DialogTitle>
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
              />
          </Grid>
          <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  label="항공사코드"
                  autoFocus
                  size="small"
              />
          </Grid>
        </Grid>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" >
        취소
      </Button>
      <Button variant="outlined" type='button' >
        등록
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default AirPlaneReg