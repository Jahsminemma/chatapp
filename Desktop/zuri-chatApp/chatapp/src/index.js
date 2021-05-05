import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from './StateProvider'
import reducer, { initialState } from "./auth.reducer";
import userReducer, { userInitialState } from "./user.reducer";
import combineReducers from "react-combine-reducers"

const [Reducer, InitialState] = combineReducers({
    auth: [reducer, initialState],
    users: [userReducer, userInitialState]
})

ReactDOM.render(
    <>
        <StateProvider InitialState={InitialState} reducer={Reducer} children={App}>
            <App />
        </StateProvider>
    </>,
    document.getElementById('root')
);

