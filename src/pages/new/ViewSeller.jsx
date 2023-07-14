import React, { useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useSelector } from "react-redux";
import { generatePublicUrl } from "../../urlConfig";
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { GetProductById } from '../../actions/product.action'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {  getOrderById } from '../../actions/order.action'
import moment from 'moment';




const ViewSeller = () => {
  const dispatch = useDispatch();
  const {t}= useTranslation()


  const Groups= [
    {  title: t("image"), maxWidth:"60px" ,field: "images",render:(row)=><Avatar src={generatePublicUrl(row?.images[0])}  /> },
    {  title: t("deal"), field:"name",  },
    {  title: t("status"), field: "state", render: (row)=> <div
    className={`${
      row.state === "waiting_confirmation"
        ? "bg-#FFCC00"
        : "bg-green-300"
       } className`}
  >
    {row.state}
  </div>
},
    {  title: t("totalPrice"), field:"priceTotal", },
    {  title: t("originalPrice"), field:"originalPrice", },
    {  title: t("sellerPrice"), field:"SellerPrice", },
    {  title: t("WarrantPeriod"), field:"WarrantPeriod", },
    {  title:  t("deliveryTerm"), field:"deliveryTerm", },
    {   title: t("actions"), field:"_id", render:(row)=> <div > 
                               <Link onClick={()=>{
      let id = row?._id
      dispatch(GetProductById(id))
    } } to={`/services/view/${row?._id}`}  className="className"> {t("view")}</Link>
                               </div>},
  
  
  ];
  const GroupsColumns = [
    {  title: "service", field:"service?.name",render: (rowData) => rowData.service?.name  },
    {  title: t("status"), field: "status", },
  {  title: t("totalPrice"), field:"totalPrice", },
  {  title: t("paidAt"), field:"paidAt", render: (row)=> moment(row.paidAt).format("YYYY MM DD hh:mm") },
  {  title: t("type"), field:"type", },
  {  title: t("userIdea"), field:"userIdea", },
  {  title: t("actions"), field:"_id", render:(row)=> <div className='cellAction'> 
       <Link onClick={()=>{
      dispatch(getOrderById(row?._id))
    }} to={`/orders/view/${row?._id}`}
  
  className="className" >{t("view")}</Link> </div>}
  ];

 
  const {seller , orders ,services } = useSelector(state=>state.Sellers)
  const [data, setData] = useState(orders)

  return (
    <div className="single">
    <Sidebar />
    <div className="singleContainer">
      <Navbar />
      <div className="top">
        <div className="left">
          <div className="editButton">Edit</div>
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              src={generatePublicUrl(seller?.avatar)}
              alt=""
              className="itemImg"
            />
            <div className="details">
              <h1 className="itemTitle">{seller?.firstname} {seller?.lastname}</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">{seller?.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone:</span>
                <span className="itemValue">{seller?.PhoneNumber}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Address:</span>
                <span className="itemValue">
                {seller?.Address}                  
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
        </div>
      </div>
      <div className="bottom">
      <h1 className="title">services</h1>
      <div className='datatable'>
                  <MaterialTable columns={Groups} data={services} title="services"
                      options={{exportButton:true,actionsColumnIndex:-1,addRowPosition:"first"}}             
                  />
          </div>

      </div>
      <div className="bottom">
      <h1 className="title">Last orders</h1>
      <div className='datatable'>
                  <MaterialTable columns={GroupsColumns} data={data} title="orders"
                      options={{exportButton:true,actionsColumnIndex:-1,addRowPosition:"first"}}
                     
                  />
          </div>

      </div>
    </div>
  </div>
  );
};

export default ViewSeller;
