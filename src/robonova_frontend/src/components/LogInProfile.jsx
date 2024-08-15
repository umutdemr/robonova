import React, { useEffect, useState } from "react";
import { useAuth } from "./use-auth-client";
import { Box, Grid, Card, Stack, Button, Typography, Alert, Avatar } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import robotImage from '../../public/m2.jpg';

const Container = styled(Box)({
    paddingTop: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#1E1E2D',
});

const CardContainer = styled(Card)({
    minHeight: '450px',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    background: '#2A2A3C',
    color: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
});

const CenteredStack = styled(Stack)({
    padding: '20px',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Outfit, sans-serif',
    position: 'relative',
    zIndex: 1,
    fontWeight: 'bold'
});

const CustomAvatar = styled(Avatar)({
    width: 120,
    height: 120,
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)',
    },
});

const RobotImageContainer = styled(Box)({
    position: 'absolute',
    top: '0',
    right: '0',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${robotImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
    zIndex: 0,
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
    backgroundColor: "#A301E3",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: 'Outfit, sans-serif',
    "&:hover": {
        backgroundColor: "#8B01B3",
    },
    "&:focus": {
        outline: "none",
        backgroundColor: "#9900CC",
    },
    "&:active": {
        transform: "translateY(1px)",
        backgroundColor: "#A301E3",
    },
});

const LogInProfile = () => {
    const { isAuthenticated, whoamiActor, logout, principal, login } = useAuth();
    const [currentUser, setCurrentUser] = useState();
    const [result, setResult] = useState("");
    const [currentLesson, setCurrentLesson] = useState(null);

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

        const lessonProgress = localStorage.getItem('currentLesson');
        setCurrentLesson(lessonProgress);

        getUser();
        fetchUserData();
    }, [whoamiActor, principal]);

    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <CardContainer>
                        <RobotImageContainer />
                        {isAuthenticated ? (
                            <CenteredStack>
                                <Box>
                                    <Typography variant="caption">ROBOT DEVELOPMENT ID: {principal?.toText()}</Typography>

                                </Box>
                                <Box>
                                    <Typography variant="caption">{result}</Typography>
                                    <Typography variant="caption">
                                        {currentLesson !== null ? `Your Progress Status: ${currentLesson}` : "Progress status not available"}
                                    </Typography>
                                </Box>
                                <CustomAvatar
                                    src={currentUser?.avatar ? currentUser?.avatar : defaultAvatar}
                                    alt="avatar"
                                />
                                <Typography variant="h6">Hello {currentUser?.name ? currentUser?.name : defaultUser}!</Typography>
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
                                        Prepare to explore the world of data with robots in Motoko language.
                                    </Typography>
                                    <Alert severity="info" style={{ marginBottom: "20px" }}>
                                        Check out our lessons to learn more about Motoko.
                                    </Alert>
                                </Box>
                                <StyledButton onClick={login}>
                                    Log in with Internet Identity
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
