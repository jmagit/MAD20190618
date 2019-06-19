import React, { Component } from 'react'

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
        if(this.state.listado.length === 0) {
            this.setState({ modo: 'list', listado: [
                { id: 1, nombre: 'Carmelo', apellido: 'Coto', edad: 34},
                { id: 2, nombre: 'Pepito', apellido: 'Grillo', edad: 155},
                { id: 3, nombre: 'Pedro', apellido: 'Pica Piedra', edad: 51},
                { id: 4, nombre: 'Pablo', apellido: 'Marmol', edad: 47},
            ]});
        } else {
            this.setState({ modo: 'list'});
        }
    }
    add() {
        this.setState({ modo: 'add', elemento: { id: '', nombre: '', apellido: '', edad: ''}});
    }
    edit(key) {
        // eslint-disable-next-line eqeqeq
        let rslt = this.state.listado.find(item => item[this.pk] == key);
        if(rslt) {
            this.setState({ modo: 'edit', elemento: Object.assign({}, rslt) });
            this.idOriginal = key;
        } else {
            console.error('Elemento no encontrado');
        }
    }
    view(key) {
        // eslint-disable-next-line eqeqeq
        let rslt = this.state.listado.find(item => item[this.pk] == key);
        if(rslt) {
            this.setState({ modo: 'view', elemento: Object.assign({}, rslt) });
        } else {
            console.error('Elemento no encontrado');
        }
    }
    remove(key) {
        if(!window.confirm('¿Seguro?')) return;
        // eslint-disable-next-line eqeqeq
        let ind = this.state.listado.findIndex(item => item[this.pk] == key);
        if(ind >= 0) {
            this.setState((prev) => ({ modo: 'list', 
                listado: prev.listado.find(item => item[this.pk] != key) }));
        } else {
            console.error('Elemento no encontrado');
        }
    }

    cancel() {
        this.setState({ elemento: {} });
        this.idOriginal = null;
        this.list();
    }
    send() {
        // eslint-disable-next-line default-case
        switch(this.state.modo) {
            case 'add': 
                this.setState((prev) => ({ 
                    listado: Object.assign([], prev.listado, prev.elemento)})
                );
                this.cancel();
                break;
            case 'edit': 
                this.setState((prev) => ({ 
                    listado: prev.listado.map(item => item[this.pk] == this.idOriginal ? prev.elemento : item)})
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
}
class PersonasLst extends Component {
}
class PersonasView extends Component {
}
class PersonasForm extends Component {
}
