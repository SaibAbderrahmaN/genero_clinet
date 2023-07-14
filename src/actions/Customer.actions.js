import axios from "../helpers/axios";
import { Customers} from "../constants/constants";
import { toast } from "react-toastify";



 export const getCustomer = (id) => {
    return async (dispatch) => {
      try {
        dispatch({
          type: Customers.GET_CUSTOMER,
        })
        const res = await axios.get(`user/getuser/${id}`);
        if (res.status === 200) {
          const { Customer ,orders } = res.data;
          dispatch({
            type: Customers.GET_CUSTOMER_SUCCESS,
            payload: { Customer , orders },
          });
        } else {
          dispatch({ type: Customers.GET_CUSTOMER_FAILED });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };




  export const UpdateCustomerById = (id) => {
    return async (dispatch) => {
      try {
        const res = await axios.put(`user/UpdateUser/${id}`);
        if (res.status === 201) {
          toast.success(res.data.message)
        } else {
          const { error } = res.data;
          toast.error("something went wrong ")
       
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    };
  };