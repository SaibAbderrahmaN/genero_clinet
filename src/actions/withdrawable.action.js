import { withdrawableConstants } from "../constants/constants";
import axios from "../helpers/axios";
import { toast } from "react-toastify";


export const GetAllWithdrawable = ()=>{
    return async (dispatch) =>{
        try {
            const res = await axios.get(`withdraw/getAll`)
            if(res.status === 200){
                dispatch({
                    type: withdrawableConstants.GET_ALL_WITHDRAWABLE_SUCCESS,
                    payload: { WithdrawInvitations :res.data.withdraws },
                  });
            }  
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)

            
        }
    }
}

export const UpdateWithdrawable = (id)=>{
    return async (dispatch) =>{
        try {
            const res = await axios.put(`withdraw/updateWithdraw/${id}`)
            if(res.status === 200){
                toast.success("withDraw update successfully")
                dispatch(GetAllWithdrawable())
            }  
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)

            
        }
    }
}