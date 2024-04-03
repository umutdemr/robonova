// Notes.jsx
import React, { useState, useEffect } from 'react';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import { Button, TextField, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import '../styles/notes.scss';

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
    <div className="notes-container">
      <h1>My Notes</h1>
      <TextField
        type="text"
        value={newNoteDescription}
        onChange={(e) => setNewNoteDescription(e.target.value)}
        label="Add a new note"
        variant="outlined"
        fullWidth
      />
      <Button variant="contained" onClick={handleAddNote} className="btn-primary">Add Note</Button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <span className={note.completed ? 'completed-note' : ''}>{note.description}</span>
            <Button variant="outlined" onClick={() => handleCompleteNote(note)} className="btn-secondary">Complete</Button>
            <Button variant="outlined" onClick={() => handleDeleteNote(note)} className="btn-error">Delete</Button>
          </li>
        ))}
      </ul>

      <Button variant="contained" onClick={handleClearCompleted} className="btn-secondary">Clear Completed</Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} className="snackbar">
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} className="alert">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notes;
