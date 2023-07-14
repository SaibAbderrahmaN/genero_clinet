import { orderConstants } from "../constants/constants";

const initState = {
  orders: [],
  CurrentOrder:{}
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
      };
      break;
    case "GET_ORDER_SUCCESS":
        state = {
          ...state,
          CurrentOrder: action.payload.order,
        };
        break;
        case orderConstants.LOGOUT_ORDERS:
          state = {
            ...initState
          };
          break;
  }

  return state;
};