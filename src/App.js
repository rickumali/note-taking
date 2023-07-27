import React, { useState, useEffect } from "react";
import "./App.css";

const App = ({ notesFromStorage }) => {
  const [notes, setNotes] = useState(JSON.parse(notesFromStorage));
  const [noteEditing, setNoteEditing] = useState("");

  useEffect(() => {
    const json = JSON.stringify(notes);
    localStorage.setItem("notes", json);
  }, [notes])

  const addNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: Math.random().toString(36).substring(2, 9),
      text: e.target.note.value,
    };
    setNotes([...notes, newNote]);
    e.target.note.value = "";
  }

  const deleteNote = (idToDelete) => {
    const filterNotes = notes.filter((note) => note.id !== idToDelete);
    setNotes(filterNotes);
  }

  const submitEdits = (event, idToEdit) => {
    event.preventDefault();
    const updatedNotes = notes.map((note) => {
      if (note.id === idToEdit) {
        return {
          id: note.id,
          text: event.target.note.value,
        }
      } else {
        return note;
      }
    });
    setNotes(updatedNotes);
    setNoteEditing("");
  }

  return (
    <div className="App">
      <h1>Rick's Note Taker</h1>
      <form onSubmit={addNote}>
        <ul>
          <li>
            <label htmlFor="note">Note: </label>
            <input type="text" name="note" />
          </li>
          <li>
            <input type="submit" />
          </li>
        </ul>
      </form>
      <hr />
      {
        notes.map((note) => (
          <div className='note' key={note.id}>
            {note.id !== noteEditing ? (
              <p>{note.text}</p>
            ) : (
              <form onSubmit={(e) => submitEdits(e, note.id)}>
                <ul>
                  <li>
                    <label htmlFor="note">Note: </label>
                    <textarea name="note" defaultValue={note.text}></textarea>
                  </li>
                  <li><button type="submit">Submit Edits</button></li>
                </ul>
              </form>
            )}
            <ul className="noteButtons">
              <li>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
                <button onClick={() => setNoteEditing(note.id)}>Edit</button>
              </li>
            </ul>
          </div>
        ))
      }
    </div>
  );
};

export default App;