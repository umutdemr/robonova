// LessonModal.js
import React from 'react';
import { Box, Typography, Modal, List, ListItem, ListItemText } from '@mui/material';

const LessonModal = ({ isModalOpen, closeModal, currentLesson, setCurrentLesson, navigate }) => (
    <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={{ width: '400px', backgroundColor: 'white', padding: '20px', margin: '100px auto', borderRadius: '8px', boxShadow: 24 }}>
            <Typography variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                Lessons
            </Typography>
            <List>
                {[1, 2, 3, 4, 5, 6, 7].map((lesson) => (
                    <ListItem
                        button
                        onClick={() => { setCurrentLesson(lesson); closeModal(); navigate(`/lesson${lesson}`); }}
                        key={lesson}
                        sx={{ backgroundColor: currentLesson === lesson ? 'grey' : 'inherit' }}
                    >
                        <ListItemText primary={`Lesson ${lesson}`} sx={{ color: currentLesson === lesson ? 'white' : 'black' }} />
                    </ListItem>
                ))}
            </List>
        </Box>
    </Modal>
);

export default LessonModal;
