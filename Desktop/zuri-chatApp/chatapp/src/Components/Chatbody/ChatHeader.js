import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "./ChatHeader.css";
const ChatHeader = ({ roomInfos, value, image, hash }) => {
    return (
        <div className="chat__header">
            <div className="chat__details">
                <Link to="/" className="chat__backBtn">
                    <ArrowBackIosIcon />
                </Link>
                <div className="channel__avatar">
                    <Avatar src={image} />
                </div>
                <div className="channel__info">

                    <h3> {hash}{roomInfos?.name || roomInfos?.displayName}</h3>
                    <p>{value}</p>
                </div>
            </div>
            <div className="channel__icons">
                <ExploreIcon />
                <MoreVertIcon />
            </div>
        </div>
    )
}
export default ChatHeader