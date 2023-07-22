import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteEditing, setNoteEditing] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("notes");
    const savedNotes = JSON.parse(json);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);
  
  const addNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: Math.random().toString(36).substring(2, 9),
      text: e.target.note.value,
    };
    setNotes([...notes, newNote]);
    const json = JSON.stringify([...notes, newNote]);
    localStorage.setItem("notes", json);
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