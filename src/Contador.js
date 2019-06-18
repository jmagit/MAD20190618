import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Contador extends Component {
    static propTypes = {
        init: PropTypes.number,
        delta: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        onChange: PropTypes.func
    }
    static defaultProps = {
        init: 0,
        delta: 1,
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER
    }
    constructor(props) {
        super(props);
        this.state = { contador: +this.props.init };
        this.baja = (e) => {
            e.preventDefault();
            this.setState((prev, prop) => (
                { contador: prev.contador - prop.delta >= prop.min ? this.cambia(prev.contador - prop.delta) : prev.contador }));
        }
        this.sube = this.sube.bind(this);
        this.cambia = this.cambia.bind(this);
    }
    sube(factor, e) {
        e.preventDefault();
        this.setState((prev, prop) => (
            { contador: prev.contador + prop.delta <= prop.max ? this.cambia(prev.contador + prop.delta) : prev.contador }));
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
