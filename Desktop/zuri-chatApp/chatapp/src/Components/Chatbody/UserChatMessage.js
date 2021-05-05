import React, { useRef, useEffect } from 'react'
import { useStateValue } from "../../StateProvider";
import Loader from "react-loader-spinner";
import './UserChatMessage.css'
import "./Message.css"
import ReactReadMoreReadLess from "react-read-more-read-less";
import DoneIcon from '@material-ui/icons/Done';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';



const UserChatMessage = ({ Messages, progress }) => {
    const [state] = useStateValue()
    const scrollToView = useRef(null)

    const scrollToBottom = () => {
        scrollToView.current.scrollIntoView({ behaviour: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [Messages])
    return (
        <div style={{ marginTop: "120px", textAlign: "left" }} className="chatMessage">
            <div className="chat__message">
                {Messages.map(userMessage => {

                    const { authUserId, imageUrl, pdfUrl, audioUrl, createdAt, message, pdfName, audioName, isView } = userMessage;
                    if (state.auth.user.uid === authUserId) {

                        return (
                            <div style={{ textAlign: "right", marginRight: "10px", marginLeft: "100px" }} key={createdAt} className="message">
                                <div style={{ backgroundColor: "#a3c9f5" }} className="message__content">
                                    <div className="message__item">
                                        {pdfUrl ? <div className="pdf-content">
                                            <a href={pdfUrl}>
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEX////LBgbygYHKAADcfHzPMTHUU1PXZWXfiorMFxfHAAD0hobUKyvknZ3gT0/kn5/WXl7jk5PxeXn71tbgj4/UQED54+P719fWTU366en++Pjwy8vzjIz2r6/329v87+/wxMTccHDVV1fuvLzpqKjiYWHbRUXXNjblXV3iVVXRIiLudHTihobrsrLSOTnfe3vNEhKAWPopAAAE6ElEQVR4nO3daXuaQBSGYfC4UoghcSUtuCRdbGL8/7+uKhBBiAxmPDND3+cbF2q9AziDVLUshBBCCCGEEEIIIYQQQggh0wu91bYjoZfvh6aqOYXWrkNyumsdenhULcoXzRyy5UR33zQkPm5k+U7C1oNGO2pI8oAnoUbEwJYIzAj12VHvZQKzQl2ITzL30bxQkx1V7ibMC7XYipHcTXgm1IG4cKQCz4Ua7Ki+3E1YEKontm8tVL6j3l6omsggVLyjcgjVbkUWoVIij1AlkUmo8FjkEqrbimxCZUQ+oaodlVGoaCtyCtUQWYVKiLxCFURmoQIit5CfyC5kJ/ILuYkKhMxEFUJeohIhK1GNkJMoXfhTSMhIVCXkI0oXbgWFbETpwoEgkI0oW2iTsJCJKF/4ohlRvvCX6IHIRJQutOlBXMhBvIGw1kb8YaDQpt/iREOF9CJMNFO4N/5pic5sDBXatPn9t/VNoJapwv2eSoONW93m1VRhjBSobbBQ7M8AIYQQQgghhBBCCCGEl4TnM+RPV1Xcr+QmeghpM/xo1F7tMs+TqJ+s8EbLcUE/Gp7Vv0RUKPTyN4veZukTpfvcmtDbZghnK4+t9BT6hVsuBvQJYu2eNrDJQmseQ0oQwTL9TIPZQmty3B3LENa7Y6owmO8L0hv7OeE8Ck6P0/1sF7asmdbC3uHDs24vjJeOHyFKEW/7FSsvSh5nTrld+G3WTRtrOlokwsPf/zAgTOLFTkbox4PdOnmgfk7YFhsONREeFlfx4ntOeFzjJMR57iAVnSrpI9zEi15BaJOdHI3dpgpt5zleHpotHMeLryXCdN1TXihyFGokTLfTrERoO/HyJPtCOxJ7odFAeHd8kk46ylGpMB4xguxKa5I072n+WurvNgN3mY4I6+yOeBKGRf6poebCXIF7hdAzSdjODeonYTIdMF/YjmfXRWE8IEam76WTdAJdGC0oXg6zu3Dw9Bg37RohDKK37sf3uxSEy3h5kRsPnTTdR4vn5XLZ67qUeaKFOc0iXu6bOafZFkft83lpMqWxxmYKS07uzs4t0hOr0NBzi0vCw8mxM54nD7Q8Oz9sgHDhdrrtRfo4ITVPaAWZt2ksN/8+TTOE2dJRr6nC6GNYb6jweVd4z9sA4UhUOPU3JdctDBDao31+2Vqitj+Ke+1t97MdKq68eL1JD6F94S0IoeuHYkBcA4YQQgghhBBCCCGE8L8Xln7C5Yq0FVJn1ZWStu95U1B9X6Hedb1uQbL+AW2vPUkTanv9EELhmi/U9ziU9Vp6eUqhcjwc96RU8aX2mNPcUsgThBBC+H8Lb/TiqY+QVqP+VQ1qEU2cta0bL6z3sy4QSgjC2jVf+GSMcF5939Lq/byS0v+LMbguY0b8q+c0tYCYl0IIIYTNFpJTmYy/jcIRv1d9Vxk/nahQ+Fx913rzM+2EQwgh1F7Y/OPQq76r4ULyvapco0cLoZOnrwMxa4MQQgghhBBCCOUk40T9K8Kyb4mRW71LRdJLv1TjhkVSppfXRhRVP8Wvdvmbqm4tFHjD68tNFW5EIpbfJVO4EVk2oWUFO1VE2sn6b7oVhYr2U6KQB7gnyng/oj5wM+UCHr65Q8pFiFo+Z8YwUGRad5xrL2tfleOuq5+U5MLh/bbD03blsR2BCCGEEEIIIYQQQgghhBBCN+sfypGbO0fYqnMAAAAASUVORK5CYII=" alt={pdfName} />
                                                <p>{pdfName}</p>
                                            </a>
                                        </div> : null}
                                        {audioUrl ? <div className="audio-content">
                                            <audio controls controlsList="nodownload">
                                                <source src={audioUrl} />
                            Your browser does not support the audio element.
                         </audio>
                                            <p>{audioName}</p>
                                        </div> : null}
                                        {imageUrl ? <img style={{ width: "100%" }} src={imageUrl} alt="message sent as pics" /> : null}
                                        <p className="message__text"> <ReactReadMoreReadLess
                                            charLimit={600}                            
                                            readMoreText={"Read more"}
                                            readLessText={"Read less"}
                                            readMoreClassName="read-more-less--more"
                                            readLessClassName="read-more-less--less"
                                        >
                                            {message}
                                        </ReactReadMoreReadLess>
                                        </p>
                                        <p className="message__indicator">
                                            <small>{new Date(createdAt?.toDate()).toLocaleTimeString()}</small>
                                            {isView ? <span className="messageRead"><RemoveRedEyeIcon /></span> : <span className="unreadMessage"><DoneIcon /></span>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div style={{ marginLeft: "10px", marginRight: "100px" }} key={createdAt} className="message">
                                <div className="message__content">
                                    <div className="message__item">
                                        {pdfUrl ? <div className="pdf-content">
                                            <a href={pdfUrl}>
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEX////LBgbygYHKAADcfHzPMTHUU1PXZWXfiorMFxfHAAD0hobUKyvknZ3gT0/kn5/WXl7jk5PxeXn71tbgj4/UQED54+P719fWTU366en++Pjwy8vzjIz2r6/329v87+/wxMTccHDVV1fuvLzpqKjiYWHbRUXXNjblXV3iVVXRIiLudHTihobrsrLSOTnfe3vNEhKAWPopAAAE6ElEQVR4nO3daXuaQBSGYfC4UoghcSUtuCRdbGL8/7+uKhBBiAxmPDND3+cbF2q9AziDVLUshBBCCCGEEEIIIYQQQggh0wu91bYjoZfvh6aqOYXWrkNyumsdenhULcoXzRyy5UR33zQkPm5k+U7C1oNGO2pI8oAnoUbEwJYIzAj12VHvZQKzQl2ITzL30bxQkx1V7ibMC7XYipHcTXgm1IG4cKQCz4Ua7Ki+3E1YEKontm8tVL6j3l6omsggVLyjcgjVbkUWoVIij1AlkUmo8FjkEqrbimxCZUQ+oaodlVGoaCtyCtUQWYVKiLxCFURmoQIit5CfyC5kJ/ILuYkKhMxEFUJeohIhK1GNkJMoXfhTSMhIVCXkI0oXbgWFbETpwoEgkI0oW2iTsJCJKF/4ohlRvvCX6IHIRJQutOlBXMhBvIGw1kb8YaDQpt/iREOF9CJMNFO4N/5pic5sDBXatPn9t/VNoJapwv2eSoONW93m1VRhjBSobbBQ7M8AIYQQQgghhBBCCCGEl4TnM+RPV1Xcr+QmeghpM/xo1F7tMs+TqJ+s8EbLcUE/Gp7Vv0RUKPTyN4veZukTpfvcmtDbZghnK4+t9BT6hVsuBvQJYu2eNrDJQmseQ0oQwTL9TIPZQmty3B3LENa7Y6owmO8L0hv7OeE8Ck6P0/1sF7asmdbC3uHDs24vjJeOHyFKEW/7FSsvSh5nTrld+G3WTRtrOlokwsPf/zAgTOLFTkbox4PdOnmgfk7YFhsONREeFlfx4ntOeFzjJMR57iAVnSrpI9zEi15BaJOdHI3dpgpt5zleHpotHMeLryXCdN1TXihyFGokTLfTrERoO/HyJPtCOxJ7odFAeHd8kk46ylGpMB4xguxKa5I072n+WurvNgN3mY4I6+yOeBKGRf6poebCXIF7hdAzSdjODeonYTIdMF/YjmfXRWE8IEam76WTdAJdGC0oXg6zu3Dw9Bg37RohDKK37sf3uxSEy3h5kRsPnTTdR4vn5XLZ67qUeaKFOc0iXu6bOafZFkft83lpMqWxxmYKS07uzs4t0hOr0NBzi0vCw8mxM54nD7Q8Oz9sgHDhdrrtRfo4ITVPaAWZt2ksN/8+TTOE2dJRr6nC6GNYb6jweVd4z9sA4UhUOPU3JdctDBDao31+2Vqitj+Ke+1t97MdKq68eL1JD6F94S0IoeuHYkBcA4YQQgghhBBCCCGE8L8Xln7C5Yq0FVJn1ZWStu95U1B9X6Hedb1uQbL+AW2vPUkTanv9EELhmi/U9ziU9Vp6eUqhcjwc96RU8aX2mNPcUsgThBBC+H8Lb/TiqY+QVqP+VQ1qEU2cta0bL6z3sy4QSgjC2jVf+GSMcF5939Lq/byS0v+LMbguY0b8q+c0tYCYl0IIIYTNFpJTmYy/jcIRv1d9Vxk/nahQ+Fx913rzM+2EQwgh1F7Y/OPQq76r4ULyvapco0cLoZOnrwMxa4MQQgghhBBCCOUk40T9K8Kyb4mRW71LRdJLv1TjhkVSppfXRhRVP8Wvdvmbqm4tFHjD68tNFW5EIpbfJVO4EVk2oWUFO1VE2sn6b7oVhYr2U6KQB7gnyng/oj5wM+UCHr65Q8pFiFo+Z8YwUGRad5xrL2tfleOuq5+U5MLh/bbD03blsR2BCCGEEEIIIYQQQgghhBBCN+sfypGbO0fYqnMAAAAASUVORK5CYII=" alt="reviewed pics" />
                                                <p>{pdfName}</p>
                                            </a>
                                        </div> : null}
                                        {audioUrl ? <div className="audio-content">
                                            <audio controls controlsList="nodownload">
                                                <source src={audioUrl} />
                                                    Your browser does not support the audio element.
                                            </audio>
                                            <p>{audioName}</p>
                                        </div> : null}
                                        {imageUrl ? <img style={{ width: "100%" }} src={imageUrl} alt=" message as file" /> : null}

                                        <p className="message__text"> <ReactReadMoreReadLess
                                            charLimit={600}                            
                                            readMoreText={"Read more"}
                                            readLessText={"Read less"}
                                            readMoreClassName="read-more-less--more"
                                            readLessClassName="read-more-less--less"
                                        >
                                            {message}
                                        </ReactReadMoreReadLess>
                                        </p>
                                        <small style={{ fontSize: "10px", float: "right" }}>{new Date(createdAt?.toDate()).toLocaleTimeString()}</small>
                                    </div>
                                </div>
                            </div>
                        )
                    }
        })}
    </div>
            {
               progress &&  parseInt(progress) < 100 ? <div className="loader">
                <Loader type="Bars" color="#00BFFF"
                    height={60} width={80} />
                    <p style={{ color: "#00BFFF", fontWeight: "600" }}>Audio....{ Math.round(progress)}%</p>
            </div> : null
            
            }
            <div style={{ height: "60px" }}
                ref={scrollToView}>
            </div>
        </div>
    )
}

export default UserChatMessage

