import React from 'react'

export default class ValidationMessage extends React.Component {
    render() {
        if (this.props.msg) {
            return <span className="errorMsg">{this.props.msg}</span>;
        }
        return null;
    }
}
