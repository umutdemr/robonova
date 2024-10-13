import React from 'react';
import { Box, Typography, Modal, List, ListItem, ListItemText } from '@mui/material';
import { Book } from '@mui/icons-material';

const LessonModal = ({ isModalOpen, closeModal, currentLesson, setCurrentLesson, navigate }) => {

    const handleLessonClick = (lesson) => {
        setCurrentLesson(lesson);
        closeModal();
        navigate(`/Lesson${lesson}`);
        localStorage.setItem('currentLesson', lesson);
    };

    return (
        <Modal open={isModalOpen} onClose={closeModal}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    overflow: 'auto',
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        width: '90%',
                        maxWidth: '500px',
                        backgroundColor: '#1E1E2D',
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: 24,
                        overflow: 'hidden',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                        <Book sx={{ fontSize: '2.5rem', color: '#A301E3', marginRight: '12px' }} />
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                flex: 1,
                            }}
                        >
                            My Robot Factory Lessons
                        </Typography>
                    </Box>
                    <List>
                        {[1, 2, 3, 4, 5, 6, 7].map((lesson) => (
                            <ListItem
                                button
                                onClick={() => handleLessonClick(lesson)}
                                key={lesson}
                                sx={{
                                    backgroundColor: currentLesson === lesson ? '#A301E3' : 'transparent',
                                    color: currentLesson === lesson ? '#FFFFFF' : '#CCCCCC',
                                    borderRadius: '8px',
                                    marginBottom: '8px',
                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: currentLesson === lesson ? '#8B01B3' : '#2A2A3C',
                                        color: '#FFFFFF',
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={`Lesson ${lesson}`}
                                    sx={{
                                        textAlign: 'center',
                                        fontWeight: currentLesson === lesson ? 'bold' : 'normal',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Modal>
    );
};

export default LessonModal;
