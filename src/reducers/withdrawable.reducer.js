import { withdrawableConstants
} from "../constants/constants";

const initState = {
withdrawableInvitations: [],
  CurrentWithdrawableInvitations:{}
};

export default (state = initState, action) => {
  switch (action.type) {
    case withdrawableConstants.GET_ALL_WITHDRAWABLE_SUCCESS:
      state = {
        ...state,
        withdrawableInvitations: action.payload.WithdrawInvitations,
      };
      break;
      case withdrawableConstants.LOGOUT_WITHDRAWABLE:
        state = {
          ...initState        
        };
        break;
  }

  return state;
};