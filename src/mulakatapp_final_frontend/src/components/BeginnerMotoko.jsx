import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Typography, Button, Card, CardContent, Avatar, List, ListItem, ListItemIcon, ListItemText, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import avatarImage from '../../public/image3.png'; // Avatar resmini buraya ekleyin
import robotGif from '../../public/robot.gif';
import { Link } from 'react-router-dom';

const PageContainer = styled('div')({
    backgroundColor: 'rgba(0, 5, 57, 1)',
    color: '#fff',
    minHeight: '100vh',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Outfit',
    paddingTop: '80px'
});

const HeaderContainer = styled('div')({
    width: '100%',
    textAlign: 'left',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '30px'
});

const HeaderTitle = styled(Typography)({
    fontFamily: 'Outfit',
    fontWeight: '500',
    marginBottom: '10px',
});

const HeaderSubTitle = styled('div')({
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Outfit',
});

const SubTitleItem = styled(Typography)({
    fontSize: '16px',
    marginRight: '20px',
    fontFamily: 'Outfit',
});

const ContentContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
    paddingLeft: '20px',
    paddingRight: '20px',
});

const Content = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '20px',
    marginRight: 'auto',
});

const BeginnerStart = styled(Card)({
    backgroundColor: 'rgba(0, 9, 100, 1)',
    color: '#fff',
    marginTop: '20px',
    width: '900px',
    display: 'flex',
    alignSelf: 'center',
    borderRadius: '12px',
    padding: '20px',
    position: 'relative',
    paddingLeft: '20px',
    paddingRight: '20px',
});

const VerticalTextContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
    background: 'linear-gradient(0deg, rgba(0, 5, 57, 1) 0%, rgba(0, 14, 159, 1) 100%)',
    borderRadius: '12px',
    padding: '10px',
});

const VerticalText = styled(Typography)({
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    fontFamily: 'Outfit',
    fontWeight: 'bold',
    fontSize: '40px',
    marginTop: '10px',
});

const StyledAvatar = styled(Avatar)({
    width: '50px',
    height: '50px',
});

const StyledButton = styled(Button)({
    fontFamily: 'Outfit',
    color: 'rgba(222, 58, 0, 1)',
});

const CourseContentTitle = styled(Typography)({
    fontFamily: 'Outfit',
    fontWeight: '500',
    marginTop: '50px',
    marginBottom: '20px',
    fontSize: '24px',
    alignSelf: 'flex-start',
    paddingLeft: '20px',
});

const StyledAccordion = styled(Accordion)({
    backgroundColor: 'rgba(0, 9, 100, 1)',
    color: '#fff',
    width: '100%',
    marginBottom: '10px',
    borderRadius: '12px',
});

const StyledRobotGif = styled('img')({
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%)',
});

