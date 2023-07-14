import {
    categoryConstansts,
    productConstants,
    orderConstants,
    Customers,
    SellersConstants,
    withdrawableConstants

  } from "../constants/constants.js";
  import axios from "../helpers/axios";
import { FetchDirectConversations } from "../redux/slices/conversation.js";
  
  export const getInitialData = () => {
    return async (dispatch) => {
      const res = await axios.post(`/initialData`);
      if (res.status === 200) {
        const { categories, products, orders , users   ,chat , annonceo        } = res.data;
        console.log(res.data)
        dispatch({
          type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories ,value:annonceo , video:chat },
        });
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
        dispatch({
          type: Customers.GET_ALL_CUSTOMERS_SUCCESS,
          payload: { users },
        });
        dispatch({
          type: withdrawableConstants.GET_ALL_WITHDRAWABLE_SUCCESS,
          payload: { WithdrawInvitations:chat },
        });
        dispatch({
          type: SellersConstants.GET_ALL_SELLERS_SUCCESS,
          payload: { Sellers:annonceo  },
        });
      }
    };
  };