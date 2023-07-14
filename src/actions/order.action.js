import axios from "../helpers/axios";
import { orderConstants } from "../constants/constants";
import { toast } from "react-toastify";

export const getAllOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.get("/order/adminAllOrders");
      if (res.status === 201) {
        const { orders } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const getOrderById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_ORDER",
    });
    try {
      const res = await axios.get(`/order/getOrdersByID/${id}`);
      if (res.status === 200) {
        const { order } = res.data;
        dispatch({
          type: "GET_ORDER_SUCCESS",
          payload: { order },
        });
        toast.success('order successfully')
      } else {
        const { error } = res.data;
        dispatch({
          type: "GET_ORDER_FAILURE",
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateOrder = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/order/updateOrderType/${id}`);
      if (res.status === 201) {
    getOrderById(id)
        toast.success('order successfully updated')
        toast.success(`the new availableBalance of ${res.data.seller.firstname} is  ${res.data.seller.availableBalance}`)
      } else {
        const { error } = res.data;
        toast.error(res.message)
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
};