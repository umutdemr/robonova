import React from 'react';
import { Alert, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPrompt = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/LogInProfile');
    };

    return (
        <Box sx={{ padding: '20px', textAlign: 'left', paddingTop: '120px' }}>
            <Alert severity="warning" sx={{ marginBottom: '20px' }}>
                There is no access without login.
            </Alert>
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Go to Login Page
            </Button>
        </Box>
    );
};

export default LoginPrompt;
