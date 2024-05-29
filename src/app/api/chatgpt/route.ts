import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();
  try {
    const data = JSON.stringify({
      messages: [
        {
          content: "You are a helpful assistant",
          role: "system",
        },
        {
          content: `tell me ${question}`,
          role: "user",
        },
      ],
      model: "deepseek-coder",
      frequency_penalty: 0,
      max_tokens: 2048,
      presence_penalty: 0,
      stop: null,
      stream: false,
      temperature: 1,
      top_p: 1,
      logprobs: false,
      top_logprobs: null,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.deepseek.com/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer sk-204230952eaa48928cb0397a3aa78a77",
      },
      data: data,
    };

    const response = await axios(config);
    const aiReply = response.data.choices[0].message.content;

    return NextResponse.json({ reply: aiReply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
