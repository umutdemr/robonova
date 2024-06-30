// styles.js
import { styled } from '@mui/system';

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
    zIndex: 1000
});
