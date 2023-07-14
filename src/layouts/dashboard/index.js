import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { useSelector } from "react-redux";

import BottomNav from "./BottomNav";
import useResponsive from "../../hooks/useResponsive";

const DashboardLayout = () => {
  const isDesktop = useResponsive("up", "md");

  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      <Stack direction="row">
      {isDesktop ?(
          // SideBar
          <SideNav key={55} />
        ):(
          <BottomNav />
        )}

        <Outlet />
      </Stack>

    </>
  );
};

export default DashboardLayout;
