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
    console.log("submitEdits")
  }

  return (
    <div className="App">
      <h1>localStorage Demo</h1>
      <form onSubmit={addNote}>
        <input type="text" name="note" />
        <input type="Submit" />
      </form>
      {
        notes.map((note) => (
          <div key={note.id}>
            {note.id !== noteEditing ? (
              <div>{note.text}</div>
            ) : (
              <form onSubmit={(e) => submitEdits(e, note.id)}>
                <textarea name="note" defaultValue={note.text}></textarea>
                <button type="submit">Submit Edits</button>
              </form>
            )}
            <button onClick={() => deleteNote(note.id)}>delete</button>
            <button onClick={() => setNoteEditing(note.id)}>edit</button>
          </div>
        ))
      }
    </div>
  );
};

export default App;