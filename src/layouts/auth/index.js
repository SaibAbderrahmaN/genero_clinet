import React from "react";
import { Container, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import {LOGO}  from '../../assets'
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state);

  if (isLoggedIn) {
      return <Navigate to={"/"} />;
  }

  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%" }}
            direction="column"
            alignItems={"center"}
          >
            <img style={{ height: 200, width: 200 }} src={LOGO} alt="Logo" />
          </Stack>
          <Outlet />
        </Stack>
      </Container>
    </>
  );
};

export default AuthLayout;
