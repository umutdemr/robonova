import React from 'react'
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import LoggedIn from "../components/LoggedIn";
import LoggedOut from '../components/LoggedOut';
import { Box, Button, Typography } from '@mui/material';
import { useAuth, AuthProvider } from "../components/use-auth-client";

export const Login = () => {
    const { isAuthenticated, principal } = useAuth()

    return (
        <Box sx={{ paddingTop: '100px' }}>
            <Grid>
                <Grid>
                    <Card
                        sx={{
                            minHeight: 200,
                            maxHeight: 200,
                            borderRadius: "10px",
                        }}
                    >
                        {isAuthenticated ? (
                            <LoggedIn />
                        ) : (
                            <LoggedOut />
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login;