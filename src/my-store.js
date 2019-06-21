import { combineReducers, createStore } from 'redux';

const INIT_STORE = 'INIT_STORE';
export const InitStoreAction = () => ({ type: INIT_STORE});

const COUNTER_UP = "COUNTER_UP";
const COUNTER_DOWN = "COUNTER_DOWN";
const COUNTER_INIT = "COUNTER_INIT";

function contadorReducer(state = 0, action) {
    switch (action.type) {
        case COUNTER_UP:
            return state + 1;
        case COUNTER_DOWN:
            return state - 1;
        case COUNTER_INIT:
        case INIT_STORE:
                return 0;
        default:
            return state;
    }
}

export const CounterUpAction = () => ({ type: COUNTER_UP });
export const CounterDownAction = () => ({ type: COUNTER_DOWN });
export const CounterInitAction = () => ({ type: COUNTER_INIT });

export const globalReducer = combineReducers({
    contador: contadorReducer,
});

const initialState = { contador: 10 };

export const store = createStore(globalReducer, initialState)

export const CounterUpCmd = () => store.dispatch(CounterUpAction());
export const CounterDownCmd = () => store.dispatch(CounterDownAction());
export const CounterInitCmd = () => store.dispatch(CounterInitAction());
