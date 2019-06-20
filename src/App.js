import React from 'react';
import logo from './logo.svg';
import './App.css';
import Demos, { Saluda } from './Demos';
import MisImagenes from './MisImagenes';
import Contador from './Contador';
import Calculadora from './Calculadora';
import Personas from './Personas';
import Blog from './Blog';
import { Navbar, Nav } from 'react-bootstrap';

/*
class Cabecera extends React.Component {
  render() {
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/"><img src={logo} className="App-logo" alt="logo" /></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {this.props.menu.map((item, index) =>
            <li key={index} className="nav-item">
              <button className="btn btn-link nav-link" onClick={e => this.props.onSelect(index)}>{item.titulo}</button>
            </li>
          )}
        </ul>

      </div>
    </nav>
      ;
  }
}
*/
class Cabecera extends React.Component {
  render() {
    return <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/"><img src={logo} className="App-logo" alt="logo" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      {this.props.menu.map((item, index) =>
            <li key={index} className="nav-item">
              <button className="btn btn-link nav-link" onClick={e => this.props.onSelect(index)}>{item.titulo}</button>
            </li>
          )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.menu = [
      { titulo: 'Blog', componente: <Blog /> },
      { titulo: 'Inicio', componente: (<div><Saluda nombre={this.props.name} /><Contador /></div>) },
      { titulo: 'Demos', componente: <Demos name="Indra" init={5} /> },
      { titulo: 'Muro', componente: <MisImagenes /> },
      { titulo: 'Calculadora', componente: <div><h1>Calculadora</h1><Calculadora /></div> },
      { titulo: 'Personas', componente: <Personas /> },
    ];
    this.state = { paginaActual: this.menu[0].componente };
    this.selecciona = (index) => {
      this.setState({ paginaActual: this.menu[index].componente });
    }
  }

  render() {
    return (
      <div className="App">
        <Cabecera menu={this.menu} onSelect={this.selecciona} />
        <div className="container-fluid">
          {this.state.paginaActual}
        </div>
      </div>
    );
  }
}
export default App;
