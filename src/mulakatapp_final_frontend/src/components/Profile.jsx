import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';

const Profile = ({ user }) => {
    return (
        <Box sx={{ padding: '20px', backgroundColor: 'rgba(8,6,13,255)', color: '#ffffff', borderRadius: '8px', width: '300px', margin: '0 auto' }}>
            <Avatar sx={{ width: 56, height: 56, margin: '0 auto' }}>{user.name.charAt(0)}</Avatar>
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center', marginTop: '10px' }}>
                {user.name}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                Current Lesson: {user.currentLesson}
            </Typography>
            <Typography variant="h6" component="h3">
                Completed Lessons
            </Typography>
            <List>
                {user.completedLessons.map((lesson, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`Lesson ${lesson}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Profile;
