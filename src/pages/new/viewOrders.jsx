import React, {  useState } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import MoneyIcon from '@mui/icons-material/Money';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { useTranslation } from 'react-i18next';
import {  useTheme ,  Divider, Button } from "@mui/material";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { updateOrder } from '../../actions/order.action';





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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




const ViewOrders = () => {
    const [dense, setDense] = useState(false);
    const dispatch = useDispatch()
    const {CurrentOrder} = useSelector(state=>state.order)
    console.log(CurrentOrder)

    const theme = useTheme();
    const { t} = useTranslation();
    const icons = [MoneyIcon, PriceCheckIcon, HourglassTopIcon, AirportShuttleIcon];
    const texts = [t('priceTotal'), t('originalPrice'), t('WarrantPeriod'), t('deliveryTerm') , t("originalPrice") ,
    t('state') , t('seller'), t('firstname'), t('lastname')];
    const Demo = styled('div')(({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
    }));
     
  
  
  
    return (
    <div className="news">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
        <h1> {CurrentOrder?.service?.name}</h1>
        <ToastContainer />

      </div>
      <div className="bottom">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <Box
            sx={{
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F0F4FA"
                  : theme.palette.background.paper,
      
              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
              borderRadius:"30px",
              padding:"1rem",
              textAlign:"center"
            }}>
        <Typography variant="h6" gutterBottom>   
        order information 

     
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
                         text={t('name')}
                        value = {CurrentOrder?.user?.firstname + " " +CurrentOrder?.user?.lastname }
                          Icon ={icons[0]}
                        />
                          <LIST
                         text={t('PhoneNumber')}
                        value = {CurrentOrder?.user?.PhoneNumber}
                          Icon ={icons[0]}
                        />
                           <LIST
                         text={t('email')}
                        value = {CurrentOrder?.user?.email}
                          Icon ={icons[0]}
                        />
                           <LIST
                         text={texts[0]}
                        value = {CurrentOrder?.totalPrice}
                          Icon ={icons[0]}
                        />
                          <LIST
                         text={texts[4]}
                        value = {CurrentOrder?.originalPrice}
                          Icon ={icons[0]}
                        />
                              <LIST
                         text={t("SellerPrice")}
                        value = {CurrentOrder?.SellerPrice}
                          Icon ={icons[0]}
                        />
                             <LIST
                         text={t('sitePrice')}
                        value = {CurrentOrder?.sitePrice}
                          Icon ={icons[0]}
                        />
                            <LIST
                         text={t('Address')}
                        value = {CurrentOrder?.user?.Address}
                          Icon ={icons[0]}
                        />
                          <LIST
                         text={t('paidAt')}
                        value = {moment(CurrentOrder?.paidAt).format('YYYY-MM-DD hh:mm')}
                          Icon ={icons[2]}
                        />
                         <LIST
                         text={t('status')}
                        value = {CurrentOrder?.status}
                          Icon ={icons[2]}
                        />
                           <LIST
                         text={t('paid')}
                        value = {CurrentOrder?.paymentInfo?.status + " " + t("dz") }
                          Icon ={icons[1]}
                        />
                             <LIST
                         text={t('type')}
                        value = {CurrentOrder?.type}
                          Icon ={icons[3]}
                        />
                            <LIST
                         text={t('userIdea')}
                        value = {CurrentOrder?.userIdea}
                          Icon ={icons[3]}
                        />
                       </List>
                     </Demo>
 
       
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
              padding:"1rem",
              textAlign:"center"

            }}>
        <Typography variant="h6" gutterBottom>   
        deal detail

     
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
                         text={t("name")}
                        value = {CurrentOrder?.service?.name}
                          Icon ={icons[0]}
                        />
                        <LIST
                         text={texts[0]}
                        value = {CurrentOrder?.service?.priceTotal}
                          Icon ={icons[0]}
                        />
                          <LIST
                         text={texts[4]}
                        value = {CurrentOrder?.service?.originalPrice}
                          Icon ={icons[0]}
                        />
                           <LIST
                         text={t("SellerPrice")}
                        value = {CurrentOrder?.service?.SellerPrice}
                          Icon ={icons[0]}
                        />
                             <LIST
                         text={t('sitePrice')}
                        value = {CurrentOrder?.service?.sitePrice}
                          Icon ={icons[0]}
                        />
                              <LIST
                         text={texts[6]}
                        value = {CurrentOrder?.seller?.firstname + " " + CurrentOrder?.seller?.lastname  }
                          Icon ={icons[0]}
                        />
                        <LIST
                         text={texts[5]}
                        value = {CurrentOrder?.service?.state}
                          Icon ={icons[0]}
                        />
                           <LIST
                          text={texts[2]}
                          value= {CurrentOrder?.service?.WarrantPeriod}
                          Icon ={icons[2]}
                        />
                            <LIST
                          text={t("deliveryTerm")}
                          value= {CurrentOrder?.service?.deliveryTerm}
                          Icon ={icons[2]}
                        />
                       </List>
                     </Demo>
        </Grid>

        {CurrentOrder?.type === "non-withdrawable" && (
      
              CurrentOrder.CurrentOrder?.status !== "create" &&(
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
            dispatch(updateOrder(CurrentOrder._id))
  
            }} >{t('withdrawable')}</Button>
          </Grid>
            
                )
        )}
      </Grid>
    </Box>
      </div>
    </div>
  </div>

  )
}

export default ViewOrders