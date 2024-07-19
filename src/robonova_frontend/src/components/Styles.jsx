import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const Container = styled('div')({
    display: 'flex',
    height: '100vh',
    backgroundColor: 'rgba(8,6,13,255)',
    flexDirection: 'column',
    position: 'relative'
});

export const ContentWrapper = styled('div')({
    display: 'flex',
    flex: '1',
    overflow: 'hidden',
    paddingBottom: '80px' // Make room for the footer
});

export const LessonContent = styled('div')({
    flex: '1',
    padding: '20px',
    overflowX: 'auto', // Added scroll only for lesson content
    backgroundColor: 'rgba(8,6,13,255)',
    color: '#ffffff',
});

export const EditorContent = styled('div')({
    flex: '1',
    padding: '20px',
    backgroundColor: 'rgba(17,13,22,255)',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '90px',
    position: 'relative'
});

export const EditorHeader = styled('div')({
    padding: '10px 0',
    borderBottom: '1px solid #ffffff',
    marginBottom: '10px',
    color: '#ffffff'
});

export const EditorWrapper = styled('div')({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#282c34',
    borderRadius: '8px',
    overflow: 'hidden'
});

export const EditorFooter = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderTop: '1px solid #ffffff',
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    backgroundColor: 'rgba(17,13,22,255)',
    zIndex: 1000,
});

export const CustomButton = styled(Button)({
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    border: 'none',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:active': {
        transform: 'translateY(1px)',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
    },
});

export const TransparentButton = styled(Button)({
    backgroundColor: 'transparent',
    color: '#A301E3',
    padding: '10px 20px',
    borderRadius: '8px',
    border: '0.5px solid #A301E3',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#A301E3',
        color: '#FFFFFF',
    },
    transition: 'background-color 0.3s ease, color 0.3s ease',
});

