import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteEditing, setNoteEditing] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: Math.random().toString(36).substring(2, 9),
      text: e.target.note.value,
    };
    setNotes([...notes, newNote]);
    e.target.note.value = "";
  }

  return (
    <div className="App">
      <h1>localStorage Demo</h1>
      <form onSubmit={addNote}>
        <input type="text" name="note" />
        <input type="Submit" />
      </form>
      {
        notes.map((note) => <div key={note.id}>{note.text}</div>)
      }
    </div>
  );
};

export default App;