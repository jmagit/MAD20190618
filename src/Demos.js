import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Contador from './Contador'

export const Saluda = (props) => <h1>Hola {props.nombre}</h1>;

function fnSaluda(nombre, tipo) {
    // eslint-disable-next-line eqeqeq
    if (tipo == 1)
        return <b>{`Hola ${nombre}`}</b>;
    return <i>{`Adios ${nombre}`}</i>;
}
const lista = [
    { id: 1, nombre: 'Madrid' },
    { id: 2, nombre: 'Barcelona' },
    { id: 3, nombre: 'Valencia' },
    { id: 4, nombre: 'Sevilla' },
];

export class Card extends Component {
    render() {
        if(!this.props.titulo)
            return <div>Falta el titulo</div>
        return <div className="card">
        <div className="card-header">
          {this.props.titulo}
        </div>
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    }
}
export default class Demos extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        init: PropTypes.number
    }
    static defaultProps = {
        init: 1
    }
    constructor(props) {
        super(props);
        this.state = { valor: +this.props.init };
    }
    render() {
        //this.props.name = "kkkk";
        return (
            <div>
                <Contador init={this.props.init} min={1} max={10} onChange={v=> this.setState({ valor: v }) } />
                Numero: {this.state.valor}<br/>
                <Contador init={this.state.valor} />
                {process.env.REACT_APP_MODO === 'kk' && <span>Modo: {process.env.REACT_APP_MODO}<br /></span>}
                {fnSaluda('MUNDO', 2)}
                
                <ul>
                    {lista.map((item, index) => <li key={item.id}>{item.nombre}</li>)}
                </ul>
                <Card titulo="Demo Tarjeta">
                    <Saluda nombre={this.props.name} />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, alias. Temporibus aliquid, natus totam voluptatem dolore eum iure debitis numquam libero molestiae itaque quisquam non. Quo ad debitis aliquam provident.
                </Card>

            </div>
        )
    }
}
