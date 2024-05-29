import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import AdvancedSelect from "./AdvanedSelect";
import { Grid, Stack } from "@mui/material";

export default function AdvancedSwitch() {
  const [state, setState] = React.useState({ advanced: false });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const labels = [
    { label: "Length" },
    { label: "Tone of voice" },
    { label: "Creativity" },
    { label: "Point of view" },
  ];

  return (
    <>
      <FormControl component="fieldset" variant="standard">
        <FormControlLabel
          control={
            <Switch
              checked={state.advanced}
              color="secondary"
              onChange={handleChange}
              name="advanced"
            />
          }
          label="Advanced"
        />
        <FormHelperText>More access for more accurate results</FormHelperText>
      </FormControl>
      {state.advanced && (
        <Grid container rowSpacing={2} columnSpacing={1}>
          {labels.map((label, i) => (
            <Grid key={i} item xs={6}>
              <AdvancedSelect label={label.label} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
