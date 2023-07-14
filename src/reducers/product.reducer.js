import { productConstants } from "../constants/constants";

const initialState = {
    products: [],
    CurrentProduct:{}
};

export default (state = initialState, action) => {
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload?.products
            }
            break;
            case productConstants. GET_PRODUCT_SUCCESS:
                state = {
                    ...state,
                    CurrentProduct: action.payload?.products
                }
                break;
    }

    return state;
}