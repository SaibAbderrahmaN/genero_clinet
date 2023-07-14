import React, { useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useSelector } from "react-redux";
import { generatePublicUrl } from "../../urlConfig";
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {  getOrderById } from '../../actions/order.action'
import moment from 'moment';




const NewCustomers = () => {
  const dispatch = useDispatch();
  const {t}= useTranslation()





  
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

  
  
  
  const {Customer , orders  } = useSelector(state=>state.Customers)
  
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
                src={generatePublicUrl(Customer?.avatar)}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{Customer?.firstname} {Customer?.lastname}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{Customer?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{Customer?.PhoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {Customer?.Address}                  
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
        <h1 className="title">Last Transactions</h1>
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

export default NewCustomers;
