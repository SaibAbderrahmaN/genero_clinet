import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/app';
import conversationReducer from './slices/conversation';
import authReducer from './slices/auth';
import userReducer from '../reducers/user.reducer';
import productReducer from '../reducers/product.reducer';
import categoryReducer from '../reducers/category.reducer';
import orderReducer from '../reducers/order.reducer';
import pageReducer from '../reducers/page.reducer';
import CustomersReducer from '../reducers/Customers.reducers';
import SellersReducers from '../reducers/Sellers.reducers';
import WithdrawableReducers from '../reducers/withdrawable.reducer';



const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',

  };
  
  const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    conversation: conversationReducer,  
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    page: pageReducer,
    Customers: CustomersReducer,
    Sellers:SellersReducers,  
    invitations: WithdrawableReducers  
  });
  
  export { rootPersistConfig, rootReducer };