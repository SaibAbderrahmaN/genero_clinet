import React, { useState } from 'react'
import './Sellers.scss'
import MaterialTable from 'material-table'
import {useDispatch ,useSelector} from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom';
import { generatePublicUrl } from '../../urlConfig';
import { UpdateSellerById, getSellerById } from '../../actions/Sellers.actions'
import { ToastContainer } from 'react-toastify'
import moment from 'moment'


const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};







const Sellers = () => {
  const dispatch = useDispatch()


    const GroupsColumns = [
      {  title: "Picture", field:"avatar", render:(row)=> <div>  <img className="cellImg" src={generatePublicUrl(row.avatar)} alt="avatar" /></div>},
      {  title: "title", field:"firstname", },
      {  title: "lastname", field:"lastname", },
      {  title: "PhoneNumber", field: "PhoneNumber", },
      {  title: "email", field: "email", },
      {  title: "availableBalance", field: "availableBalance", render:(row)=><div>{row.availableBalance.toFixed(2)} </div> },
      {  title: "status",field: "type", },
      {  title: "actions", field:"_id", render:(row)=> <div className='cellAction'> <Link 
      onClick={()=>{
        let id =row?._id
        dispatch(getSellerById(id))
      }} to={`view/${row?._id}`}  className="className">view</Link>
      <Link className="classNa"
          onClick={() => {
            dispatch(UpdateSellerById(row?._id))
       
          }}
      
      
      >
        
        {row.type === "Active" ? "disabled": "Active"}
      
      
      </Link></div>},
      {  title: "createdAt", field:"createdAt", render: (row)=> moment(row?.createdAt).format("YYYY/MM/DD hh:mm") },
    

    ];
    

    const Data = useSelector((state)=>state?.Sellers?.Sellers)
    const [data, setData] = useState(Data)
    

  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
      <ToastContainer />
      <div className='datatable'>
                    <MaterialTable columns={GroupsColumns} data={data} title="our sellers"
                        options={{exportButton:true,actionsColumnIndex:-1,addRowPosition:"first"}}
         
                       
                    />
            </div>

    </div>
  </div>
  )
}

export default Sellers

