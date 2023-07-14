import { SellersConstants } from "../constants/constants"

const initState = {
    error: null,
    loading: true,
    Sellers: [],
    seller:{},
    services:[],
    orders:[],
}

export default (state = initState, action) => {
    switch (action.type) {
        case  SellersConstants.GET_ALL_SELLERS_SUCCESS:
            state = {
                ...state,
                Sellers: action.payload.Sellers,
                error:false,
                loading:false
            }
            break;
        case SellersConstants.GET_SELLER:
            state = {
                ...state,
                loading: true
            }
            break;
        case SellersConstants.GET_SELLER_SUCCESS:
            state = {
                ...state,
                loading: false,
                seller:action.payload?.seller,
                services:action.payload?.services,
                orders:action.payload?.orders
            }
            break;
        case SellersConstants.GET_SELLER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
            case SellersConstants.LOGOUT_SELLERS:
                state = {
                    ...initState
                }
                break;
    }

    return state;
     }