"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";

export default function EngineSelect() {
  const [auto, setAuto] = React.useState("GPT 3.5");

  const handleChange = (event: SelectChangeEvent) => {
    setAuto(event.target.value as string);
  };

  return (
    <Box>
      
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{auto}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={auto}
          label="Engine "
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="GPT 3.5">
            <Image alt="gbt" src="/assets/gpt.svg" width={20} height={20} />
            {" "}
            GPT 3.5
          </MenuItem>
          <MenuItem value="GPT 4">
            <Image alt="gbt" src="/assets/gpt.svg" width={20} height={20} />
            {" "}
            GPT 4
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
