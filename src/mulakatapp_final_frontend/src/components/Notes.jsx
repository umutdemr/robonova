import React, { useState, useEffect } from 'react';
import { Button, TextField, Snackbar, Grid, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import { styled } from '@mui/system';

const NotesContainer = styled(Grid)({
  padding: '20px',
});

const StyledH4 = styled(Typography)({
  fontSize: '24px',
  color: '#007bff',
  marginBottom: '20px',
});

const StyledList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const StyledListItem = styled('li')({
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const NoteDescription = styled('span')({
  flex: 1,
  fontSize: '16px', // $font-size-base değeri yerine sabit bir değer kullandım
  color: '#007bff',
  wordWrap: 'break-word',
});

const CompletedNote = styled(NoteDescription)({
  textDecoration: 'line-through',
});

const StyledButton = styled(Button)({
  padding: '8px 12px',
  fontSize: '16px', // $font-size-base değeri yerine sabit bir değer kullandım
  cursor: 'pointer',
});

const SecondaryButton = styled(StyledButton)({
  backgroundColor: '#6c757d',
  color: '#fff',
  border: 'none',
  '&:hover': {
    backgroundColor: '#5a6268',
  },
});

const ErrorButton = styled(StyledButton)({
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  '&:hover': {
    backgroundColor: '#bb2d3b',
  },
});

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteDescription, setNewNoteDescription] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await mulakatapp_final_backend.getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async () => {
    try {
      await mulakatapp_final_backend.addNote(newNoteDescription);
      setNewNoteDescription('');
      fetchNotes();
      showSnackbar('Note added successfully', 'success');
    } catch (error) {
      console.error('Error adding note:', error);
      showSnackbar('Error adding note', 'error');
    }
  };

  const handleCompleteNote = async (note) => {
    try {
      await mulakatapp_final_backend.completeNote(note.id);
      fetchNotes();
      showSnackbar('Note completed successfully', 'success');
    } catch (error) {
      console.error('Error completing note:', error);
      showSnackbar('Error completing note', 'error');
    }
  };

  const handleDeleteNote = async (note) => {
    try {
      await mulakatapp_final_backend.deleteNote(note.id);
      const updatedNotes = notes.filter((n) => n.id !== note.id);
      setNotes(updatedNotes);
      showSnackbar('Note deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting note:', error);
      showSnackbar('Error deleting note', 'error');
    }
  };

  const handleClearCompleted = async () => {
    try {
      await mulakatapp_final_backend.clearNote();
      fetchNotes();
      showSnackbar('Completed notes cleared successfully', 'success');
    } catch (error) {
      console.error('Error clearing completed notes:', error);
      showSnackbar('Error clearing completed notes', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <NotesContainer container spacing={2} className="notes-container">
      <Grid item xs={12}>
        <StyledH4 variant="h4">My Notes</StyledH4>
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={4}
          placeholder="Add a new note"
          value={newNoteDescription}
          onChange={(e) => setNewNoteDescription(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item >
        <Button variant="contained" onClick={handleAddNote} fullWidth>Add Note</Button>
      </Grid>
      <Grid item xs={12}>
        <StyledList>
          {notes.map((note) => (
            <StyledListItem key={note.id}>
              <NoteDescription className={note.completed ? 'completed-note' : ''}>{note.description}</NoteDescription>
              <SecondaryButton variant="outlined" onClick={() => handleCompleteNote(note)}>Complete</SecondaryButton>
              <ErrorButton variant="outlined" onClick={() => handleDeleteNote(note)}>Delete</ErrorButton>
            </StyledListItem>
          ))}
        </StyledList>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleClearCompleted} fullWidth>Clear Completed</Button>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </NotesContainer>
  );
};

export default Notes;
