"use client";

import { Draw, ContentCopy, Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SearchSelect from "../ui/SearchSelect";
import AdvancedSwitch from "../ui/AdvancedSwitch";
import EngineSelect from "../ui/EngineSelect";

const WriteMainContent = () => {
  const [text, setText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isSubmittingAi, setIsSubmittingAi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(true);

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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: text }),
        }
      );
      const data = await response.json();
      setAiResponse(data.reply);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingAi(false);
    }
  };

  const renderResponse = (response: string) => {
    const lines = response.split("\n");
    const elements = [] as any;
    let isCodeBlock = false;
    let codeContent = "";

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        if (isCodeBlock) {
          elements.push(
            <Box key={index} sx={{ position: "relative", mb: 2 }}>
              <CopyToClipboard
                text={codeContent}
                onCopy={() => setCopied(true)}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    color: "#cbced8",
                  }}
                >
                  <ContentCopy />
                </IconButton>
              </CopyToClipboard>
              <SyntaxHighlighter language="javascript" style={okaidia}>
                {codeContent}
              </SyntaxHighlighter>
            </Box>
          );
          codeContent = "";
        }
        isCodeBlock = !isCodeBlock;
      } else if (isCodeBlock) {
        codeContent += line + "\n";
      } else {
        elements.push(<Typography key={index}>{line}</Typography>);
      }
    });

    return elements;
  };

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <Box
        sx={{
          flex: { xs: 1, sm: 0.4 },
          minHeight: "calc(100vh - 64px)",
          borderBottom: { xs: 1, sm: "none" },
          borderRight: { xs: "none", sm: 1 },
          borderColor: "#cbced8",
          backgroundColor: "#f5f5f5",
        }}
      >
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
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#fff",
              },
            }}
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
                {isSubmittingAi ? "Generating..." : "Rewrite"}
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      {/* answer section */}
      <Box
        sx={{
          flex: { xs: 1, sm: 0.6 },
          position: "relative",
          width: "100%",
        }}
      >
        {aiResponse && (
          <Box mt={4} px={3}>
            {renderResponse(aiResponse)}
          </Box>
        )}
        {copied && (
          <Collapse in={open}>
            <Alert
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                zIndex: 1000,
              }}
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              Code copied to clipboard!
            </Alert>
          </Collapse>
        )}
      </Box>
    </Stack>
  );
};

export default WriteMainContent;
