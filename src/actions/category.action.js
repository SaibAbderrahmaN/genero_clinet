import axios from "../helpers/axios";
import { categoryConstansts } from "../constants/constants";
import { toast } from 'react-toastify';


const getAllCategory = () => {

    return async dispatch => {
        dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`/category/getCategory`);
        if (res.status === 200) {

            const { categoryList } = res.data;

            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}

export const addCategory = (form) => {



    return async dispatch => {

        dispatch({ type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST });

        try {
             const res = await axios.post(`/category/create`, form);
             if (res.status === 201) {
                toast.success("created successfully")
                 dispatch({
                     type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
                     payload: { category: res.data.category }
                 });
             } else {
                 dispatch({
                     type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
                     payload: res.data.error
                 });
             }
        } catch (error) {   
            console.log(error);
        }

    }
}
export const addBenefit = (value ) => {
    return async dispatch => {
        dispatch({ type: categoryConstansts.ADD_NEW_BENEFIT_REQUEST });
        try {
            const res = await axios.post(`Benefit/createBenefit`, {value});
            if (res.status === 201) {
                dispatch({
                    type: categoryConstansts.ADD_NEW_BENEFIT_SUCCESS,
                    payload: { benefit: res.data.benefit.value }
                });
                toast.success("update your benefit successfully")
             } else {

                toast.error("something went wrong please try again later")
                 dispatch({
                     type: categoryConstansts.ADD_NEW_BENEFIT_FAILURE,
                     payload: res.data.error
                 });
             }
        } catch (error) {  
            toast.error(error.message)

            console.log(error);
        }

    }
}

export const addVideo = (value ) => {
    return async dispatch => {
        try {
            const res = await axios.post(`video/create`, {value});
            if (res.status === 201) {
                dispatch({
                    type: "ADD_NEW_VidEo_SUCCESS",
                    payload: { video: res.data.video.value}
                });
                toast.success("update your Video successfully")
             } else {

                toast.error("something went wrong please try again later")
              
             }
        } catch (error) {  
            toast.error(error.message)

            console.log(error);
        }

    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstansts.UPDATE_CATEGORIES_REQUEST });
        const res = await axios.post(`/category/update`, form);
        if (res.status === 201) {
            toast.success(res.data.message)

            dispatch({ type: categoryConstansts.UPDATE_CATEGORIES_SUCCESS });
            dispatch(getAllCategory());
        } else {
            const { error } = res.data;
            dispatch({
                type: categoryConstansts.UPDATE_CATEGORIES_FAILURE,
                payload: { error }
            });
        }
    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {
        dispatch({ type: categoryConstansts.DELETE_CATEGORIES_REQUEST });
        const res = await axios.post(`/category/delete`, {
            payload: {
                ids
            }
        });
        if (res.status == 201) {
            dispatch(getAllCategory());
            dispatch({ type: categoryConstansts.DELETE_CATEGORIES_SUCCESS });
        } else {
            const { error } = res.data;
            dispatch({
                type: categoryConstansts.DELETE_CATEGORIES_FAILURE,
                payload: { error }
            });
        }
    }
}

export {
    getAllCategory
}