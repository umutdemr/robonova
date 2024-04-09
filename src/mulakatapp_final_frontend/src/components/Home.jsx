import React from 'react';
import { Button, Typography } from '@mui/material';
import { useAuth } from "./use-auth-client";
import { styled } from '@mui/system';

const HomeContainer = styled('div')({
    fontFamily: 'Roboto',
    padding: '50px',
});

const HeroContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    padding: '50px',
});

const HeroContent = styled('div')({
    maxWidth: '500px',
});

const HeroImageContainer = styled('div')({
    flex: '-1',
});

const FeatureContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '50px',
});

const Feature = styled('div')({
    flex: '1',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        backgroundColor: '#cff0ff',
    },
});

function Home() {
    const { login, logout, isAuthenticated, principal } = useAuth();

    const randomImages = [
        'https://source.unsplash.com/random/800x600?software',
        'https://source.unsplash.com/random/800x601?web3',
        'https://source.unsplash.com/random/800x602?javascript',
        'https://source.unsplash.com/random/800x603?development',
    ];

    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

    return (
        <HomeContainer>
            <HeroContainer>
                <HeroContent>
                    <Typography variant="h1" component="h1" sx={{ fontSize: '3rem', color: '#333', marginBottom: '20px' }}>Teknoloji Dünyasına Yolculuk</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>Keşfedin, Öğrenin, Başarın! Yazılım dünyasının kapıları sizin için açık.</Typography>
                    {isAuthenticated ? (
                        <Button variant="contained" color="error" onClick={logout}>Log out</Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={login}>Log in</Button>
                    )}
                    {isAuthenticated && principal && (
                        <Typography variant="h2" className="user-message">You are authenticated as: {principal.toText()}</Typography>
                    )}
                </HeroContent>
                <HeroImageContainer>
                    <img src={randomImage} alt="Random" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }} />
                </HeroImageContainer>
            </HeroContainer>
            <FeatureContainer>
                <Feature>
                    <i className="fas fa-laptop-code fa-3x feature-icon" style={{ color: '#007bff', marginBottom: '20px' }}></i>
                    <Typography variant="h3" component="h3" sx={{ fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>Geniş Konu Yelpazesi</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#666' }}>Yazılım geliştirme, yapay zeka, veri bilimi ve daha fazlasını içeren çeşitli konularda quizler.</Typography>
                </Feature>
                <Feature>
                    <i className="fas fa-stopwatch fa-3x feature-icon" style={{ color: '#007bff', marginBottom: '20px' }}></i>
                    <Typography variant="h3" component="h3" sx={{ fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>Zamanlı Sorular</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#666' }}>Her soru için belirlenen zaman sınırları içinde doğru cevapları bulun.</Typography>
                </Feature>
                <Feature>
                    <i className="fas fa-chart-line fa-3x feature-icon" style={{ color: '#007bff', marginBottom: '20px' }}></i>
                    <Typography variant="h3" component="h3" sx={{ fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>İlerleme İzleme</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#666' }}>Quiz sonuçlarınızı görüntüleyin, istatistiklerinizi takip edin ve gelişiminizi izleyin.</Typography>
                </Feature>
            </FeatureContainer>
        </HomeContainer>
    );
}

export default Home;
