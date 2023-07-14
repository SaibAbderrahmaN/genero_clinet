import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { LogoutUser } from "../../redux/slices/auth";
import { useTheme,Box } from "@mui/material";


const Sidebar = () => {
  const Dispatch = useDispatch()
  const {t} = useTranslation()
  const theme = useTheme()
  const logout = () => {
    Dispatch(LogoutUser());
    
 }
 const navigate = useNavigate()
  return (
    <Box
    sx={{
      position: "relative",
      height: "100%",
      backgroundColor:
        theme.palette.mode === "light"
          ? "#F8FAFF"
          : theme.palette.background.paper,
      boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
 
    }}
    className="sidebar">
      <div className="top">
          <span onClick={()=>navigate('/')} className="logo">AdMIN Dashboard</span>

      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <DashboardIcon className="icon" />
            <span> Genero</span>
          </li>
          <p className="title">{t("LISTS")}</p>
          <li onClick={()=>(navigate('/category'))}>
              <StoreIcon className="icon" />
              <span>{t("category")}</span>
            </li>
            <li onClick={()=>(navigate('/Customers'))}>
              <PersonOutlineIcon className="icon" />
              <span>{t('Customers')}</span>
            </li>
           <li onClick={()=>(navigate('/services'))}>
               <StoreIcon className="icon" />
              <span>{t('All articles')}</span>
            </li>
            <li onClick={()=>(navigate('/orders'))}>
              <StoreIcon className="icon" />
              <span>{t('messages')}</span>
            </li>
          
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={logout}>{t('Logout')}</span>
          </li>
        </ul>
      </div>
    </Box>
  );
};

export default Sidebar;
