import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core'
import db, { auth, provider } from "../../firebase"
import { useStateValue } from "../../StateProvider"
import { actionType } from "../../auth.reducer"
import firebase from 'firebase/app'
import 'firebase/auth'

const Login = () => {
    const [state, dispatch] = useStateValue();

    /*sign in user after successful authentication */
    const signIn = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            return auth
                .signInWithPopup(provider)
                .then((data) => {
                    db.collection("users").doc(data.user.uid)
                        .set({
                            displayName: data.user.displayName,
                            email: data.user.email,
                            photoURL: data.user.photoURL,
                            uid: data.user.uid,
                            isCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                            isOnline: true
                        }).then(() => {
                            const loggedInUser = {
                                displayName: data.user.displayName,
                                email: data.user.email,
                                photoURL: data.user.photoURL,
                                uid: data.user.uid,
                                isCreatedAt: firebase.firestore.FieldValue.serverTimestamp()
                            }
                            localStorage.setItem("User", JSON.stringify(loggedInUser))
                            dispatch({
                                type: actionType.SET_USER,
                                user: loggedInUser
                            })
                        })
                })
                .catch(error => {
                    dispatch({
                        type: `${actionType.SET_USER}_FAILURE`,
                        error: error
                    })
                    alert(error.message)
                })
        })
    }
    return (
        <div className="login">
            <div className="login__content">
                <img src="https://res.cloudinary.com/zuri-team/image/upload/zuriboard/tenant-logo/ms5faj5pae6nd03wazk1.png"
                    alt="Logo" />
                <h2>Stay Connected with your Zuri team members</h2>
                <p>Zuri chats connects you with friends and team mates and allows you to have one on one chat with them</p>
                <Button onClick={signIn}>Sign in with google</Button>
                <h5>Developed by Okonkwo Emmanuel</h5>
            </div>
        </div>
    )
}

export default Login
