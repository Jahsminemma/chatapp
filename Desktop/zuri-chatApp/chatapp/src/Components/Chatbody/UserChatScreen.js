import React, { useState, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import { useParams } from 'react-router-dom'
import MessageInput from './MessageInput'
import './UserChatScreen.css'
import db, { storage } from '../../firebase'
import firebase from 'firebase'
import { useStateValue } from '../../StateProvider'
import { userAction } from '../../user.reducer'
import UserChatMessage from './UserChatMessage'
import TimeAgo from "timeago-react"
import ImageModal from "./ImageModal"
import { errorHandler, snapshot } from './uploadFile'




const UserChatScreen = () => {
    const { userId } = useParams()
    const [userInfos, setUserInfos] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [state, dispatch] = useStateValue()
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState("")
    const [pdf, setPdf] = useState("")
    const [audio, setAudio] = useState("")
    const [readerResult, setReaderResult] = useState("")
    const [progress, setProgress] = useState("")

    const updateMessage = (messageObj) => {
        db.collection("conversations").add({
            ...messageObj,
            isView: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).catch(error => {
            console.log(error)
        })
    }

    const sendMessage = (e) => {
        e.preventDefault()
        setOpen(false)
        setImage(false)
        setPdf(false)
        setAudio(false)
        setInputValue("")
        const messageObj = {
            authUserId: state.auth.user.uid,
            userId: userId,
            message: inputValue,
        }
        if (!image && !pdf && !audio && inputValue) {
            db.collection("users").doc(state.auth.user.uid)
                .update({
                    isCreatedAt: firebase.firestore.FieldValue.serverTimestamp()
                })
            updateMessage(messageObj)
            setInputValue("")
        }
        const storageRef = storage.ref();

        //upload image to storage
        if (image) {
            const uploadImage = storageRef.child(`images/${image.name}`).put(image);
            uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot,
                errorHandler,
                () => {
                    //get image url
                    uploadImage
                        .snapshot.ref.getDownloadURL().then((URL) => {
                            if (URL && image) {
                                //save message with image Url to database
                                db.collection("conversations")
                                    .add({
                                        ...messageObj,
                                        isView: false,
                                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                        imageUrl: URL
                                    })
                            }
                        })
                }
            );
        }

        //save pdf files to storage
        if (pdf) {
            const uploadPdf = storageRef.child(`pdf/${pdf.name}`).put(pdf);
            uploadPdf.on(firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot,
                errorHandler,
                () => {
                    //get pdf url from storage
                    uploadPdf
                        .snapshot.ref.getDownloadURL().then((URL) => {
                            if (URL && pdf) {
                                //update user timestamp
                                db.collection("users").doc(state.auth.user.uid)
                                    .update({
                                        isCreatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                    })
                                //save message with pdf url to database
                                db.collection("conversations")
                                    .add({
                                        ...messageObj,
                                        isView: false,
                                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                        pdfUrl: URL,
                                        pdfName: pdf.name
                                    })
                            }
                        })
                }
            );
        }

        //upload audio to storage
        if (audio) {
            const uploadAudio = storageRef.child(`audio/${audio.name}`).put(audio);
            uploadAudio.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    const Isprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(Isprogress)
                    console.log(progress)
                },
                errorHandler,
                () => {
                    // get audio url from storage
                    uploadAudio
                        .snapshot.ref.getDownloadURL().then((URL) => {
                            if (URL && audio) {
                                //update user timestamp
                                db.collection("users").doc(state.auth.user.uid)
                                    .update({
                                        isCreatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                    })
                                //add message with audio url to database
                                db.collection("conversations")
                                    .add({
                                        ...messageObj,
                                        isView: false,
                                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                        audioUrl: URL,
                                        audioName: audio.name
                                    })
                            }
                        })
                }
            );
        }

    }


    useEffect(() => {
        if (userId) {
            db.collection("users")
                .doc(userId).onSnapshot(doc => {
                    setUserInfos(doc.data())
                })
        }
        //get realtime conversations from database
        //query users with authUserId in the conversation collection
        const getRealTimeConversation = (userId, authUserId) => {
            db.collection("conversations")
                .where("authUserId", "in", [userId, authUserId])
                .orderBy("createdAt", "asc")
                .onSnapshot(snapshot => {
                    const conversation = []
                    snapshot.forEach(doc => {
                        if ((doc.data().authUserId === authUserId && doc.data().userId === userId)
                            || (doc.data().authUserId === userId && doc.data().userId === authUserId)) {
                            conversation.push(doc.data())
                        }
                    })
                    // add converations to global state
                    dispatch({
                        type: userAction.REALTIME_CONVERSATION,
                        conversations: conversation
                    })
                })
        }
        getRealTimeConversation(userId, state.auth.user.uid)
    }, [userId])
    return (
        <div className="userChatScreen">
            <ChatHeader roomInfos={userInfos} image={userInfos?.photoURL}
                value={userInfos?.isOnline ? (
                    <small>Last seen : <TimeAgo datetime={userInfos?.isCreatedAt.toDate()} /></small>
                ) : ("offline")} />
            <UserChatMessage Messages={state.users.conversations} progress={progress} />
            <ImageModal Image={image} setAudio={setAudio} audio={audio} pdf={pdf} setPdf={setPdf} setImage={setImage} setOpen={setOpen} open={open} readerResult={readerResult} />
            <div className="message__input">
                < MessageInput
                    image={image}
                    setImage={setImage}
                    sendMessage={sendMessage}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    readerResult={readerResult}
                    setReaderResult={setReaderResult}
                    setOpen={setOpen}
                    setPdf={setPdf}
                    setAudio={setAudio}
                    userId={userId}
                />
            </div>
        </div>
    )
}

export default UserChatScreen
