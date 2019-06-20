import React, { Component } from 'react'
import ValidationMessage from './ValidationMessage';

export default class Personas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modo: 'list',
            listado: [],
            elemento: {}
        };
        this.idOriginal = null;
        this.pk = 'id';
    }
    list() {
        if (this.state.listado.length === 0) {
            this.setState({
                modo: 'list', listado: [
                    { id: 1, nombre: 'Carmelo', apellidos: 'Coto', edad: 34 },
                    { id: 2, nombre: 'Pepito', apellidos: 'Grillo', edad: 155 },
                    { id: 3, nombre: 'Pedro', apellidos: 'Pica Piedra', edad: 51 },
                    { id: 4, nombre: 'Pablo', apellidos: 'Marmol', edad: 47 },
                ]
            });
        } else {
            this.setState({ modo: 'list' });
        }
    }
    add() {
        this.setState({ modo: 'add', elemento: { id: '', nombre: '', apellidos: '', edad: '' } });
    }
    edit(key) {
        // eslint-disable-next-line eqeqeq
        let rslt = this.state.listado.find(item => item[this.pk] == key);
        if (rslt) {
            this.setState({ modo: 'edit', elemento: Object.assign({}, rslt) });
            this.idOriginal = key;
        } else {
            console.error('Elemento no encontrado');
        }
    }
    view(key) {
        // eslint-disable-next-line eqeqeq
        let rslt = this.state.listado.find(item => item[this.pk] == key);
        if (rslt) {
            this.setState({ modo: 'view', elemento: Object.assign({}, rslt) });
        } else {
            console.error('Elemento no encontrado');
        }
    }
    remove(key) {
        if (!window.confirm('¿Seguro?')) return;
        this.setState((prev) => ({
            modo: 'list',
            // eslint-disable-next-line eqeqeq
            listado: prev.listado.filter(item => item[this.pk] != key)
        }));
    }

    cancel() {
        this.setState({ elemento: {} });
        this.idOriginal = null;
        this.list();
    }
    send() {
        // eslint-disable-next-line default-case
        switch (this.state.modo) {
            case 'add':
                this.setState((prev) => ({
                    listado: [...prev.listado, prev.elemento]
                })
                );
                this.cancel();
                break;
            case 'edit':
                let idOriginal = this.idOriginal;
                this.setState((prev) => ({
                    // eslint-disable-next-line eqeqeq
                    listado: prev.listado.map(item => item[this.pk] == idOriginal ? prev.elemento : item)
                })
                );
                this.cancel();
                break;
            case 'view':
                this.cancel();
                break;
        }
    }
    render() {
        return (
            <div>
                <h1>Mantenimiento de personas</h1>
                {this.state.modo === 'list' && <PersonasLst listado={this.state.listado}
                    onAdd={this.add.bind(this)} onView={this.view.bind(this)} onEdit={this.edit.bind(this)}
                    onDelete={this.remove.bind(this)} />}
                {this.state.modo === 'view' && <PersonasView elemento={this.state.elemento} onCancel={this.cancel.bind(this)} />}
                {this.state.modo === 'add' && <PersonasForm elemento={this.state.elemento} onCancel={this.cancel.bind(this)}
                    onSend={this.send.bind(this)} isAdd={true} />}
                {this.state.modo === 'edit' && <PersonasForm elemento={this.state.elemento} onCancel={this.cancel.bind(this)}
                    onSend={this.send.bind(this)} isAdd={false} />}
            </div>
        )
    }
    componentDidMount() {
        this.list();
    }

}
class PersonasLst extends Component {
    render() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <tr><button type="button" onClick={this.props.onAdd}>+</button></tr>
                </tr>
            </thead>
            <tbody>
                {this.props.listado.map(item => <tr key={item.id}>
                    <td>{item.nombre} {item.apellidos}</td>
                    <td>
                        <button type="button" onClick={e => this.props.onView(item.id)}>Ver</button>
                        <button type="button" onClick={e => this.props.onEdit(item.id)}>Editar</button>
                        <button type="button" onClick={e => this.props.onDelete(item.id)}>Borrar</button>
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
                    if(!errors[cntr.name])
                        // eslint-disable-next-line default-case
                        switch(cntr.name) {
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
        if(this.props.isAdd) {
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
