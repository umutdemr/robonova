import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Typography, Button, Card, CardContent, CardActions, Avatar } from '@mui/material';
import sliderImage from '../../public/image1.png';
import randomImage1 from '../../public/image3.png';
import randomImage2 from '../../public/image4.png';
import randomImage3 from '../../public/image2.png';
import avatarImage from '../../public/image3.png';
import ınternetIdentityImage from '../../public/ınternetIdentity.jpg';
import { Link } from 'react-router-dom';

const PageContainer = styled('div')({
    backgroundColor: 'rgba(0, 5, 57, 1)',
    color: '#fff',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Outfit',
});

const ContentContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
    position: 'relative',
});

const Content = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '20px',
});

const ImageContainer = styled('div')({
    maxWidth: '50%',
    borderRadius: '12px',
    overflow: 'hidden',
});

const RandomImagesContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '50px',
    overflowX: 'auto',
});

const RandomImage = styled('img')({
    maxWidth: '20%',
    borderRadius: '12px',
    marginRight: '10px',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const CoursesContainer = styled('div')({
    marginTop: '50px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
});

const ButtonsContainer = styled('div')({
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
});

const CourseCard = styled(Card)({
    backgroundColor: 'rgba(0, 9, 100, 1)',
    color: '#fff',
    width: '100%',
    maxWidth: '1000px',
    height: '350px',
    display: 'flex',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    },
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
    fontSize: '25px',
    marginTop: '10px',
});

const StyledAvatar = styled(Avatar)({
    width: '60px',
    height: '60px',
    backgroundColor: 'white'
});

const StyledButton = styled(Button)({
    fontFamily: 'Outfit',
    textTransform: 'none',
});

const HoverTypography = styled(Typography)({
    '&:hover': {
        color: '#FFD700',
        transition: 'color 0.3s ease-in-out',
    },
});

const Footer = styled('div')({
    marginTop: 'auto',
    padding: '20px',
    backgroundColor: 'rgba(0, 5, 57, 1)',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Outfit',
});

const HomePage = () => {
    const [selectedCourse, setSelectedCourse] = useState('Beginner');
    const [selectedIdentityCourse, setSelectedIdentityCourse] = useState('Beginner'); 

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
    };

    const handleIdentityCourseSelection = (course) => {
        setSelectedIdentityCourse(course);
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        alert('This course is coming soon!');
      };

    const courseContent = {
        Advanced: [
        "Robo Nova Advanced Training is designed for experienced developers who are eager to deepen their understanding of the Motoko programming language. This advanced course takes place in the robot factory, where you'll learn to develop complex and powerful robots. The training covers a range of advanced topics, including data structures and algorithms that make robots faster and smarter, and parallel programming techniques that allow you to manage multiple robots simultaneously, enhancing efficiency. You'll also delve into the actor model for managing robots in distributed environments, and gain insight into Motoko's strong typing system, which helps make your code more secure and error-free. Additionally, you'll explore Distributed Ledger Technology (DLT) and how to operate large-scale applications securely on the Internet Computer platform.as performing performance and security optimizations, equipping you with the knowledge and skills needed to elevate your robot army to new heights",
        
        ],
        Beginner: "Robo Nova Beginner Training is the ideal starting point for those new to the Motoko language, guiding you from the basics to creating your own robots. This course begins with an introduction to the fundamental building blocks, including variables and data types, which are essential for managing data in your robots. You'll then learn how to control your robots' behavior using conditional statements and loops, followed by lessons on functions to simplify repetitive tasks and improve efficiency. The course also covers arrays and basic data structures, teaching you how to store and process information effectively within your robots. To reinforce your learning, each module includes simple projects that allow you to apply the concepts in real-world scenarios within the robot factory. By the end of this training, you'll be ready to build and program your own simple robots using Motoko, taking your first steps toward assembling a formidable robot army with Robo Nova's beginner course.",
    };

    const identityCourseContent = {
        Advanced: "Robo Nova Internet Identity Advanced Course is tailored for developers with a strong foundation in the Internet Computer platform who want to master identity management. This course delves into the advanced aspects of Internet Identity, providing you with the skills to implement sophisticated security measures for your robots and factory operations. You will begin by exploring the intricacies of Internet Identity, including its architecture and role in decentralized applications. The course covers the setup and configuration of secure, multi-factor identities and how to integrate them seamlessly with your existing systems. You’ll also learn about advanced access control mechanisms, privacy-preserving techniques, and strategies for managing large-scale identity systems. By the end of this course, you’ll be equipped to handle complex identity management tasks, ensuring your robots and factory are protected against unauthorized access and potential security threats on the Internet Computer platform.",
        Beginner: "Robo Nova Internet Identity Beginner Course is perfect for those new to the Internet Computer platform and looking to gain a solid understanding of identity management. This course introduces you to the basics of Internet Identity, explaining its importance in securing your robotic operations. You'll start by learning how to set up and configure Internet Identity for your robots, ensuring they have secure and reliable access. The course also covers the fundamentals of identity management, including how to create and manage identities for different users and roles within your robot factory. Additionally, you will learn basic security practices to protect your robots from unauthorized access. By the end of this course, you’ll have the foundational knowledge needed to implement and manage Internet Identity effectively, providing your robot factory with the security it needs to operate safely on the Internet Computer platform."
    };

    return (
        <PageContainer>
            <ContentContainer>
                <Content>
                    <VerticalTextContainer>
                        <HoverTypography variant="h3" sx={{ marginBottom: '90px', fontFamily: 'Outfit', fontWeight: '500' }}>
                            Featured
                        </HoverTypography>
                    </VerticalTextContainer>

                    <HoverTypography variant="h2" sx={{ marginBottom: '30px', fontFamily: 'Outfit', fontWeight: '500' }}>
                        Motoko Beginner to<br /> Intermediate Smart Contracts
                    </HoverTypography>
                </Content>
                <ImageContainer>
                    <img src={sliderImage} alt="Slider Image" style={{ width: '100%', borderRadius: '12px' }} />
                </ImageContainer>
            </ContentContainer>
            <RandomImagesContainer>
                <RandomImage src={randomImage1} alt="Random Image 1" />
                <RandomImage src={randomImage2} alt="Random Image 2" />
                <RandomImage src={randomImage3} alt="Random Image 3" />
            </RandomImagesContainer>
            <CoursesContainer>
                <Typography variant="h4" sx={{ fontFamily: 'Outfit', fontWeight: '500', marginBottom: '20px' }}>
                    Courses
                </Typography>
                <ButtonsContainer>
                    <StyledButton
                        variant={selectedCourse === 'Advanced' ? 'contained' : 'outlined'}
                        onClick={() => handleCourseSelection('Advanced')}
                        sx={{ backgroundColor: selectedCourse === 'Advanced' ? 'rgba(155, 50,204)' : 'transparent' }}
                    >
                        Advanced Motoko
                    </StyledButton>
                    <StyledButton
                        variant={selectedCourse === 'Beginner' ? 'contained' : 'outlined'}
                        onClick={() => handleCourseSelection('Beginner')}
                        sx={{ backgroundColor: selectedCourse === 'Beginner' ? 'rgba(155, 50,204)' : 'transparent' }}
                    >
                        Beginner Motoko
                    </StyledButton>
                </ButtonsContainer>
                <CourseCard>
                    <VerticalTextContainer>
                        <StyledAvatar>
                            <Avatar src={avatarImage} alt="Avatar" />
                        </StyledAvatar>
                        <VerticalText>MOTOKO</VerticalText>
                    </VerticalTextContainer>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: '700' }}>
                            Motoko: {selectedCourse === 'Advanced' ? 'Advanced' : 'Beginner'} Smart Contracts
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'Outfit', marginTop: '20px', fontWeight: '400' }}>
                            {courseContent[selectedCourse]}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Link to='/Beginner'>
                            <Button variant="contained" color="primary" sx={{ fontFamily: 'Outfit' }}>
                                Go to Course
                            </Button>
                        </Link>
                    </CardActions>
                </CourseCard>
                <ButtonsContainer>
                    <StyledButton
                        variant={selectedIdentityCourse === 'Advanced' ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => handleIdentityCourseSelection('Advanced')}
                        sx={{ backgroundColor: selectedIdentityCourse === 'Advanced' ? 'rgba(155, 50,204)' : 'transparent' }}
                    >
                        Advanced Internet Identity
                    </StyledButton>
                    <StyledButton
                        variant={selectedIdentityCourse === 'Beginner' ? 'contained' : 'outlined'}
                        color="secondary"
                        onClick={() => handleIdentityCourseSelection('Beginner')}
                        sx={{ backgroundColor: selectedIdentityCourse === 'Beginner' ? 'rgba(155, 50,204)' : 'transparent' }}
                    >
                        Beginner Internet Identity
                    </StyledButton>
                </ButtonsContainer>
                <CourseCard>
                    <VerticalTextContainer>
                        <StyledAvatar>
                            <Avatar src={ınternetIdentityImage} alt="Avatar" />
                        </StyledAvatar>
                        <VerticalText>INTERNET IDENTITY</VerticalText>
                    </VerticalTextContainer>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: '700' }}>
                            Internet Identity: {selectedIdentityCourse === 'Advanced' ? 'Advanced' : 'Beginner'} Course
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'Outfit', marginTop: '20px', fontWeight: '400' }}>
                            {Array.isArray(identityCourseContent[selectedIdentityCourse])
                                ? identityCourseContent[selectedIdentityCourse].map((content, index) => (
                                    <React.Fragment key={index}>
                                        <li>{content}</li>
                                        <br />
                                    </React.Fragment>
                                ))
                                : identityCourseContent[selectedIdentityCourse]}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                            <Button onClick={handleButtonClick} variant="contained" color="primary" sx={{ fontFamily: 'Outfit' }}>
                                Go to Course
                            </Button>
                    </CardActions>
                </CourseCard>
            </CoursesContainer>
            <Footer>
                <Typography variant="body2" sx={{ fontFamily: 'Outfit' }}>
                    &copy; 2024 RoboNova. All rights reserved.
                </Typography>
            </Footer>
        </PageContainer>
    );
};

export default HomePage;
