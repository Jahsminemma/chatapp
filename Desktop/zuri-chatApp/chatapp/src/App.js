import './App.css';
import { useEffect, useState } from 'react'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Chathome from './Components/Chatbody/Chathome'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signup from '../src/Components/authAccount/Login'
import { useStateValue } from "./StateProvider"
import { actionType } from './auth.reducer'
import UserChatScreen from './Components/Chatbody/UserChatScreen';


function App() {
    const [state, dispatch] = useStateValue()
    const [size, setSize] = useState(window.innerWidth)


    //check for screen size
    const checkSize = () => {
        setSize(window.innerWidth)
    }

    useEffect(() => {
        // check if user is logged in
        //get authuser credentials from localstorage 
        const isLoggedInUser = () => {
            const User = localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null;

            //set authuser to global state
            if (User) {
                dispatch({
                    type: actionType.SET_USER,
                    user: User
                })
            } else {
                dispatch({
                    type: `${actionType.SET_USER}_FAILURE`,
                    error: { error: "login again " }
                })
            }
        }
        isLoggedInUser()
        window.addEventListener("resize", checkSize)
        return () => {
            window.removeEventListener("resize", checkSize)
        }

    }, [])

    return (
        <div className="app">
            <Router>
                {
                    !state.auth.authenticated ? (
                        <Signup />
                    ) : (
                        <>
                            <Header />
                            {size > 700 ? (
                                <div className="app__body">
                                    <Sidebar />
                                    <Switch>
                                        <Route path='/' exact component={Chathome} />
                                        <Route path="/user/:userId" component={UserChatScreen} />
                                    </Switch>
                                </div>
                            ) : (
                                <div className="app__mobileView">
                                    <Switch>
                                        <Route path='/' exact component={Sidebar} />
                                        <Route path="/user/:userId" component={UserChatScreen} />
                                    </Switch>
                                </div>
                            )}
                        </>
                    )
                }
            </Router>
        </div>
    );
}

export default App;
