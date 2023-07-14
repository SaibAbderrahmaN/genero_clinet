import React, { useState ,useEffect} from 'react'
import './Orders.scss'
import MaterialTable from 'material-table'
import {useDispatch ,useSelector} from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom'
import { getAllOrders, getOrderById } from '../../actions/order.action'
import moment from 'moment/moment'
import { useTranslation } from 'react-i18next'
import { generatePublicUrl } from '../../urlConfig'
import { Avatar } from '@mui/material'


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

const Orders = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrders())

  }, [])


  const Data = useSelector((state)=>state?.order?.orders)
  const [data, setData] = useState(Data)

  


const row = [];


  const GroupsColumns =  [
  {  title: "nom", field:"nom",  },
  {  title: "prenom", field: "prenom", },
  {  title: t("email"), field:"email", },
  {  title: t("telephone"), field:"telephone",},
  {  title: t("message"), field:"message", },
  {  title: t("actions"), field:"_id", render:(row)=> <div className='cellAction'> 
       <Link to={`view/${row?._id}`}
  
  className="className" >{t("delete")}</Link> </div>},
   
];

    




  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
      <div className='datatable'>
                    <MaterialTable columns={GroupsColumns} data={Data} title="orders"
                        options={{exportButton:true,actionsColumnIndex:-1,addRowPosition:"first"}}
                    />
            </div>

    </div>
  </div>

  )
}

export default Orders