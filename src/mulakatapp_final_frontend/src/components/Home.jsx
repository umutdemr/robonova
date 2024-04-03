import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.scss';
import { useAuth } from "./use-auth-client";


function Home() {
    const { login, logout, isAuthenticated ,principal} = useAuth();

  // Rastgele resimler için bir dizi oluşturalım
  const randomImages = [
    'https://source.unsplash.com/random/800x600?software',
    'https://source.unsplash.com/random/800x601?web3',
    'https://source.unsplash.com/random/800x602?javascript',
    'https://source.unsplash.com/random/800x603?development',
  ];

  // Rastgele bir resim seçelim
  const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Teknoloji Dünyasına Yolculuk</h1>
          <p className="hero-text">Keşfedin, Öğrenin, Başarın! Yazılım dünyasının kapıları sizin için açık.</p>
          {isAuthenticated ? (
            <button className='cta-button-logout' onClick={logout}>Log out</button>
          ) : (
            <button className='cta-button' onClick={login}>Log in</button>
          )}
           {isAuthenticated && principal && (
            <h2 className="user-message">You are authenticated as: {principal.toText()}</h2>
          )}        </div>
        <div className="hero-image">
          <img src={randomImage} alt="Random" className="random-image" />
        </div>
      </div>
      <div className="features">
        <div className="feature">
          <i className="fas fa-laptop-code fa-3x feature-icon"></i>
          <h3 className="feature-title">Geniş Konu Yelpazesi</h3>
          <p className="feature-text">Yazılım geliştirme, yapay zeka, veri bilimi ve daha fazlasını içeren çeşitli konularda quizler.</p>
        </div>
        <div className="feature">
          <i className="fas fa-stopwatch fa-3x feature-icon"></i>
          <h3 className="feature-title">Zamanlı Sorular</h3>
          <p className="feature-text">Her soru için belirlenen zaman sınırları içinde doğru cevapları bulun.</p>
        </div>
        <div className="feature">
          <i className="fas fa-chart-line fa-3x feature-icon"></i>
          <h3 className="feature-title">İlerleme İzleme</h3>
          <p className="feature-text">Quiz sonuçlarınızı görüntüleyin, istatistiklerinizi takip edin ve gelişiminizi izleyin.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
