export const userInitialState = {
    user: [],
    conversations: [],
    messages: []
}

export const userAction = {
    REALTIME_USER: "REALTIME_USER",
    REALTIME_CONVERSATION: "REALTIME_CONVERSATION",
    UNREAD_MESSAGES: "UNREAD_MESSAGES"
}

const userReducer = (state, action) => {
    switch (action.type) {
        case userAction.REALTIME_USER:
            return {
                ...state,
                user: action.user
            }
        case userAction.REALTIME_CONVERSATION:
            return {
                ...state,
                conversations: action.conversations
            }
        case userAction.UNREAD_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }
        default:
            return state
    }
}
export default userReducer