import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {  Button, Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {GetAllWithdrawable, UpdateWithdrawable} from '../../actions/withdrawable.action'
import { ToastContainer } from 'react-toastify';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const LIST = ({ text, value })=>{
    return(
      <ListItem>
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
  






const Withdrawable = () => { 
    const theme = useTheme()
    const dispatch = useDispatch()
    React.useEffect(() => {
      dispatch(GetAllWithdrawable())
    }, [])
    
    const { withdrawableInvitations} = useSelector(state=> state.invitations)

    const { t} = useTranslation();

    
    
    return (
        <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />

          <div className='datatable'>
          <ToastContainer />

          <Box sx={{ flexGrow: 1 }}>

            {withdrawableInvitations?.length && withdrawableInvitations.map((item , index)=>{
                
              
    
            return        (<Grid key={index}  container spacing={2}  sx={{  textAlign:"center"  ,backgroundColor:     theme.palette.mode === "light"       ? "#F0F4FA"       : theme.palette.background.paper,   boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",   borderRadius:"30px",   padding:"1rem"   ,marginTop:"1rem" }}>
                      <Grid item xs={8}>
                       <Typography variant="h6" gutterBottom>   
                            withdrawable operation information
                       </Typography>
                        <List  sx={{   backgroundColor:     theme.palette.mode === "light"       ? "#F0F4FA"       : theme.palette.background.paper,   boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",   borderRadius:"30px",   padding:"1rem"   ,marginTop:"1rem" }}>
                             <LIST
                              text="bankName :"
                              value = {item?.seller_bank?.bankName}
                             />
                             <Divider/>
                             <LIST
                              text="username :"
                              value = {item?.seller_bank?.bankHolderName}
                             />
                             <Divider/>
                             <LIST
                              text="account number :"
                              value ={item?.seller_bank?.bankAccountNumber}
                             />
                              <LIST
                              text="amount :"
                              value = {item?.amount}
                             />
                             <Divider/>
     
                       </List>
                      </Grid>
                      <Grid item xs={4}>
                      <Typography variant="h6" gutterBottom>   
                           seller information 
                       </Typography>
     
                      <List  sx={{   backgroundColor:     theme.palette.mode === "light"       ? "#F0F4FA"       : theme.palette.background.paper,   boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",   borderRadius:"30px",   padding:"1rem"   ,marginTop:"1rem" }}>
                             <LIST
                              text="fullName:"
                              value = {item?.shop_id?.firstname + "  " + item?.shop_id?.firstname }
                             />
                             <Divider/>
                             <LIST
                              text="Phone :"
                              value = {item?.shop_id?.PhoneNumber}
                             />
                             <Divider/>
                             <LIST
                              text="email :"
                              value = {item?.shop_id?.email}
                             />
                              <LIST
                              text="availableBalance :"
                              value = {item?.shop_id?.availableBalance}
                             />
                             <Divider/>
     
                       </List>
                      </Grid>
                      <Button
                      onClick={()=>{
                        dispatch(UpdateWithdrawable(item?._id))
                      }}
                      
                      variant="outlined"  sx={{
                               marginX:"auto",
                               padding:"1rem",
                               borderRadius:".4rem",
                               minWidth:"150px"
                    }} >
                     {t('accept')}
                     
                     
                     </Button>
             
             
                    </Grid>)
    
    
}) 
}
        </Box>

                  
          </div>
      
        </div>
      </div>




    
 
  
  );
};

export default Withdrawable;




