import React from 'react';
import Button from '@mui/material/Button';

// Define a custom button that extends all functionalities from MUI Button
const NButtonPrimary = (props) => {

    return (
        <Button
            color='primary'
            variant='contained'
            {...props} // Spread all received props to the MUI Button
            sx={{
                pt: 1,
                pb: 1.2,
                ...props.sx,
            }} // Apply custom styles and allow overriding via props
        >
            {props.children}
        </Button>
    );
};

export default NButtonPrimary;
