// AlertMessage.js
import React from 'react';
import Alert from '@mui/material/Alert';

const AlertMessage = ({ alertMessage, alertSeverity }) => (
    alertMessage && (
        <Alert severity={alertSeverity} sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', marginBottom: '60px', zIndex: 1001 }}>
            {alertMessage}
        </Alert>
    )
);

export default AlertMessage;
