"use client";

import { ReactNode } from "react";
import { History } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import TabItems from "./TabItems";
const drawerWidth = 284;

export default function Sidebar({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const theme = useTheme();

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        borderRight: "2px solid",
        borderColor: "#cbced8",
        "& .MuiDivider-root": {
          borderColor: "#cbced8",
        },
      }}
    >
      <Box>
        <SidebarHeader />
        <Divider />
        <TabItems />
      </Box>
      <Box>
        <Divider />
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",

          position: "relative",
          "& header": {
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            height: 64,
          }}
        />
        <AppBar
          color="transparent"
          sx={{
            height: 64,
            borderBottom: "1px solid #cbced8",
            backgroundColor: "#fff",
          }}
          position="fixed"
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton>
                <MenuIcon onClick={handleDrawerToggle} />
              </IconButton>
            </Box>
            <Button
              sx={{
                color: "gray",
              }}
              color="inherit"
              variant="outlined"
              startIcon={<History />}
            >
              History
            </Button>
          </Toolbar>
        </AppBar>
        {children}
      </Box>
    </Box>
  );
}
