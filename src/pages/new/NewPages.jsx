import React, {  useState } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import  RitchTextEditor from "../../components/RichTextEditor/RitchTextEditor";
import { createPage} from '../../actions/index';
import { ToastContainer} from 'react-toastify';




const NewPages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [DescriptionTwo, setDescriptionTwo] = useState('')
    const [banners, setBanners] = useState([]);
    const [Img, setImg] = useState('')






  function  previewFile (file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
          setImg(reader.result)
      }
  }

  const handleBannerImages = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setBanners((prevImages) => [...prevImages, ...files]);
  };

  const submitPageForm = (e) => {
    if(title === ""){
        alert('Title is required');          
        return;
    }
    const newForm = new FormData();
    banners.forEach((image) => {
      newForm.append("banners", image);
    });
    newForm.append("title", title);

    newForm.append("description", DescriptionTwo);
    dispatch(createPage(newForm));
}


  return (
    <div className="news">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <ToastContainer />
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={ Img   ? Img   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}alt=""
          />
        </div>
        <div className="right">
          <form onSubmit={e=> e.preventDefault()}>
            <div className="formInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input type="file" 
                   id="file" 
                     name="banners"
                     onChange={handleBannerImages}
                     style={{ display: "none" }}
                    />
            </div>

              <div className="formInput" >
                <label>page Title</label>
                <input 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 placeholder={'Page Title'}
                 />
              </div>
              <div style={{width:'100%'}} > 
              <label>description</label>
              <RitchTextEditor setValue={setDescriptionTwo} />
              </div>
            <a onClick={submitPageForm}>Send</a>
          </form>
        </div>
      </div>
    </div>
  </div>

  )
}

export default NewPages