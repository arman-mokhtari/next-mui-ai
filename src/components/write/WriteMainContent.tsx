"use client";

import { Draw } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchSelect from "../ui/SearchSelect";
import AdvancedSwitch from "../ui/AdvancedSwitch";
import EngineSelect from "../ui/EngineSelect";

const WriteMainContent = () => {
  const [text, setText] = useState("");
  const [isSubmittingAi, setIsSubmittingAi] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const generateAiAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingAi(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question: text }),
        }
      );
      const data = await response.json();
      alert(data.reply);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingAi(false);
    }
  };

  return (
    <Stack
      sx={{
        width: 583,
        minHeight: "calc(100vh - 64px)",
        borderBottom: 1,
        borderRight: 1,
        borderColor: "#cbced8",
      }}
    >
      <Box>
        <Stack m={2} direction="row" spacing={1}>
          <Draw />
          <Typography>reWrite</Typography>
        </Stack>

        <Divider />
        <Stack
          component="form"
          onSubmit={generateAiAnswer}
          direction="column"
          spacing={2}
          sx={{
            py: 2,
            px: 3,
          }}
        >
          <TextField
            multiline
            rows={3}
            fullWidth
            value={text}
            onChange={handleTextChange}
            helperText={`${text.length}/200`}
          />
          <SearchSelect />
          <AdvancedSwitch />
          <Typography
            component="div"
            sx={{
              pb: 1,
            }}
            variant="caption"
          >
            Engine
          </Typography>
          <Grid spacing={1} container alignItems="center">
            <Grid xs={6} item>
              <EngineSelect />
            </Grid>
            <Grid xs={6} item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disabled={isSubmittingAi}
              >
                Rewrite
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Stack>
  );
};

export default WriteMainContent;
