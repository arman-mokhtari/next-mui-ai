"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import { KeyboardArrowDown } from "@mui/icons-material";

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: "#fff",
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: "1px solid #eaecef",
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: "1px solid #e1e4e8",
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: "#24292e",
  backgroundColor: "#fff",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  borderBottom: "1px solid #eaecef",
  "& input": {
    borderRadius: 4,
    backgroundColor: "#fff",
    padding: 8,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: "1px solid #eaecef",
    fontSize: 14,
  },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  fontSize: 13,
  width: "100%",
  textAlign: "left",
  paddingBottom: 8,
  color: "#586069",
  fontWeight: 600,
  "& span": {
    width: "100%",
  },
  "& svg": {
    width: 16,
    height: 16,
  },
}));

interface LabelType {
  language: string;
}

const labels = [
  { language: "English" },
  { language: "Spanish" },
  { language: "French" },
  { language: "German" },
  { language: "Italian" },
  { language: "Portuguese" },
  { language: "Chinese" },
  { language: "Japanese" },
  { language: "Russian" },
];

export default function SearchSelect() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<LabelType | null>(labels[0]);
  const [pendingValue, setPendingValue] = React.useState<LabelType | null>(
    labels[0]
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "github-label" : undefined;

  return (
    <React.Fragment>
      <Box
        sx={{
          width: 1,
          fontSize: 13,
          border: "1px solid",
          pt: 1,
          px: 1,
          borderRadius: 1,
        }}
      >
        <Button disableRipple aria-describedby={id} onClick={handleClick}>
          <span>{value?.language || "Language"}</span>
          <KeyboardArrowDown />
        </Button>
      </Box>

      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Autocomplete
              open
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason
              ) => {
                if (reason === "escape") {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue) => {
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box
                    component={DoneIcon}
                    sx={{ width: 17, height: 17, mr: "5px", ml: "-2px" }}
                    style={{
                      visibility: selected ? "visible" : "hidden",
                    }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    {option.language}
                    <br />
                  </Box>
                </li>
              )}
              options={labels}
              getOptionLabel={(option) => option.language}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Search"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </React.Fragment>
  );
}
