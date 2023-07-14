import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack } from "@mui/material";
import { Nav_Buttons } from "../../data";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleMobileChat } from "../../redux/slices/app";
import { useSelector } from "react-redux";
import {
  AddressBook 
} from "phosphor-react";



const BottomNav = () => {
  const getPath = (index) => {
    switch (index) {
      case 0:
        return "/chatApp/app";
  
      case 1:
        return "/chatApp/group";
  
      case 2:
        return "/chatApp/call";
  
      case 3:
        return "/chatApp/settings";
  
      default:
        break;
    }
  };
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const  { MobileChat }= useSelector((state)=> state.app)


  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangeTab = (index) => {
    setSelectedTab(index);
    navigate(getPath(index));
    if(!MobileChat.open){

      dispatch(toggleMobileChat())
    }


  };

  return (
    <Box
      sx={{
        zIndex: 1001,
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "66px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        sx={{ width: "100%" }}
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
        spacing={2}
        p={1}
      >  
              <IconButton
              
              onClick={() => {
                if(!MobileChat.open){

                  dispatch(toggleMobileChat())
                }
                
              }}
              sx={{
                width: "max-content",
                color:
                  theme.palette.mode === "light"
                    ? "#080707"
                    : theme.palette.text.primary,
              }}
            >
                 <AddressBook/>
            
            </IconButton>
        {Nav_Buttons.map((el,id) => {
          return el.index === selectedTab ? (
            <Box key={id} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }} p={1}>
              <IconButton key={id} sx={{ width: "max-content", color: "#ffffff" }}>
                {el.icon}
              </IconButton>
            </Box>
          ) : (
            <IconButton
              key={id}
              onClick={() => {
                handleChangeTab(el.index);
              }}
              sx={{
                width: "max-content",
                color:
                  theme.palette.mode === "light"
                    ? "#080707"
                    : theme.palette.text.primary,
              }}
            >
              {el.icon}
            </IconButton>
          );
        })}
      </Stack>
      
    </Box>
  );
};

export default BottomNav;
