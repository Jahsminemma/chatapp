import React, { useEffect, useState } from 'react'
import './SidebarOption.css'
import db from "../../../firebase";
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../../StateProvider';
import { userAction } from '../../../user.reducer';


const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export const readMessage = (userId, authUserId) => {
    db.collection("conversations")
        .where("authUserId", "in", [authUserId, userId])
        .where("authUserId", "==", userId)
        .where("userId", "==", authUserId)
        .where("isView", "==", false)
        .get()
        .then(snapshot => {
            if (snapshot.size > 0) {
                snapshot.forEach(message => {
                    db.collection("conversations").doc(message.id).update({ isView: true })
                })
            }
        })
}


const SidebarOption = ({ Icon, unreadMessage, title, id, uid, addUserOption, photoURL, color, Indicator, isOnline }) => {
    const history = useHistory()
    const MuiCoreClass = useStyles()
    const [state, dispatch] = useStateValue()
    const [messages, setMessages] = useState()

    useEffect(() => {
        if (uid) {
            db.collection("conversations")
                .where("authUserId", "in", [state.auth.user.uid, uid])
                .where("authUserId", "==", uid)
                .where("isView", "==", false)
                .onSnapshot(snapshot => {
                    const unreadMessage = []
                    snapshot.forEach(doc => {
                        if ((doc.data().authUserId === state.auth.user.uid && doc.data().userId === uid)
                            || (doc.data().authUserId === uid && doc.data().userId === state.auth.user.uid)) {
                            unreadMessage.push(doc.data())
                        }
                    })
                    dispatch({
                        type: userAction.UNREAD_MESSAGES,
                        messages: unreadMessage
                    })

                })
        }
    }, [])

    const selectUser = () => {

        if (uid) {
            readMessage(uid, state.auth.user.uid)
            history.push(`/user/${uid}`)
        }

    }


    return (
        <div style={{ color: `${color}` }} className="sidebarOption">
            <div className="sidebarOption__details" onClick={addUserOption ? selectUser : null}>
                {Icon && <Icon src={photoURL} alt={title} className={` sidebarOption__icon ${MuiCoreClass.small}`} />}
                {isOnline ? (
                    <span className="sidebarOption__userPresence">
                        {Indicator && <Indicator />}
                    </span>
                ) : (
                    <span className="sidebarOption__offline">
                        {Indicator && <Indicator />}
                    </span>
                )}
                {Icon ? <>
                    <h4>{title}</h4>
                    {state.users.messages && state.users.messages.map(unread => {
                        return (
                            <small>{unread.uid}</small>
                        )
                    })}

                </>
                    :
                    (
                        null
                    )}
            </div>
        </div>
    )
}

export default SidebarOption