const BeginnerMotoko = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
    };

    const courseContent = {
        Advanced: "This is an advanced course content.",
        Beginner: [
            "Introduction to Motoko",
            "Basic Syntax and Data Types",
            "Functions and Control Structures",
            "Modules and Imports",
            "Interacting with the Internet Computer",
            "Debugging and Testing",
            "Deploying Smart Contracts",
        ],
    };

    return (
        <PageContainer>
            <HeaderContainer>
                <HeaderTitle variant="h3">
                    Motoko: Beginner to Intermediate Smart Contracts
                </HeaderTitle>
                <HeaderSubTitle>
                    <SubTitleItem>* Motoko</SubTitleItem>
                    <SubTitleItem>* Beginner</SubTitleItem>
                    <SubTitleItem>* Intermediate</SubTitleItem>
                </HeaderSubTitle>
                <Typography variant="body1" sx={{ fontFamily: 'Outfit', fontWeight: '400', marginTop: '10px' }}>
                    Get up to speed with the basics of Motoko.
                </Typography>
            </HeaderContainer>
            <ContentContainer>
                <BeginnerStart>
                    <StyledRobotGif src={robotGif} alt="Robot GIF" />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <List>
                                    {courseContent.Beginner.slice(0, 3).map((item, index) => (
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <CheckCircleIcon sx={{ color: 'rgba(222, 58, 0, 1)' }} />
                                            </ListItemIcon>
                                            <ListItemText primary={item} sx={{ fontFamily: 'Outfit', color: '#fff' }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                            <Grid item xs={6}>
                                <List>
                                    {courseContent.Beginner.slice(3, 6).map((item, index) => (
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <CheckCircleIcon sx={{ color: 'rgba(222, 58, 0, 1)' }} />
                                            </ListItemIcon>
                                            <ListItemText primary={item} sx={{ fontFamily: 'Outfit', color: '#fff' }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid>
                    </CardContent>
                </BeginnerStart>
            </ContentContainer>
            <CourseContentTitle variant="h4">Course Content</CourseContentTitle>
            <StyledAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Introduction</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                        In this course, we will build a “Robot Factory” using the Motoko language and create an army of robots. In each lesson we will learn the basics of Motoko while at the same time creating a functional robot army. At the end of this project, we will have built a system that can create robots, store their information and perform various functions.
                    </Typography>
                    <Link to='/Lesson1'>
                        <Button size="small" color="primary" variant="contained" sx={{ marginTop: '10px' }}>
                            Start Now
                        </Button>
                    </Link>
                </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography sx={{ fontWeight: 'bold' }}>First Step into Motoko's Magical World</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                        On your first day at the Robot Factory, you dive into the magical world of the Motoko language. You learn why Motoko is the language of choice, its strengths and how to use it to build an army of robots. It's not just a language, it's the key to becoming a robot master.
                    </Typography>
                    <Link to='/Lesson2'>
                        <Button size="small" color="primary" variant="contained" sx={{ marginTop: '10px' }}>
                            Start Now
                        </Button>
                    </Link>
                </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography sx={{ fontWeight: 'bold' }}>DNA of our robots - Data Types and Variables</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                        In the world of our robots, data is the most basic building block. While learning data types such as Text, Nat, Int, Bool and how to work with these types, you also open a window into the inner world of robots. Variables are the areas where robots store their current status and information.
                    </Typography>
                    <Link to='/Lesson3'>
                        <Button size="small" color="primary" variant="contained" sx={{ marginTop: '10px' }}>
                            Start Now
                        </Button>
                    </Link>
                </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Robot Brains - Functions and Flow Control</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                        Functions, the brains of robots, are the key to teaching them how to behave. Defining, calling and flow controlling functions will enable our robot army to make the right decisions. If-Else statements, loops and switch structures take us on a journey through the complex world of robots.
                    </Typography>
                    <Link to='/Lesson4'>
                        <Button size="small" color="primary" variant="contained" sx={{ marginTop: '10px' }}>
                            Start Now
                        </Button>
                    </Link>
                </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Robot Mathematicians - Numerical Operations and Primitive Structures</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                        Mathematical operations are key to developing robots' thinking and computational capabilities. Primitive structures are the basis for robots' memory management and data processing capabilities. Our robots will now be friends with numbers!
                    </Typography>
                    <Link to='/Lesson5'>
                        <Button size="small" color="primary" variant="contained" sx={{ marginTop: '10px' }}>
                            Start Now
                        </Button>
                    </Link>
                </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6a-content" id="panel6a-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Strategic Intelligence of Robots - Options and Arrays</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                        Our robots' decision-making abilities are further developed with Options and Arrays. By providing options, we learn how robots react to different scenarios. We also make our robot army more organized with data collections.
                    </Typography>
                    <Link to='/Lesson6'>
                        <Button size="small" color="primary" variant="contained" sx={{ marginTop: '10px' }}>
                            Start Now
                        </Button>
                    </Link>
                </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel7a-content" id="panel7a-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Robot IDs - Records, Objects and Classes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                        We dive into Records, Objects and Classes to define the unique personalities and characteristics of our robots. Each robot will have a unique identity and function. Now our robots will act like real individuals.
                    </Typography>
                    <Link to='/Lesson7'>
                        <Button size="small" color="primary" variant="contained" sx={{ marginTop: '10px' }}>
                            Start Now
                        </Button>
                    </Link>
                </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel8a-content" id="panel8a-header">
                    <Typography sx={{ fontWeight: 'bold' }}>Unity of the Robot Army - Packs, Modules and Actors</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                        We are introduced to Packs, Modules and Actors to coordinate our robot army. How robots will communicate and exchange information with each other is an important step. Our robots will now act as a team!
                    </Typography>
                    <Link to='/Lesson8'>
                        <Button size="small" color="primary" variant="contained" sx={{ marginTop: '10px' }}>
                            Start Now
                        </Button>
                    </Link>
                </AccordionDetails>
            </StyledAccordion>
        </PageContainer>
    );
};

export default BeginnerMotoko;
