import React from 'react'
import loading from './loading.gif';

export default class ValidationMessage extends React.Component {
    render() {
        if (this.props.msg) {
            return <span className="errorMsg">{this.props.msg}</span>;
        }
        return null;
    }
}
export class Esperando extends React.Component {
    render() {
        return <div>
        <div class="ajax-wait"></div>
        <img src={loading} alt="Cargando ..." />
      </div>;
    }
}
