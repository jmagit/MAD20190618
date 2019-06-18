import React, { Component } from 'react'
import PropTypes from 'prop-types'


const Saluda = (props) => <h1>Hola {props.nombre}</h1>;
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

export default class Demos extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    }
    render() {
        //this.props.name = "kkkk";
        return (
            <div>
                {process.env.REACT_APP_MODO === 'kk' && <span>Modo: {process.env.REACT_APP_MODO}<br /></span>}
                {fnSaluda('MUNDO', 2)}
                <Saluda nombre={this.props.name} />
                <ul>
                    {lista.map((item, index) => <li key={item.id}>{item.nombre}</li>)}
                </ul>

            </div>
        )
    }
}
