import { useEffect } from "react";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import ViewSeller from "./pages/new/ViewSeller";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs} from "./formSource";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getInitialData } from './actions/index';
import  Sellers  from "./pages/Sellers/Sellers.jsx";
import Category from "./pages/Category/Category";
import Services from "./pages/Services/Services";
import ViewServices from './pages/new/ViewServices'
import Orders from './pages/Orders/Orders.jsx'
import Customers from "./pages/Customers/Customers";
import NewCustomers from "./pages/new/NewCustomers";
import ThemeSettings from "./components/settings";
import ThemeProvider from "./theme";
import { Suspense, lazy } from "react";
import DashboardLayout from "./layouts/dashboard";
import AuthLayout from "./layouts/auth";
import { Navigate} from "react-router-dom";
import { DEFAULT_PATH } from "./config";
import LoadingScreen from "./components/LoadingScreen";
import "./app.css"
import ViewOrders from "./pages/new/viewOrders"
import Withdrawable from "./pages/withdrawable/withdrawable";
import Pages from "./pages/Page/Pages";
import NewPages from "./pages/new/NewPages";




function App() {
  const dispatch = useDispatch();
  const state = useSelector((state)=>console.log(state))
  const auth = useSelector(state => state.auth)
  const Loadable = (Component) => (props) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };
  const GeneralApp = Loadable(
    lazy(() => import("./pages/dashboard/GeneralApp"))
  );

  const Page404 = Loadable(lazy(() => import("./pages/Page404")));
  const LoginPage = Loadable(lazy(() => import("./pages/auth/Login")));
  const VerifyPage = Loadable(lazy(() => import("./pages/auth/Verify")));
  const RegisterPage = Loadable(lazy(() => import("./pages/auth/Register")));
  const ResetPasswordPage = Loadable(
    lazy(() => import("./pages/auth/ResetPassword"))
  );
  const NewPasswordPage = Loadable(
    lazy(() => import("./pages/auth/NewPassword"))
  );
  
  // Settings

  
  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
    

  }, [auth.authenticate]);

  const token = window.localStorage.getItem('token');


  return (
    <div className={"app"}>
      <ThemeProvider>
      <ThemeSettings>

      <BrowserRouter>
        <Routes>
             <>
          <Route path="/">
            <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" />    :<Home />} />
            <Route path="services">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" />    :  <Services />  } />
              <Route path="view/:id" element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <ViewServices inputs={productInputs} title="Services" />}/>
            </Route>
            <Route path="products">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <List />} />
              <Route path=":productId" element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <Single />} />
              <Route path="view"element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <New inputs={productInputs} title="Add New Product" />}/>
            </Route>
            <Route path="category">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <Category />} />
            </Route>
            <Route path="pages">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <Pages />} />
              <Route path="new"element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <NewPages inputs={productInputs} title="Add New page" />}/>
            </Route>
            <Route path="sellers">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" /> :<Sellers />} />
              <Route path="view/:id"element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <ViewSeller inputs={productInputs} title="seller" />}/>

            </Route>
            <Route path="invitations">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <Withdrawable />} />

            </Route>
            <Route path="Customers">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <Customers />} />
              <Route path="view/:id"element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <NewCustomers inputs={productInputs} title="customer" />}/>


            </Route>
            <Route path="orders">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <Orders />} />
              <Route path="view/:id"element={!auth.authenticate ? <Navigate  to="/auth/login" /> :<ViewOrders inputs={productInputs} title="customer" />}/>

              
            </Route>
          </Route>
          <Route
            path="/ChatApp"
            element={<DashboardLayout />}
          >
         <Route index={true} element={<Navigate to={DEFAULT_PATH} replace />} />
         <Route path="app" element={<GeneralApp />} />
         <Route path="404" element={<Page404 />} />
       </Route>
             </>

          
          

    
   


       
       <Route
         path="/auth"
         element={<AuthLayout />}
       >
         <Route path="login" element={<LoginPage />} />
         <Route path="reset-password" element={<ResetPasswordPage />} />
         <Route path="new-password" element={<NewPasswordPage />} />
         <Route path="verify" element={<VerifyPage />} />
       </Route>
        </Routes>
      </BrowserRouter>
      </ThemeSettings>
      </ThemeProvider>

    </div>
  );
}

export default App;
