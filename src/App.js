import React from 'react';
import logo from './logo.svg';
import './App.css';
import Demos from './Demos';
import MisImagenes from './MisImagenes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Editar <code>src/App.js</code> y guardar.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="container-fluid">
        {/* <Demos name="Indra" init={5} /> */}
        <MisImagenes />
      </div>
    </div>
  );
}

export default App;
