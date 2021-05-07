import { useReducer, useContext, createContext } from "react"

const stateContext = createContext()

export const StateProvider = ({ reducer, children }) => (
    <stateContext.Provider value={useReducer(reducer, InitialState)}>
        {children}
    </stateContext.Provider>
);

export const useStateValue = () => useContext(stateContext)
