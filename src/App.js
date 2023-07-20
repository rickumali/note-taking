import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>localStorage Demo</h1>
      <form onSubmit={addNote}>
        <input type="text" name="note" />
        <input type="Submit" />
      </form>
    </div>
  );
};

export default App;