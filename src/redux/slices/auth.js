import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import axios from "../../utils/axios";
import { showSnackbar } from "./app";
import { Customers, SellersConstants, orderConstants, productConstants, withdrawableConstants } from "../../constants/constants";

// ----------------------------------------------------------------------

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
  user_id: null,
  email: "",
  type:"",
  error: false,
  authenticate: false,
  authenticating: false,
  loading: false,
  message: ''
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user_id = action.payload.user_id;
      state.user = action.payload.user
      state.type = action.payload.type;
      state.token = action.payload.token;
      state.authenticate= true;
      state.authenticating= false;

    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.user_id = null;
      state.type = "";
      state.authenticate= false;
      state.authenticating= true;
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

// Reducer
export default slice.reducer;

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        toast.success(response.data.message); // Show success toast notification

        dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              token: response.data.token,
            })
          );
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {

        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    // Make API call here
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post(
        "/admin/signin",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
            user_id: response.data.user.id,
            user: response.data.user,
            type: response.data.user.type,
          })
        );
        dispatch({
          type:"LoadUserSuccess",
          payload:response.data.USER
        })
        window.localStorage.setItem("user_id", response.data.user_id);
        window.localStorage.setItem("type", "user");
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}


export function LogoutUser() {
  return async (dispatch, getState) => {
    const res = await axios.post(`/admin/signout`);
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("type");
    dispatch(slice.actions.signOut());
    dispatch({
      type:"removeAllOrdersShopSuccess"
    })
    dispatch({
      type:Customers.LOGOUT_CUSTOMERS
    })
    dispatch({
      type:withdrawableConstants.LOGOUT_WITHDRAWABLE
    })
    dispatch({
      type: productConstants.LOGOUT_PRODUCT
    })
    dispatch({
      type:orderConstants.LOGOUT_ORDERS
    })
    dispatch({
      type:SellersConstants.LOGOUT_SELLERS
    })
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    await axios
    .post(`/user/create-user`, formValues, config)

      .then(function (response) {
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );

        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ error: true, isLoading: false })
        );
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "/auth/verify";
        }
      });
  };
}
export function RegisterSeller(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    await axios
    .post(`/shop/create-shop`, formValues, config)

      .then(function (response) {
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );

        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ error: true, isLoading: false })
        );
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "/auth/verify";
        }
      });
  };
}

export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/verify",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(slice.actions.updateRegisterEmail({ email: "" }));
        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );


        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ error: true, isLoading: false })
        );
      });
  };
}
