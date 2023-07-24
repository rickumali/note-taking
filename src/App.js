import React, { useState, useEffect } from "react";
import "./App.css";

const App = ({fromStorage}) => {
  const [notes, setNotes] = useState(JSON.parse(fromStorage));
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
            <div>{note.text}</div>
            <button onClick={() => deleteNote(note.id)}>delete</button>
          </div>))
      }
    </div>
  );
};

export default App;