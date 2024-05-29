"use client";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";

export default function TabItems() {
  const pathname = usePathname();

  return (
    <Box sx={{ width: 1, my: 1 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        aria-label="nav tabs example"
        role="navigation"
      >
        {sidebarLinks.map((item, i) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                background: isActive ? "linear-gradient(to right, #b39ddb, #d1c4e9, #ede7f6,rgba(138, 43, 226, 0))" : "transparent",
                "&::before": {
                  backgroundColor: isActive ? "#673ab7" : "transparent",
                  width: 5,
                  content: '""',
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: 1,
                  py: 1.5,
                }}
              >
                <Link href={item.route}>
                  <Typography
                    sx={{
                      fontWeight: isActive ? "500" : "inherit",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              </Box>
            </Box>
          );
        })}
      </Tabs>
    </Box>
  );
}
