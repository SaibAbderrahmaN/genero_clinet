import React, { useState } from 'react'
import './Customers.scss'
import MaterialTable from 'material-table'
import {useDispatch ,useSelector} from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom';
import { generatePublicUrl } from '../../urlConfig';
import {UpdateCustomerById, getCustomer} from '../../actions/Customer.actions'
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
const Customers = () => {
  const dispatch = useDispatch();

  const GroupsColumns = [
    {  title: "name", field:"name", },
    {  title: "PhoneNumber", field: "téléphone", },
    {  title: "email", field: "email", },
    {  title: "date_de_naissance", field: "date_de_naissance", render: (row)=> moment(row?.date_de_naissance).format("YYYY/MM/DD") },
    {  title: "type",field: "type", },
    {  title: "actions", field:"_id", render:(row)=> <div className='cellAction'> <Link onClick={()=>{
      let id = row._id;
      dispatch(getCustomer(id))
    }} to={`view/${row?._id}`}  className="className">view</Link> 
   
   <Link className="classNa"
          onClick={() => {
            dispatch(UpdateCustomerById(row?._id))
       
          }}
      
      
      >
        
        {row.type === "Active" ? "disabled": "Active"}
      
      
      </Link>
   </div>},

  ];


  const Data = useSelector((state)=>state?.Customers?.Customers)

  const [data, setData] = useState(Data)
  

return (
  <div className="list">
  <Sidebar/>
  <div className="listContainer">
    <Navbar/>
    <ToastContainer />
    <div className='datatable'>
                  <MaterialTable columns={GroupsColumns} data={data} title="our users"
                      options={{exportButton:true,actionsColumnIndex:-1,addRowPosition:"first"}}
        
  
                  />
          </div>

  </div>
</div>

  )
}

export default Customers