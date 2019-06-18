import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Contador extends Component {
    static propTypes = {
        init: PropTypes.number,
        delta: PropTypes.number,
        onChange: PropTypes.func
    }
    static defaultProps = {
        init: 0,
        delta: 1
    }
    constructor(props) {
        super(props);
        this.state = { contador: +this.props.init };
        this.baja = (e) => {
            e.preventDefault();
            this.setState((prev, prop) => ({ contador: this.cambia(prev.contador - prop.delta) }));
        }
        this.sube = this.sube.bind(this);
        this.cambia = this.cambia.bind(this);
    }
    sube(factor, e) {
        e.preventDefault();
        this.setState((prev, prop) => ({ contador: this.cambia(prev.contador + factor) }));
    }
    cambia(valor) {
        if(this.props.onChange)
            this.props.onChange(valor);
        return valor;
    }
    render() {
        return (
            <div>
                <h1>{this.state.contador}</h1>
                <div>
                    <button onClick={this.sube.bind(this, this.props.delta)}>+</button>
                    <button onClick={this.baja}>-</button>
                    <button onClick={e => this.setState({ contador: this.cambia(+this.props.init) }) }>Inicia</button>
                </div>
            </div>
        )
    }
}
