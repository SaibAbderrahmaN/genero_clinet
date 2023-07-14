import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import {IoIosCheckboxOutline,IoIosCheckbox,IoIosArrowForward,IoIosArrowDown,IoIosAdd,IoIosTrash,IoIosCloudUpload} from 'react-icons/io'
import './Category.scss'
import {
    addCategory,
    addBenefit,addVideo, updateCategories
  
} from '../../actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, Divider, FormControl, Grid, InputLabel, Stack, TextField ,
  MenuItem,
  Paper,
  Select,} from '@mui/material';
import { useTheme } from '@mui/styles';
import { LOGO } from '../../assets';
import { useTranslation } from "react-i18next";
import  getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;


  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};



const style = {
  position: 'absolute' ,
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const Category = () => {
  const opts = {
    width:"100%",
    minHeight:"300px",
    playerVars: {
      autoplay: 1,
    },
  };
  const category = useSelector(state => state.category);
  const [categoryName, setCategoryName] = useState('');
  const [Benefit, setBenefit] = useState(0);
  const [video, setVideo] = useState("");
  const [categoryImage, setCategoryImage] = useState('');
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const dispatch = useDispatch();
  const [openUp, setOpenUp] =useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [UpdateCategoryName, setUpdateCategoryName] = useState("")
  const [UpdateCategoryImage, setUpdateCategoryImage] = useState("")



  const theme = useTheme()
  const data = useSelector(state=>state.category?.video)

  const handleClickOpen = () => {
    setOpenUp(true);
  };
  const handleClickClose = () => {
    setOpenUp(false);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const HandleClose = () => {
    setOpen(false);
  }
  useEffect(() => {

      if (!category.loading) {
          setShow(false);
      }

  }, [category.loading]);
  const handleClose = () => {
        const Form = new FormData();
        Form.append("name", categoryName);
        Form.append("file", categoryImage);
         dispatch(addCategory(Form)).then(()=>setOpen(false));
         setCategoryName('');setShow(false);
  }

  const UpdateCAtegoryByID = () => {
    const Form = new FormData();
    Form.append("name", UpdateCategoryName);
    Form.append("_id", selectedCategory);
    Form.append("file", UpdateCategoryImage);
     dispatch(updateCategories(Form)).then(()=>setOpen(false));
     setCategoryName('');setShow(false);
}
 

  const createCategoryList = (categories, options = []) => {

      for (let category of categories) {
          options.push({value: category._id,name: category.name,parentId: category.parentId,type: category.type});
          if (category.children.length > 0) {createCategoryList(category.children, options)}
      }

      return options;
  }

 
  const handleUpdateCategoryImage = (e) => {
    const file = e.target.files[0];
    setUpdateCategoryImage(file);

      
  }




    
  return (

    

    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
      <div className='datatable'>
      <Grid  container spacing={2}>
      <ToastContainer />
        <Grid   sx={{
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F0F4FA"
                  : theme.palette.background.paper,
      
              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
              borderRadius:"30px",
              padding:"1rem" ,
              border: "1px solide rgba(0,0,0,0.8)"
              ,margin:"1rem"
            }} xs={12} md={6}>
                        <div style={{ margin:"2rem", display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Categories</h3>
                            <div className="actionBtnContainer">
                                <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            sx={{ borderRadius: "20px" }}
                                
                                 onClick={handleOpen} > CREATE</Button>
                            </div>
                            <div className="actionBtnContainer">
                                <Button 
                                            variant="contained"
                                            color="primary"
                                            sx={{ borderRadius: "20px" }}
                                
                                
                                onClick={handleClickOpen} > Update</Button>
                            </div>

                        </div>
                        <CheckboxTree
                            nodes={category?.categories}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}

                        />
        </Grid>

        <Grid xs={12} md={4}>


        </Grid>
      
      </Grid>

      </div>
    </div>


      <BootstrapDialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={openUp}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClickClose}>
    update category

    </BootstrapDialogTitle>
        <DialogContent dividers>
        <Box sx={{ mt: 4 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {category.categories?.map(({ _id, name }) => (
              <MenuItem  value={_id} key={ _id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </Box>
      <Box sx={{ mt: 4 }}>
      <TextField
         label="new Category Name"
         variant="outlined"
         value={UpdateCategoryName}
         onChange={(e) => setUpdateCategoryName(e.target.value)}
         fullWidth
       />
      </Box>

      <Box sx={{mt:4}}>
        <input type="file" name="categoryImage" onChange={handleUpdateCategoryImage} />

      </Box>
      <Box sx={{mt:4}}>
      <Button 
         variant="contained"
         color="primary"
         sx={{ borderRadius: "20px" }}
       
       onClick={UpdateCAtegoryByID} > Update now</Button>
     </Box>
                            
        
        </DialogContent>
      </BootstrapDialog>

  </div>

  )
}

export default Category