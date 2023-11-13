import { Button } from '@mui/material';
import Save from '@mui/icons-material/SaveAlt';
import Airplane from '@mui/icons-material/AirplanemodeActive';
import Location from '@mui/icons-material/AddLocationAlt';
import Airlines from '@mui/icons-material/AirlinesRounded';

import React from 'react'

function RegisterButton(props) {
  
    const {title,onClick,icon} = props;

    // 아이콘에 대응하는 컴포넌트 매핑
    const iconComponents = {
        save: <Save />,
        airplane: <Airplane />,
        location: <Location />,
        airline: <Airlines />
        // 추가적인 아이콘들을 여기에 계속 추가할 수 있습니다.
    };

    return (
        <Button variant="contained" onClick={onClick} endIcon={iconComponents[icon]}>
            {title}
        </Button>
    )
}

export default RegisterButton