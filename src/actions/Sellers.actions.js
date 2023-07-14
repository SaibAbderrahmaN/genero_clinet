import axios from "../helpers/axios";
import {  SellersConstants  } from "../constants/constants";
import { toast } from "react-toastify";

// new action
export const getSellers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: SellersConstants.GET_ALL_SELLERS });
      const res = await axios.get(`Sellers`);
      if (res.status === 200) {
        const { Sellers } = res.data;
        dispatch({
          type:SellersConstants.GET_ALL_SELLERS_SUCCESS,
          payload: { Sellers },
        });
      } else {
        dispatch({ type:SellersConstants.GET_ALL_SELLERS_FAILED });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getSellerById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SellersConstants.GET_SELLER });
      const res = await axios.get(`shop/getSeller/${id}`);
      if (res.status === 200) {
        const { seller,
          services,
          orders
    } = res.data;
    
        dispatch({
          type:SellersConstants.GET_SELLER_SUCCESS,
          payload: {seller,
            services,
            orders},
        });
      } else {
        dispatch({ type:SellersConstants.GET_SELLER_FAILED });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// new action
export const UpdateSellerById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`shop/UpdateSeller/${payload}`);
      if (res.status === 201) {
        toast.success(res.data.message)
      } else {
        const { error } = res.data;

        dispatch({
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    }
  };
};