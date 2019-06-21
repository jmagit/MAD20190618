import React from 'react';
import logo from './logo.svg';
import './App.css';
import Demos, { Saluda } from './Demos';
import MisImagenes from './MisImagenes';
//import Contador from './Contador';
import Calculadora from './Calculadora';
import Personas from './Personas';
import Blog from './Blog';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Route, Redirect, NavLink, Switch } from 'react-router-dom';
import {OtroCounter} from './OtroContador'
import {Notificaciones} from './notificaciones'
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
              <NavLink className="btn btn-link nav-link" activeClassName="active" to={item.path}>{item.titulo}</NavLink>
            </li>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>;
  }
}
class PageNotFound extends React.Component {
  render() {
    return <h1>404 Page not found</h1>
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.menu = [
      { titulo: 'Blog', path: '/blog', componente: <Blog /> },
      { titulo: 'Inicio', path: '/inicio', componente: (<div><Saluda nombre={this.props.name} /><OtroCounter /></div>) },
      { titulo: 'Demos', path: '/demos', componente: <Demos name="Indra" init={5} /> },
      { titulo: 'Muro', path: '/muro', componente: <MisImagenes /> },
      { titulo: 'Calculadora', path: '/chisme/de/hacer/cuentas', componente: <div><h1>Calculadora</h1><Calculadora /></div> },
      { titulo: 'Personas', path: '/personas', componente: <Personas /> },
    ];
    this.state = { paginaActual: this.menu[0].componente };
    this.selecciona = (index) => {
      this.setState({ paginaActual: this.menu[index].componente });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Cabecera menu={this.menu} onSelect={this.selecciona} />
          <Notificaciones />
          <div className="container-fluid">
            <Switch>
              <Route path='/inicio' render={() => <div><Saluda nombre={this.props.name} /><OtroCounter /></div>} exact />
              <Route path='/demos' component={Demos} exact />
              <Route path='/muro' component={MisImagenes} exact />
              <Route path='/chisme/de/hacer/cuentas' component={Calculadora} exact />
              <Route path='/personas' component={Personas} exact />
              <Route path='/personas/add' component={Personas} exact />
              <Route path='/personas/:id' component={Personas} exact />
              <Route path='/personas/:id/edit' component={Personas} exact />
              <Route path='/blog' component={Blog} exact />
              <Redirect from="/" to="/inicio" exact push />
              <Route component={PageNotFound} exact />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
