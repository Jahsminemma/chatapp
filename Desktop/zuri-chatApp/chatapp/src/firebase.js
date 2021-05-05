import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyAA6TTnIqhRMzljvzzhA14m2ocoMA9i71k",
    authDomain: "stanchat-ffccb.firebaseapp.com",
    projectId: "stanchat-ffccb",
    storageBucket: "stanchat-ffccb.appspot.com",
    messagingSenderId: "933345507074",
    appId: "1:933345507074:web:b741e0006878010b61741b",
    measurementId: "G-6Q0BGFPTTG"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider, storage };
export default db;
