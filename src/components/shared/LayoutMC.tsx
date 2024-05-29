"use client";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ReactNode } from "react";

import Sidebar from "./sidebar/Sidebar";

const LayoutMC = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <AppRouterCacheProvider>
      <CssBaseline />
      <Sidebar>{children}</Sidebar>
    </AppRouterCacheProvider>
  );
};

export default LayoutMC;
