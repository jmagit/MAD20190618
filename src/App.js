import React from 'react';
import logo from './logo.svg';
import './App.css';
import Demos, { Saluda } from './Demos';
import MisImagenes from './MisImagenes';
import Contador from './Contador';
import { throwStatement } from '@babel/types';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.menu = [
      { titulo: 'Inicio', componente: (<div><Saluda nombre={this.props.name} /><Contador /></div>)},
      { titulo: 'Demos', componente: <Demos name="Indra" init={5} /> },
      { titulo: 'Muro', componente: <MisImagenes />},
    ];
    this.state = { paginaActual: this.menu[0].componente };
    this.selecciona = (index, e) => {
      e.preventDefault();
      this.setState({ paginaActual: this.menu[index].componente });
    }
  }
  
  render() {
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
          {this.state.paginaActual}
        </div>
      </div>
    );
  }
}
export default App;
