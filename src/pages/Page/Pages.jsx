
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './Pages.css'
import { useSelector, useDispatch } from 'react-redux';
import {  deletePageById } from '../../actions/index';
import moment from 'moment';
import { AiFillDelete } from 'react-icons/ai';
import {getAllPages} from "../../actions/index"
import { useEffect } from 'react';
import { generatePublicUrl } from '../../urlConfig';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ToastContainer} from 'react-toastify';
import { Box, Button, Grid, Stack, useTheme } from '@mui/material';
import { useState } from 'react';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Pages = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const theme = useTheme()
  const navigate = useNavigate()


  const handleExpandClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  
  function MyComponent(description) {
  
    return <div dangerouslySetInnerHTML={{ __html: description }} />;
  }

  const dispatch = useDispatch();
  const page = useSelector(state => state.page);
  useEffect(() => {
    dispatch(getAllPages())
  }, [])
  

 
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar />
      <ToastContainer/>  

      <div style={{ margin:"2rem", display: 'flex', justifyContent: 'space-between' }}>
          <h3>All Pages </h3>
          <div className="actionBtnContainer">
          <Button  variant="contained" onClick={()=>(navigate('/pages/new'))}>
               Add New
          </Button> 
          </div>
    </div>  

    <div style={{
                  display:"flex"
                  ,alignItems:"center",
                  justifyContent:"space-between",
                  flexWrap:"wrap",
                  Width:"90%",
                 marginX:"auto"
    }}>
    {page?.pages?.length>0 && page?.pages?.map((item ,key)=>(
   
         <Card sx={{ maxWidth: 800  , margin:"1rem"}} key={key}>
         <CardHeader
           avatar={
             <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
               R
             </Avatar>
           }
           action={
             <IconButton onClick={()=>{
               dispatch(deletePageById(item._id))
             }} aria-label="delete">
               <AiFillDelete />
             </IconButton>
           }
           title={item.title}
           subheader={moment(item?.createdAt).fromNow()} 
         />
         <CardMedia
           component="img"
           height="194"
           image={generatePublicUrl(item?.banners[0])}
           alt="Paella dish"
         />
         <CardContent>
         </CardContent>
         <CardActions disableSpacing>
           <ExpandMore
                    expand={expandedIndex === key}
                    onClick={() => handleExpandClick(key)}
                    aria-expanded={expandedIndex === key}
                    aria-label="show more"
           >
             <ExpandMoreIcon />
           </ExpandMore>
         </CardActions>
         <Collapse in={expandedIndex === key} timeout="auto" unmountOnExit>
           <CardContent>
             <Typography paragraph>description</Typography>
             <Typography paragraph sx={{
               overflowX:"scroll"
             }}>
             {MyComponent(item?.description)}
             </Typography>
           </CardContent>
         </Collapse>
       </Card>
   
   
    ))}

    </div>
 
    </div>
  </div>

  )
}

export default Pages