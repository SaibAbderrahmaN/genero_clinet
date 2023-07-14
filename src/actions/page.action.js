import axios from "../helpers/axios";
import { pageConstants } from "../constants/constants";
import {  toast } from 'react-toastify';

export const getAllPages = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: pageConstants.GET_ALL_PAGES });
        const res = await axios.get(`/page`);
        if (res.status === 200) {
          const {getAllPages } = res.data;
          dispatch({
            type: pageConstants.GET_ALL_PAGES_SUCCESS,
            payload: { pages : getAllPages },
          });
        } else {
          dispatch({ type: pageConstants.GET_ALL_PAGES_FAILED });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
export const createPage = (form) => {
    return async dispatch => {
        dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
        try{
            const res = await axios.post('/page/create', form);
            if(res.status === 200){
                toast.success(res.data.message)
                dispatch({
                    type: pageConstants.CREATE_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                });
            }else{
                toast.error("CREATE PAGE FAILURE")
                dispatch({
                    type: pageConstants.CREATE_PAGE_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }catch(error){
          toast.error(error.message)
            console.log(error)
        }
    }
}

export const deletePageById = (pageId) => {
    return async (dispatch) => {
      try {
        const res = await axios.delete(`page/delete/${pageId}`);
        if (res.status === 202) {
          toast.success(res.data.message)
          dispatch({ type: pageConstants.DELETE_PAGE_SUCCESS });
          dispatch(getAllPages());
        } else {
          const { error } = res.data;
          dispatch({
            type: pageConstants.DELETE_PAGE_FAILURE,
            payload: {
              error,
            },
          });
        }
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
    };
  };