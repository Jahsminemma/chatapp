import React from 'react'
import "./Header.css"
import { Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Link } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { actionType } from '../../auth.reducer'
import db from '../../firebase'



const Header = () => {


    const [state, dispatch] = useStateValue()

    const logout = () => {
        db.collection("users")
            .doc(state.auth.user.uid)
            .update({
                isOnline: false
            }).then(() => {
                localStorage.clear()
                dispatch({
                    type: actionType.SET_LOGOUT
                })
            }).catch(error => {
                alert(error.message)
            })
    }

    return (
        <div className="header">
            <div className="header__left">
                <div className="sidebar__top">
                    <div className="sidebar__details">
                        <Link style={{ "textDecoration": "none", color: "lightgrey" }} to="/">
                            <h4>
                                <img src="https://res.cloudinary.com/zuri-team/image/upload/zuriboard/tenant-logo/ms5faj5pae6nd03wazk1.png" alt="" />
                                <p style ={{marginRight:"10px"}}>Zuri chat</p>
                            </h4>
                        </Link>
                        <h5>
                            <FiberManualRecordIcon />
                            {state.auth.user.displayName}
                        </h5>
                    </div>
                </div>
                 <Avatar className="header__avatar" src={state.auth.user?.photoURL} alt={state.auth.user?.name} />
            </div>

            <div onClick={logout} className="header__help">
                <SettingsIcon />
                <h2>logout</h2>
            </div>
        </div>

    )
}

export default Header
