import React, { useState } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const StyledButton = styled(Button)({
    padding: "12px 24px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#6b46c1",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",

    "&:hover": {
        backgroundColor: "#553c9a",
        boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.12)",
    },

    "&:focus": {
        outline: "none",
        backgroundColor: "#5e44a1",
        boxShadow: "0 8px 10px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.18)",
    },

    "&:active": {
        transform: "translateY(1px)",
        backgroundColor: "#6b46c1",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.12)",
    },
});



const ShadowButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div>

            <Typography variant="h4" gutterBottom>
                Welcome!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Get ready to explore the data world of robots with the Motoko language here.
            </Typography>
            <Alert severity="info" style={{ marginBottom: "20px" }}>
                To learn more about Motoko, please check out our lessons.
            </Alert>
            <StyledButton
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Sign in via Internet Identity
            </StyledButton>
        </div>
    );
};

export default ShadowButton;
