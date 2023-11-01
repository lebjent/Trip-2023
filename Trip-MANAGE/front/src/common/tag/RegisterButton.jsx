import { Button } from '@mui/material';
import Save from '@mui/icons-material/SaveAlt';
import React from 'react'

function RegisterButton(props) {
  
    const {title,onClick} = props;
    return (
        <Button variant="contained" onClick={onClick} endIcon={<Save />}>
            {title}
        </Button>
    )
}

export default RegisterButton