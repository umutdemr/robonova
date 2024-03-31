import React, { useState, useEffect } from 'react';
import { mulakatapp_final_backend } from 'declarations/mulakatapp_final_backend';
import '../styles/notes.scss';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteDescription, setNewNoteDescription] = useState('');

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
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleCompleteNote = async (note) => {
    try {
      await mulakatapp_final_backend.completeNote(note.id);
      fetchNotes();
    } catch (error) {
      console.error('Error completing note:', error);
    }
  };

  const handleDeleteNote = async (note) => {
    try {
      await mulakatapp_final_backend.deleteNote(note.id);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleClearCompleted = async () => {
    try {
      await mulakatapp_final_backend.clearNote();
      fetchNotes();
    } catch (error) {
      console.error('Error clearing completed notes:', error);
    }
  };

  return (
    <div className="notes-container">
      <h1>My Notes</h1>
      <input 
        type="text" 
        value={newNoteDescription} 
        onChange={(e) => setNewNoteDescription(e.target.value)} 
      />
      <button onClick={handleAddNote}>Add Note</button>
      <ul>
  {notes.map((note) => (
    <li key={note.id}>
      <span style={{ textDecoration: note.completed ? 'line-through' : 'none' }}>{note.description}</span>
      <button onClick={() => handleCompleteNote(note)}>Complete</button>
      <button onClick={() => handleDeleteNote(note)}>Delete</button>
    </li>
  ))}
</ul>

      <button onClick={handleClearCompleted}>Clear Completed</button>
    </div>
  );
};

export default Notes;
