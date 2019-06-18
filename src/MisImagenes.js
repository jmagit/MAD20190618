import React, { Component } from 'react'
import Contador from './Contador';

export class FotoCard extends Component {
    render() {
        return <div className="card" style={{width: this.props.dim + 'px'}} onClick={this.props.onClick} >
                <img src={this.props.foto} className="card-img-top" alt={this.props.titulo} />
                {this.props.dim >= 96 && <div className="card-body">
                    <h5 className="card-title">{this.props.titulo}</h5>
                    {this.props.dim >= 256 && <p className="card-text">{this.props.children}</p>}
                </div>}
            </div>
    }
}

export default class MisImagenes extends Component {
    constructor(props) {
        super(props);
        this.tipos = ['people', 'animals', 'arch', 
            'nature', 'tech',
        ];
        const t = [];
        for (let i = 0; i < this.tipos.length; i++) {
            let f = new Array(10);
            t.push(f.fill(null, 0, 10));
        }
        this.state = { listado: t, dim: 256 };
    }
    cambia(f, c) {
        this.setState(prev => {
            let alea = Math.floor(Math.random() * 1000000);
            prev.listado[f][c] = `http://placeimg.com/512/512/${this.tipos[f]}?t=${alea}`;
            return { listado: prev.listado };
        })
    }
    anula(f, c) {
        this.setState(prev => {
            prev.listado[f][c] = null;
            return { listado: prev.listado };
        })
    }
    render() {
        const rslt = this.state.listado.map(
            (fila, index) => {
                const tamaño = { height: this.state.dim, width: this.state.dim };
                return (
                    <tr key={'F' + index.toString()}>
                        {fila.map((celda, subindex) => (
                            <td key={'F' + index.toString() + 'C' + subindex.toString()}>
                                {celda && <FotoCard foto={celda} titulo={(index + 1) + '-' + (subindex + 1)} dim={this.state.dim} onClick={this.anula.bind(this, index, subindex)} >Descargado de {celda}</FotoCard>}
                                {!celda && <button style={tamaño} onClick={this.cambia.bind(this, index, subindex)}>{(index + 1) + '-' + (subindex + 1)}</button>}
                            </td>
                        )
                        )}
                    </tr>
                )
            }
        );
        return (
            <div>
                <Contador init={this.state.dim} delta={32} min={32} max={512} onChange={rslt => this.setState({ dim: rslt })} />
                <table>
                    <tbody>
                        {rslt}
                    </tbody>
                </table>
            </div>
        )
    }
}
