import React, {useState } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { generatePublicUrl } from '../../urlConfig';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import MoneyIcon from '@mui/icons-material/Money';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { useTranslation } from 'react-i18next';
import {  useTheme , Divider, Button } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import { deleteProductById, updateProductById } from '../../actions/product.action';
import { useDispatch } from 'react-redux';





const LIST = ({ text, value ,Icon })=>{




  return(
    <ListItem>
      <ListItemAvatar>
           <Icon /> 
      </ListItemAvatar>
      <ListItemText
       sx={{ margin: '0px 16px' }}
       primary={text}
      />
       <ListItemText
       primary={value}
      />
   </ListItem>
  )
}



const ViewServices = () => {
    const [dense, setDense] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {CurrentProduct} = useSelector(state=>state.product)
    const theme = useTheme();
    const { t} = useTranslation();
    const icons = [MoneyIcon, PriceCheckIcon, HourglassTopIcon, AirportShuttleIcon];
    const texts = [t('priceTotal'), t('originalPrice'), t('WarrantPeriod'), t('deliveryTerm') , t("originalPrice") ,
    t('state') , t('seller')];
    const Demo = styled('div')(({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
    }));
     
  
  
  
    return (
    <div className="news">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
        <h1>{CurrentProduct?.name}</h1>
        <ToastContainer />

      </div>
      <div className="bottom">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <ImageList sx={{ maxWidth: 700, maxHeight: 700
          , minHeight:500,
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "#F0F4FA"
                    : theme.palette.background.paper,
        
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                borderRadius:"30px",
                padding:"1rem"
       
        }} cols={3} rowHeight={164}>
      {CurrentProduct?.images?.map((item ,index) => (
        <ImageListItem key={item.img}>
          <img
           sx={{ 
                  borderRadius:"30px",}}
            src={`${generatePublicUrl(item)}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${generatePublicUrl(item)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={index}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
       
        </Grid>
        <Grid item xs={12} md={6}>
        <Box
            sx={{
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F0F4FA"
                  : theme.palette.background.paper,
      
              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
              borderRadius:"30px",
              padding:"1rem"
            }}>
        <Typography variant="h6" gutterBottom>   
        {CurrentProduct?.name}

     
      </Typography>
      <Typography variant="body1" gutterBottom>
         {CurrentProduct?.description}
      </Typography>
      <Divider />
        </Box>
                     <Demo>
                       <List dense={dense} 
                          sx={{
                            backgroundColor:
                              theme.palette.mode === "light"
                                ? "#F0F4FA"
                                : theme.palette.background.paper,
                    
                            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                            borderRadius:"30px",
                            padding:"1rem"
                            ,marginTop:"1rem"
                          }}>
                        <LIST
                         text={texts[0]}
                        value = {CurrentProduct?.priceTotal}
                          Icon ={icons[0]}
                        />
                          <LIST
                         text={texts[4]}
                        value = {CurrentProduct?.originalPrice}
                          Icon ={icons[0]}
                        />
                              <LIST
                         text={"site price"}
                        value = {CurrentProduct?.sitePrice}
                          Icon ={icons[0]}
                        />
                           <LIST
                         text={texts[5]}
                        value = {CurrentProduct?.state}
                          Icon ={icons[0]}
                        />
                              <LIST
                         text={texts[6]}
                        value = {CurrentProduct?.shopId?.firstname + " " + CurrentProduct?.shopId?.lastname  }
                          Icon ={icons[0]}
                        />
                           <LIST
                          text={texts[1]}
                          value= {CurrentProduct?.originalPrice}
                          Icon ={icons[1]}
                        />
                           <LIST
                          text={texts[2]}
                          value= {CurrentProduct?.WarrantPeriod}
                          Icon ={icons[2]}
                        />
                           <LIST
                         text={texts[3]}
                        value= {CurrentProduct?.deliveryTerm}
                        Icon ={icons[3]}
                        />
                       </List>
                     </Demo>
        </Grid>

        {CurrentProduct?.state === "waiting_confirmation" && (
          <Grid sx={{
                     alignItems:"center",display:"flex",justifyContent:"center", backgroundColor:
                              theme.palette.mode === "light"
                                ? "#F0F4FA"
                                : theme.palette.background.paper,
                    
                            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                            borderRadius:"30px",
                            margin:"1rem",
                            padding:".5rem"
                  
              
            }} item xs={5} md={5}>
            <Button variant="outlined"  sx={{
                          marginX:"2rem",
                          padding:"1rem",
                          borderRadius:".4rem",
                          minWidth:"150px"
              
            }} onClick={()=>{
            dispatch(updateProductById(CurrentProduct._id))
  
            }} >{t('accept')}</Button>
                 <Button variant="outlined" color="error" sx={{
              marginX:"2rem",
              padding:"1rem",
              borderRadius:".4rem",
              minWidth:"150px"
            }}
            onClick={()=>{
              dispatch(deleteProductById(CurrentProduct._id))
            }} 
            >{t('delete')}</Button>
          </Grid>
        )}
      </Grid>
    </Box>
      </div>
    </div>
  </div>

  )
}

export default ViewServices