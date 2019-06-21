import React from 'react'
import { connect } from 'react-redux'
import * as db from './my-store'

const otroCounter = ({ contador, onSube, onBaja }) => (
    <div>
      <h1>{contador}</h1>
      <p><button onClick={onSube}>Sube</button>&nbsp; <button onClick={onBaja}>Baja</button></p>
    </div>
)

export const OtroCounter = connect(
    (state, ownProps) => {
        return {
            contador: state.contador
        }
    },
    (dispatch, ownProps) => {
        return {
            onSube: () => { dispatch(db.CounterUpAction()) },
            onBaja: () => { dispatch(db.CounterDownAction()) },
        }
    }
)(otroCounter)
