
export const errorHandler = (error) => {
    switch (error.code) {
        case 'storage/unauthorized':
            alert("you don't have permission to access the object")
            break;
        case 'storage/canceled':
            alert(" you have cancel the upload")
            break;
        default:
            return true
    }
}

export const snapshot = (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
}

export const audioFileUpload = ({ audio, db, roomId, authId, messageObj, firebase, uploadAudio }) => {
    return () => {
        // Upload completed successfully
        //get the download URL
        uploadAudio
            .snapshot.ref
            .getDownloadURL()
            .then((URL) => {
                if (URL && audio) {
                    if (roomId) {
                        db.collection("rooms").doc(roomId).collection("messages")
                            .add({
                                ...messageObj,
                                audioName: audio.name,
                                audioUrl: URL
                            })
                    }
                }
            })
    }
}
export const pdfFileUpload = ({ pdf, db, roomId, authId, messageObj, firebase, uploadPdf }) => {
    return () => {
        // Upload completed successfully
        //get the download URL
        uploadPdf
            .snapshot.ref
            .getDownloadURL()
            .then((URL) => {
                if (URL && pdf) {
                    if (roomId) {
                        db.collection("rooms").doc(roomId).collection("messages")
                            .add({
                                ...messageObj,
                                pdfName: pdf.name,
                                pdfUrl: URL
                            })
                    }
                }
            })
    }
}


export const imageFileUpload = ({ image, db, roomId, messageObj, uploadImage }) => {
    return () => {
        // Upload completed successfully
        //get the download URL
        uploadImage
            .snapshot.ref
            .getDownloadURL()
            .then((URL) => {
                if (URL && image) {
                    db.collection("rooms").doc(roomId).collection("messages")
                        .add({
                            ...messageObj,
                            imageUrl: URL
                        })
                }
            })
    }
}