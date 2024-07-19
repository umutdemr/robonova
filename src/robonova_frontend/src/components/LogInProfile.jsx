import React, { useEffect, useState } from "react";
import { useAuth } from "./use-auth-client";
import { Box, Grid, Card, Stack, Button, Typography, Alert, Avatar } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)({
    paddingTop: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f5f5f5',
});

const CardContainer = styled(Card)({
    minHeight: '400px',
    borderRadius: '10px',
    padding: '40px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
});

const CenteredStack = styled(Stack)({
    padding: '20px',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Outfit, sans-serif',
});

const CustomAvatar = styled(Avatar)({
    width: 100,
    height: 100,
    borderRadius: '50px',
});

const LogoutButton = styled(Button)({
    borderColor: '#f44336',
    color: '#f44336',
    '&:hover': {
        backgroundColor: '#f44336',
        color: 'white',
    },
});

const StyledButton = styled(Button)({
    padding: "12px 24px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#6b46c1",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: 'Outfit, sans-serif',
    "&:hover": {
        backgroundColor: "#553c9a",
    },
    "&:focus": {
        outline: "none",
        backgroundColor: "#5e44a1",
    },
    "&:active": {
        transform: "translateY(1px)",
        backgroundColor: "#6b46c1",
    },
});

const LogInProfile = () => {
    const { isAuthenticated, whoamiActor, logout, principal, login } = useAuth();
    const [currentUser, setCurrentUser] = useState();
    const [result, setResult] = useState("");

    const defaultUser = "ROBOX";
    const defaultAvatar = "./image1.png";

    useEffect(() => {
        const getUser = async () => {
            if (whoamiActor && principal) {
                const user = await whoamiActor.getCurrentUser(principal);
                console.log("user returned backend", user);
                setCurrentUser(user[0]);
            }
        };

        const fetchUserData = async () => {
            if (whoamiActor) {
                const whoami = await whoamiActor.greet();
                setResult(whoami.toString());
            }
        };

        getUser();
        fetchUserData();
    }, [whoamiActor, principal]);

    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <CardContainer>
                        {isAuthenticated ? (
                            <CenteredStack>
                                <Box>
                                    <Typography variant="caption">ROBOT DEVELOPMENT ID: {principal?.toText()}</Typography>
                                    <Typography variant="caption">{result}</Typography>
                                </Box>
                                <CustomAvatar
                                    src={currentUser?.avatar ? currentUser?.avatar : defaultAvatar}
                                    alt="avatar"
                                />
                                <Typography variant="h6">Hi {currentUser?.name ? currentUser?.name : defaultUser}!</Typography>
                                <LogoutButton variant="outlined" onClick={logout}>
                                    Log Out
                                </LogoutButton>
                            </CenteredStack>
                        ) : (
                            <CenteredStack>
                                <Box>
                                    <Typography variant="h4" gutterBottom>
                                        Welcome!
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Get ready to explore the data world of robots with the Motoko language here.
                                    </Typography>
                                    <Alert severity="info" style={{ marginBottom: "20px" }}>
                                        To learn more about Motoko, please check out our lessons.
                                    </Alert>
                                </Box>
                                <StyledButton onClick={login}>
                                    Sign in via Internet Identity
                                </StyledButton>
                            </CenteredStack>
                        )}
                    </CardContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LogInProfile;
