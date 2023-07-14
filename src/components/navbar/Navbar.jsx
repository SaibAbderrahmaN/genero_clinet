import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import useSettings from "../../hooks/useSettings";
import { Button } from "@mui/material";


const Navbar = () => {
  const auth = useSelector((state)=>state.auth)
  const { withdrawableInvitations} = useSelector(state=> state.invitations)

  const { onToggleMode } = useSettings();
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => onToggleMode()}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <Link to="/invitations">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">{withdrawableInvitations?.length}</div>
          </div>
          </Link>
          <Link to="/chatApp/app">
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          </Link>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">

            {auth.authenticate ? 
            (  <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />):(
              <Link to='/auth/login'>

                   <Button variant="outlined"  sx={{   marginX:"auto",    borderRadius:".4rem",  minWidth:"100px"    }} >
                     signin
                     </Button>
              </Link>
            )}
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
