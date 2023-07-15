import { useEffect } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs} from "./formSource";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getInitialData } from './actions/index';
import Category from "./pages/Category/Category";
import Orders from './pages/Orders/Orders.jsx'
import Customers from "./pages/Customers/Customers";
import Services from "./pages/Services/Services";
import ThemeSettings from "./components/settings";
import ThemeProvider from "./theme";
import { Suspense, lazy } from "react";
import AuthLayout from "./layouts/auth";
import { Navigate} from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import "./app.css"




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
 
  const LoginPage = Loadable(lazy(() => import("./pages/auth/Login")));
  const VerifyPage = Loadable(lazy(() => import("./pages/auth/Verify")));
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
            </Route>
            <Route path="category">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <Category />} />
            </Route>
            <Route path="Customers">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <Customers />} />
            </Route>
            <Route path="orders">
              <Route index element={!auth.authenticate ? <Navigate  to="/auth/login" /> : <Orders />} />
            </Route>
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
