import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Modal, keyframes } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './use-auth-client';
import { useState } from 'react';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const StyledButton = ({ imageSrc, text, locked, onClick }) => (
  <Box
    sx={{
      width: '80px',
      height: '60px',
      backgroundColor: locked ? '#888' : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      margin: '0 5px',
      cursor: locked ? 'not-allowed' : 'pointer',
      opacity: locked ? 0.5 : 1,
      position: 'relative',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      '&:hover': {
        backgroundColor: locked ? '#888' : 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
        transform: 'scale(1.05)',
      },
      pointerEvents: locked ? 'none' : 'auto',
    }}
    onClick={onClick}
  >
    <img src={imageSrc} alt={text} style={{ width: '60px', height: '60px', opacity: locked ? 0.7 : 1 }} />
    <Typography sx={{ color: '#fff', fontSize: '12px', fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>
      {text}
    </Typography>
    {locked && (
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '30px',
          height: '30px',
          backgroundColor: 'red',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '10px',
        }}
      >
        <Typography>🔒</Typography>
      </Box>
    )}
  </Box>
);

// Menü açılma animasyonu
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Robot modeli için animasyon
const robotSlideIn = keyframes`
  from {
    transform: translateX(-150%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const codeBlockStyle = {
  backgroundColor: '#1e1e1e',
  color: '#dcdcdc',
  padding: '20px',
  borderRadius: '10px',
  fontFamily: 'monospace',
  fontSize: '14px',
  overflowX: 'auto',
  maxHeight: '400px',
  boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
};

function NavBarComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [openModal, setOpenModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');
  const [modalImageSrc, setModalImageSrc] = React.useState('/MenuImage/menu1.png'); // Varsayılan resim
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleButtonClick = (lessonIndex) => {
    setModalContent(buttonContents[lessonIndex].content);
    setModalImageSrc(`/MenuImage/menu${lessonIndex + 1}.png`); // Resmi index'e göre ayarla
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getLessonIndexFromPath = (path) => {
    switch (path) {
      case '/Lesson1':
        return 0;
      case '/Lesson2':
        return 1;
      case '/Lesson3':
        return 2;
      case '/Lesson4':
        return 3;
      case '/Lesson5':
        return 4;
      case '/Lesson6':
        return 5;
      case '/Lesson7':
        return 6;
      default:
        return -1;
    }
  };

  const buttonContents = [
    {
      title: 'Actor Kod Yapısı',
      content: `import Buffer "mo:base/Buffer";

  actor Library {

  let books = Buffer.Buffer<Text>(0);

  public func addBook(book : Text) : async () {
    books.add(book);
  };

  public query func listBooks() : async [Text] {
    Buffer.toArray(books);
  }

};`
    },
    {
      title: 'Functıon Yapısı',
      content: `import D "mo:base/Debug";

func ping() : async Text {
  D.print("handle ping");
  "pong";
};

let future = ping();

// note that ping() function is executed only once
let res1 = await future;
let res2 = await future;
D.print("res1: " # res1 # ", res2: " # res2);
      `
    },
    {
      title: 'Data Type Yapısı',
      content: `// Options ile ilgili içerik burada yer alacak.`
    },
    {
      title: 'Options Yapısı',
      content: `// Options ile ilgili içerik burada yer alacak.`
    },
    {
      title: 'Arrays Yapısı',
      content: `// Arrays ile ilgili içerik burada yer alacak.`
    },
    {
      title: 'Objects Yapısı',
      content: `// Objects ile ilgili içerik burada yer alacak.`
    },
    {
      title: 'Modules Yapısı',
      content: `// Modules ile ilgili içerik burada yer alacak.`
    }
  ];

  const currentLessonIndex = getLessonIndexFromPath(location.pathname);
  const isLessonPage = location.pathname.startsWith('/Lesson');

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0, 5, 57, 1)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src="/image3.png" style={{ width: '100px', height: '100px' }} alt="logo" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              RoboNova
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {['Home', 'Beginner', 'Notes'].map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link style={{ textDecoration: 'none', color: 'rgba(17,13,22,255)' }} to={`/${page}`}>
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {['Home', 'Beginner', 'Notes'].map((page) => (
                <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: location.pathname === `/${page}` ? '#7F7FFF' : 'white', display: 'block', fontFamily: 'Outfit' }}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/${page}`}>
                    {page}
                  </Link>
                </Button>
              ))}
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: location.pathname === `/LogInProfile` ? '#7F7FFF' : 'white', display: 'block', fontFamily: 'Outfit' }}>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/LogInProfile">
                  {isAuthenticated ? 'Profile' : 'Login'}
                </Link>
              </Button>
            </Box>

            {isLessonPage && (
              <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box sx={{ backgroundColor: '#000539', padding: '20px', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                  <Button
                    onClick={() => setMenuOpen(!menuOpen)}
                    sx={{
                      color: 'white',
                      backgroundColor: '#000539',
                      borderRadius: '20px',
                      padding: '5px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    {menuOpen ? <ArrowCircleRightIcon /> : <ArrowCircleLeftRoundedIcon />}
                    <Typography variant="button" sx={{ ml: 0 }}>
                      Help Robots
                    </Typography>
                  </Button>
                </Box>

                {menuOpen && (
                  <Box
                    sx={{
                      display: 'flex',
                      backgroundColor: '#000539',
                      borderRadius: '20px',
                      padding: '0px',
                      position: 'absolute',
                      top: '0px',
                      right: '155px',
                      animation: `${slideIn} 0.5s ease-in-out`,
                    }}
                  >
                    {['ACTOR', 'FUNCTIONS', 'DATA TYPE', 'OPTIONS', 'ARRAYS', 'OBJECTS', 'MODULES'].map((text, index) => (
                      <StyledButton key={text} imageSrc={`/MenuImage/menu${index + 1}.png`} text={text} locked={index > currentLessonIndex} onClick={() => handleButtonClick(index)} />
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Modal içeriği */}
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'rgba(0, 30, 60, 0.9)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            border: '2px solid #2196F3',
            borderRadius: '20px',
            width: '70%',
            height: '70vh',
            transition: 'all 0.5s ease',
            animation: 'fadeIn 0.5s ease',
            overflowY: 'auto',
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            variant="h4"
            sx={{
              textAlign: 'center',
              color: '#FFFFFF',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
              marginBottom: '20px',
            }}
          >
            Code Example
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'left', marginTop: '20px' }}>
            <img src={modalImageSrc} alt="Kod Örneği" style={{ width: '230px', animation: `${robotSlideIn} 1s ease` }} />
            <Box>
              <Box sx={codeBlockStyle}>
                <pre>{modalContent}</pre>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>

    </>
  );
}

export default NavBarComponent;
