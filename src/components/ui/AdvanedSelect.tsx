"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";

export default function AdvancedSelect({ label }: { label: string }) {
  const [auto, setAuto] = React.useState("Auto");

  const handleChange = (event: SelectChangeEvent) => {
    setAuto(event.target.value as string);
  };

  return (
    <Box>
      <Typography
        component="div"
        sx={{
          pb: 1,
        }}
        variant="caption"
      >
        {label}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{auto}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={auto}
          label="Auto"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="Auto">Auto</MenuItem>
          <MenuItem value="None">None</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
