import { Customers } from "../constants/constants";

const initialState = {
    Customers: [] ,
    Customer: {},
    orders: []


};

export default (state = initialState, action) => {
    switch(action.type){
        case Customers.GET_ALL_CUSTOMERS_SUCCESS:
            state = {
                ...state,
                Customers: action.payload.users
            }
            break;
        case Customers.GET_CUSTOMER_SUCCESS:
                state = {
                    ...state,
                    Customer: action.payload?.Customer,
                    orders: action.payload?.orders
                }
                break;
         case Customers.LOGOUT_CUSTOMERS:
                    state = { 
                        ...initialState
                    }
                    break;
    }

    return state;
}