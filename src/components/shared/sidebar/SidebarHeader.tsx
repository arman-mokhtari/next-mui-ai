"use client";

import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const SidebarHeader = () => {
  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={1}
      sx={{
        px: 2,
        my: 1,
      }}
    >
      <Link href="/">
        <Image alt="brand" src={"/assets/brand.svg"} width={40} height={40} />
      </Link>
      <Link href="/">
        <Typography
          className="gradient-text"
          variant="h1"
          sx={{ fontSize: 20 }}
        >
          Logo Brand
        </Typography>
      </Link>
    </Stack>
  );
};
export default SidebarHeader;
