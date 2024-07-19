import React, { useState, useEffect } from 'react';
import { Button, TextField, Snackbar, Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Alert } from '@mui/material';
import { robonova_backend } from 'declarations/robonova_backend';
import { styled } from '@mui/system';

const PageContainer = styled('div')({
  backgroundColor: 'rgba(8,6,13,255)',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
  paddingTop: '100px'
});

const SectionContainer = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  backgroundColor: 'rgba(17,13,22,255)',
  borderRadius: '15px',
  margin: '10px',
  color: '#ffffff',
  maxHeight: '100vh',
  overflowY: 'auto',
});

const StyledH4 = styled(Typography)({
  fontSize: '24px',
  color: '#A301E3',
  marginBottom: '20px',
  fontFamily: 'Outfit',
});

const CustomButton = styled(Button)({
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
      const fetchedNotes = await robonova_backend.getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async () => {
    try {
      await robonova_backend.addNote(newNoteDescription);
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
      await robonova_backend.completeNote(note.id);
      fetchNotes();
      showSnackbar('Note completed successfully', 'success');
    } catch (error) {
      console.error('Error completing note:', error);
      showSnackbar('Error completing note', 'error');
    }
  };

  const handleDeleteNote = async (note) => {
    try {
      await robonova_backend.deleteNote(note.id);
      fetchNotes();
      showSnackbar('Note deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting note:', error);
      showSnackbar('Error deleting note', 'error');
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
    <PageContainer>
      <SectionContainer>
        <StyledH4 variant="h4">Take note</StyledH4>
        <TextField
          multiline
          rows={4}
          placeholder="Add new note"
          value={newNoteDescription}
          onChange={(e) => setNewNoteDescription(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}
          InputLabelProps={{
            style: { color: '#ffffff' },
          }}
          InputProps={{
            style: { color: '#ffffff' },
          }}
        />
        <CustomButton variant="contained" onClick={handleAddNote} fullWidth sx={{ marginTop: '10px' }}>
          Add Note
        </CustomButton>
      </SectionContainer>
      <SectionContainer>
        <StyledH4 variant="h4">My Notes</StyledH4>
        {notes.map((note) => (
          <Accordion key={note.id} sx={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ textDecoration: note.completed ? 'line-through' : 'none' }}>
                {note.description}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                control={<Checkbox checked={note.completed} onChange={() => handleCompleteNote(note)} sx={{ color: '#ffffff' }} />}
                label="Tamamlandı"
              />
              <Button variant="outlined" color="error" onClick={() => handleDeleteNote(note)} sx={{ marginLeft: 'auto', color: '#ffffff', borderColor: '#ffffff' }}>
                Sil
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </SectionContainer>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default Notes;
