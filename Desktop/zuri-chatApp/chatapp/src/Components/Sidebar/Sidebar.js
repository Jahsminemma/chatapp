import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption/SidebarOption'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PeopleIcon from '@material-ui/icons/People';
import { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import db from "../../firebase"
import { useStateValue } from "../../StateProvider"
import { userAction } from '../../user.reducer';



const Sidebar = () => {
    const [channels, setChannel] = useState([])
    const [state, dispatch] = useStateValue()

    useEffect(() => {

        //get room details
        db.collection('rooms').onSnapshot(snapshot => (
            setChannel(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name
            })))))

        //get all users from database 
        const getDbUsers = () => {
            db.collection("users")
                .onSnapshot(snapshot => {

                    //empty array to hold all the users
                    const userData = []
                    snapshot.forEach(doc => {
                        if (state.auth.user.uid !== doc.id) {
                            userData.push(doc.data())
                        }
                    })

                    //store users to global state
                    dispatch({
                        type: userAction.REALTIME_USER,
                        user: userData

                    })
                })

        }
        getDbUsers()

    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__content">
                <SidebarOption color={"lightblue"} Icon={PeopleIcon} title={"Direct message"} />

                {state.users.user.map((userData) => {
                    const { photoURL, uid, displayName, isOnline } = userData;
                    return (
                        <div key={uid} className="Sidebar__userOption">
                            <SidebarOption isOnline={isOnline} addUserOption Indicator={FiberManualRecordIcon} Icon={Avatar} photoURL={photoURL} title={displayName} uid={uid} />
                            <hr/>
                        </div>

                    )
                })}
            </div>
            <div style={{ height: "50px" }}></div>
        </div>
    )
}

export default Sidebar
