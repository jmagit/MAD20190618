import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import ValidationMessage, { Esperando } from './ValidationMessage';
import * as db from './my-store'

const URL_BASE = process.env.REACT_APP_URL_API + 'personas';

export default class Personas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modo: 'list',
            listado: [],
            elemento: {},
            loading: true,
        };
        this.idOriginal = null;
        this.pk = 'id';
        this.urlAnt = '';
    }
    list() {
        this.setState({ loading: true });
        axios.get(URL_BASE).then(
            resp => this.setState({
                modo: 'list', listado: resp.data, loading: false
            }),
            err => {
                db.AddErrNotifyCmd(err);
                this.setState({ loading: false });
            }
        );
    }
    add() {
        this.setState({ modo: 'add', elemento: { id: '', nombre: '', apellidos: '', edad: '' } });
    }
    edit(key) {
        this.setState({ loading: true });
        axios.get(URL_BASE + '/' + key).then(
            resp => {
                this.setState({
                    modo: 'edit', elemento: resp.data, loading: false
                });
                this.idOriginal = key;
            }
            ,
            err => {
                db.AddErrNotifyCmd(err);
                this.setState({ loading: false });
            }
        );
    }
    view(key) {
        this.setState({ loading: true });
        axios.get(URL_BASE + '/' + key).then(
            resp => this.setState({
                modo: 'view', elemento: resp.data, loading: false
            }),
            err => {
                db.AddErrNotifyCmd(err);
                this.setState({ loading: false });
            }
        );
    }
    remove(key) {
        if (!window.confirm('¿Seguro?')) return;
        this.setState({ loading: true });
        axios.delete(URL_BASE + '/' + key).then(
            resp => this.list(),
            err => {
                db.AddErrNotifyCmd(err);
                this.setState({ loading: false });
            }
        );
    }

    cancel() {
        this.setState({ elemento: {} });
        this.idOriginal = null;
        this.list();
        window.history.pushState(null, null, '/personas');
        // window.location.href = '/personas';
    }
    send() {
        // eslint-disable-next-line default-case
        switch (this.state.modo) {
            case 'add':
                this.setState({ loading: true });
                axios.post(URL_BASE, this.state.elemento).then(
                    resp => this.cancel(),
                    err => {
                        db.AddErrNotifyCmd(err);
                        this.setState({ loading: false });
                    }
                );
                break;
            case 'edit':
                this.setState({ loading: true });
                axios.put(URL_BASE + '/' + this.idOriginal, this.state.elemento).then(
                    resp => this.cancel(),
                    err => {
                        db.AddErrNotifyCmd(err);
                        this.setState({ loading: false });
                    }
                );
                break;
            case 'view':
                this.cancel();
                break;
        }
    }
    render() {
        if (this.state.loading)
            return <Esperando />
        return (
            <div>
                <h1>Mantenimiento de personas</h1>
                {this.state.modo === 'list' && <PersonasLst listado={this.state.listado}
                    onDelete={this.remove.bind(this)} />}
                {this.state.modo === 'view' && <PersonasView elemento={this.state.elemento} onCancel={this.cancel.bind(this)} />}
                {this.state.modo === 'add' && <PersonasForm elemento={this.state.elemento} onCancel={this.cancel.bind(this)}
                    onSend={this.send.bind(this)} isAdd={true} />}
                {this.state.modo === 'edit' && <PersonasForm elemento={this.state.elemento} onCancel={this.cancel.bind(this)}
                    onSend={this.send.bind(this)} isAdd={false} />}
            </div>
        )
    }
    decodeRuta() {
        if (this.props.match.url === this.urlAnt) return;
        this.urlAnt = this.props.match.url;
        if (this.props.match.params.id) {
            if (this.props.match.url.endsWith('/edit')) {
                this.edit(this.props.match.params.id);
            } else {
                this.view(this.props.match.params.id);
            }
        } else {
            if (this.props.match.url.endsWith('/add')) {
                this.add();
            } else {
                this.list();
            }
        }
    }
    componentDidMount() {
        this.decodeRuta();
    }
    componentDidUpdate(next_props, next_state) {
        this.decodeRuta();
    }

}
class PersonasLst extends Component {
    render() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <tr><Link to={`/personas/add`}>Añadir</Link></tr>
                </tr>
            </thead>
            <tbody>
                {this.props.listado.map(item => <tr key={item.id}>
                    <td><Link to={`/personas/${item.id}`}>{item.nombre} {item.apellidos}</Link> </td>
                    <td>
                        <Link className="btn btn-link" to={`/personas/${item.id}/edit`}>Editar</Link>
                        <button className="btn btn-link" type="button" onClick={e => this.props.onDelete(item.id)}>Borrar</button>
                    </td>
                </tr>)}
            </tbody>
        </table>;
    }
}

