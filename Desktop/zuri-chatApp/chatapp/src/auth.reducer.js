export const initialState = {
    displayName: "",
    photoURL: "",
    uid: "",
    authenticated: false,
    isCreatedAt: "",
    error: null
}

export const actionType = {
    SET_USER: "SET_USER",
    SET_LOGOUT: "SET_LOGOUT"
}



const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                authenticated: true,
            }

        case `${actionType.SET_USER}_FAILURE`:
            return {
                ...state,
                authenticated: false,
                error: action.error
            }

        case actionType.SET_LOGOUT:
            state = {
                ...initialState
            }
            break;
    }
    return state

}

export reducer
