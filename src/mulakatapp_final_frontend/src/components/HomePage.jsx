import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Typography, Button, Card, CardContent, CardActions, Avatar } from '@mui/material';
import sliderImage from '../../public/image1.png';
import randomImage1 from '../../public/image3.png';
import randomImage2 from '../../public/image4.png';
import randomImage3 from '../../public/image2.png';
import avatarImage from '../../public/image3.png'; // Avatar resmini buraya ekleyin
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
});

const Content = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '20px',
    marginRight: 'auto',
});

const ImageContainer = styled('div')({
    maxWidth: '50%',
    marginLeft: 'auto',
    marginRight: '-30px',
    borderRadius: '12px',
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
});

const CoursesContainer = styled('div')({
    marginTop: '50px',
    alignSelf: 'flex-start',
});

const ButtonsContainer = styled('div')({
    display: 'flex',
    marginTop: '20px',
});

const CourseCard = styled(Card)({
    backgroundColor: 'rgba(0, 9, 100, 1)',
    color: '#fff',
    marginTop: '20px',
    width: '1000px',
    height: '350px',
    display: 'flex',
    alignSelf: 'center',
    borderRadius: '12px',
    padding: '20px',
    position: 'relative',
});

const VerticalTextContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
    background: 'linear-gradient(0deg, rgba(0, 5, 57, 1) 0%, rgba(0, 14, 159, 1) 100%)', // Linear gradient background
    borderRadius: '12px', // Border radius
    padding: '10px', // İç boşluk
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
});

const HomePage = () => {
    const [selectedCourse, setSelectedCourse] = useState('Beginner'); // Başlangıçta "Beginner" seçili

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
    };

    const courseContent = {
        Advanced: "This is an advanced course content.",
        Beginner: "This course is designed for those who are new to Motoko programming. Learn the basics and get started on your journey to becoming an intermediate developer.",
    };

    return (
        <PageContainer>
            <ContentContainer>
                <Content>
                    <VerticalTextContainer>
                        <Typography variant="h3" sx={{ marginBottom: '90px', fontFamily: 'Outfit', fontWeight: '500' }}>
                            Featured
                        </Typography>
                    </VerticalTextContainer>

                    <Typography variant="h2" sx={{ marginBottom: '30px', fontFamily: 'Outfit', fontWeight: '500' }}>
                        Motoko Beginner to<br /> Intermediate Smart Contracts
                    </Typography>
                </Content>
                <ImageContainer>
                    <img src={sliderImage} alt="Slider Image" />
                </ImageContainer>
            </ContentContainer>
            <RandomImagesContainer>
                <RandomImage src={randomImage1} alt="Random Image 1" />
                <RandomImage src={randomImage2} alt="Random Image 2" />
                <RandomImage src={randomImage3} alt="Random Image 3" />
            </RandomImagesContainer>
            <CoursesContainer>
                <Typography variant="h4" sx={{ fontFamily: 'Outfit', fontWeight: '500', marginBottom: '10px' }}>
                    Courses
                </Typography>
                <ButtonsContainer>
                    <StyledButton
                        variant={selectedCourse === 'Advanced'}
                        color="primary"
                        onClick={() => handleCourseSelection('Advanced')}
                        sx={{ backgroundColor: selectedCourse === 'Advanced' ? 'rgba(222, 58, 0, 1)' : 'transparent' }}
                    >
                        Advanced
                    </StyledButton>
                    <StyledButton
                        variant={selectedCourse === 'Beginner'}
                        color="secondary"
                        onClick={() => handleCourseSelection('Beginner')}
                        sx={{ backgroundColor: selectedCourse === 'Beginner' ? 'rgba(222, 58, 0, 1)' : 'transparent' }}
                    >
                        Beginner
                    </StyledButton>
                </ButtonsContainer>
                {selectedCourse && (
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
                            <Typography variant="h5" sx={{ fontFamily: 'Outfit', marginTop: '20px', fontWeight: '700' }}>
                                Motoko
                            </Typography>
                            <Typography variant="body1" sx={{ fontFamily: 'Outfit', marginTop: '20px', fontWeight: '400' }}>
                                {courseContent[selectedCourse]}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Link to='/Beginner'>
                                <Button size="small" color="primary" variant="contained">
                                    Start Now
                                </Button>
                            </Link>

                        </CardActions>
                    </CourseCard>
                )}
            </CoursesContainer>
        </PageContainer>
    );
};


export default HomePage;