class PersonasView extends Component {
    render() {
        return <div>
            <p>
                <b>Código:</b> {this.props.elemento.id} <br />
                <b>Nombre:</b> {this.props.elemento.nombre} <br />
                <b>Apellidos:</b> {this.props.elemento.apellidos} <br />
                <b>Edad:</b> {this.props.elemento.edad}
            </p>
            <div>
                <button type="button" onClick={this.props.onCancel}>Volver</button>
            </div>
        </div>;
    }
}
class PersonasForm extends Component {
    constructor(props) {
        super();
        this.state = { elemento: props.elemento, msgErr: {}, invalid: true };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const cmp = event.target.name;
        const valor = event.target.value;
        this.setState(prev => {
            prev.elemento[cmp] = valor;
            return { elemento: prev.elemento };
        });
        this.validar();
    }
    validar() {
        if (this.form) {
            const errors = {};
            let invalid = false;
            for (var cntr of this.form.elements) {
                if (cntr.name) {
                    errors[cntr.name] = cntr.validationMessage;
                    if (!errors[cntr.name])
                        // eslint-disable-next-line default-case
                        switch (cntr.name) {
                            case 'nombre':
                                errors[cntr.name] = (cntr.value !== cntr.value.toUpperCase()) ? 'Debe estar en mayusculas' : null;
                                break;
                        }
                    invalid = invalid || (errors[cntr.name] !== '' && errors[cntr.name] !== null && typeof (errors[cntr.name]) !== "undefined");
                }
            }
            this.setState({ msgErr: errors, invalid: invalid });
        }
    }
    componentDidMount() {
        this.validar();
    }
    render() {
        let htmlCodigo;
        if (this.props.isAdd) {
            htmlCodigo = <div className="form-group">
                <label htmlFor="id">Código</label>
                <input type="number" className="form-control" id="id" name="id" value={this.state.elemento.id}
                    onChange={this.handleChange} required />
                <ValidationMessage msg={this.state.msgErr.id} />
            </div>;
        } else {
            htmlCodigo = <div className="form-group">
                <label >Código</label>
                <div>
                    {this.state.elemento.id}
                </div>
            </div>;
        }
        return <form ref={tag => { this.form = tag; }}>
            {htmlCodigo}
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={this.state.elemento.nombre}
                    onChange={this.handleChange} required minLength="2" maxLength="10" />
                <ValidationMessage msg={this.state.msgErr.nombre} />
            </div>
            <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input type="text" className="form-control" id="apellidos" name="apellidos" value={this.state.elemento.apellidos}
                    onChange={this.handleChange} minLength="2" maxLength="10" />
                <ValidationMessage msg={this.state.msgErr.apellidos} />
            </div>
            <div className="form-group">
                <label htmlFor="edad">Edad</label>
                <input type="number" className="form-control" id="edad" name="edad" value={this.state.elemento.edad}
                    onChange={this.handleChange} min="16" max="67" />
                <ValidationMessage msg={this.state.msgErr.edad} />
            </div>
            <div>
                <button type="button" className="btn btn-primary" onClick={this.props.onSend}
                    disabled={this.state.invalid}>Enviar</button>
                <button type="button" className="btn btn-primary" onClick={this.props.onCancel}>Volver</button>
            </div>
        </form>
    }
}
