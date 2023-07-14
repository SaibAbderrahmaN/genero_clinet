import React,{useState} from 'react'
import MaterialTable from 'material-table'
import {useDispatch ,useSelector} from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom';
import './Services.scss'
import { generatePublicUrl } from '../../urlConfig';
import { GetProductById, getProducts } from '../../actions/product.action'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment/moment'
import { Avatar } from '@mui/material'

const Services = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [])
  const {t}= useTranslation()

  const GroupsColumns = [

    {  title: t("image"), maxWidth:"60px" ,field: "image",render:(row)=><Avatar src={generatePublicUrl(row?.image)}  /> },
    {  title: "title", field:"titre",  },
    {  title: t("status"), field: "state", render: (row)=> <div
    className={`${
      row.Disponibilites === "no"
        ? "bg-#FFCC00"
        : "bg-green-300"
       } className`}
  >
    {row.Disponibilites}
  </div>
},
    {  title:"Description", field:"Description", render:(row)=> <p>{row?.Description?.slice(0,100)} </p> },
    {  title: t("etat_objet"), field:"etat_objet", },
    {  title: t("telephone"), field:"telephone", },
    {  title:  t("adress"), field:"adresse", },
    {   title: t("actions"), field:"_id", render:(row)=> <div > 
                               <Link onClick={()=>{
      let id = row?._id
      dispatch(GetProductById(id))
    } } to={`view/${row?._id}`}  className="className"> {t("view")}</Link>
                               </div>},
  ];
  const services = useSelector((state)=>state.product.products)
  const [data, setData] = useState(services)




 


  



  return (
    <div className="list">
    <Sidebar />
    <div className="listContainer">
      <Navbar/>
      <div className='datatable' style={{ maxWidth: '100%', overflowX: 'auto' }}>
                    <MaterialTable columns={GroupsColumns} data={services} title="our Services"
                        options={{exportButton:true}}
                    />
            </div>

    </div>
  </div>
  )
}

export default Services