import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useSelector } from "react-redux";


const Widget = ({ type }) => {
  const {Sellers , Customers , product , order  } = useSelector(state=>state)
  const {benefit} = useSelector(state=>state.category)


  const {orders} = order 

  function calculateTotalPrice(AllOrders) {
    let totalPrice = 0;
  
    for (let i = 0; i < AllOrders.length; i++) {
      totalPrice += orders[i].totalPrice;
    }
  
    return totalPrice;
  }
  function calculateEarningPrice(AllOrders) {
    let totalPrice = 0;
  
    for (let i = 0; i < AllOrders.length; i++) {
      totalPrice += orders[i]?.sitePrice;
    }
  
    return totalPrice;
  }

  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "Customers",
        isMoney: false,
        link: "See all Customers",
        amount:Customers?.Customers?.length,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
      case "sellers":
        data = {
          title: "sellers",
          isMoney: false,
          link: "See all sellers",
          amount:Sellers?.Sellers?.length,
          icon: (
            <PersonOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        };
        break;
        case "benefit":
          data = {
            title: "benefit",
            isMoney: false,
            link: "See ",
            amount:benefit,
            icon: (
              <PersonOutlinedIcon
                className="icon"
                style={{
                  color: "crimson",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                }}
              />
            ),
          };
          break;
  
        case "services":
          data = {
            title: "articles",
            isMoney: false,
            link: "View all articles",
            amount:product?.products?.length,
            icon: (
              <ShoppingCartOutlinedIcon
                className="icon"
                style={{
                  backgroundColor: "rgba(218, 165, 32, 0.2)",
                  color: "goldenrod",
                }}
              />
            ),
          };
          break;
    case "order":
      data = {
        title: "messages",
        isMoney: false,
        link: "View all messages",
        amount:order?.orders?.length,

        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        amount:calculateEarningPrice(orders),
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        amount:calculateTotalPrice(orders),
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.amount} {data.isMoney && "dz"} {data.title === "benefit" && "%"}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
