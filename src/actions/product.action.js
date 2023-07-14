import axios from "../helpers/axios";
import { productConstants } from "../constants/constants";
import { toast } from 'react-toastify';


// new action
export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
      const res = await axios.get(`product/getProducts`);
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// modified actrion
export const GetProductById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT_REQUEST });
      const res = await axios.get(`product/serviceById/${id}`);
      if (res.status === 200) {
        console.log(res.data)
        dispatch({ 
         type: productConstants.GET_PRODUCT_SUCCESS,
         payload:{products: res.data.products}
        });
      } else {
        dispatch({ type: productConstants.GET_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateProductById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.UPDATE_PRODUCT_BY_ID_REQUEST });
      const res = await axios.put(`product/serviceById/${id}`);
      if (res.status === 200) {
        toast.success('service update successfully')
                dispatch({ 
         type: productConstants.GET_PRODUCT_SUCCESS,
         payload:{products: res.data.products}
        });
      } else {
        dispatch({ type: productConstants.GET_PRODUCT_FAILURE });
        toast.error('somethings went wrong')

      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message)

    }
  };
};

// new action
export const deleteProductById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`product/serviceById/${id}`);
      dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST });
      if (res.status === 201) {
        toast.success(res.data.message)
        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS });
        dispatch(getProducts());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      toast.success(error.message)
      console.log(error);
    }
  };
};