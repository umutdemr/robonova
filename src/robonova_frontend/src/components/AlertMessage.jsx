import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/system';

const CustomAlert = styled(Alert)(({ theme, severity }) => ({
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    maxWidth: '400px',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: `0 4px 8px rgba(0, 0, 0, 0.3)`,
    zIndex: 1001,
    '& .MuiAlert-icon': {
        marginRight: '16px',
    },
    ...(severity === 'error' && {
        backgroundColor: '#ffebee',
        color: '#d32f2f',
        '& .MuiAlert-icon': {
            color: '#d32f2f',
        },
    }),
    ...(severity === 'warning' && {
        backgroundColor: '#fff3e0',
        color: '#ff9800',
        '& .MuiAlert-icon': {
            color: '#ff9800',
        },
    }),
    ...(severity === 'info' && {
        backgroundColor: '#e3f2fd',
        color: '#0288d1',
        '& .MuiAlert-icon': {
            color: '#0288d1',
        },
    }),
    ...(severity === 'success' && {
        backgroundColor: '#e8f5e9',
        color: '#388e3c',
        '& .MuiAlert-icon': {
            color: '#388e3c',
        },
    }),
}));

const AlertMessage = ({ alertMessage, alertSeverity, autoCloseDuration = 3000 }) => {
    const [visible, setVisible] = useState(Boolean(alertMessage));

    useEffect(() => {
        if (alertMessage) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, autoCloseDuration);
            return () => clearTimeout(timer);
        }
    }, [alertMessage, autoCloseDuration]);

    return (
        visible && (
            <CustomAlert severity={alertSeverity} onClose={() => setVisible(false)} iconMapping={{
                success: <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#388e3c" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.7 14.29l-4.4-4.4 1.4-1.4 3 3 7.6-7.6 1.4 1.4-9 9z" /></svg>,
                error: <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#d32f2f" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v7h-2zm0 4h2v2h-2z" /></svg>,
                warning: <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#ff9800" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v7h-2zm0 4h2v2h-2z" /></svg>,
                info: <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#0288d1" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v7h-2zm0 4h2v2h-2z" /></svg>,
            }}>
                {alertMessage}
            </CustomAlert>
        )
    );
};

export default AlertMessage;
