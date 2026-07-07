import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export default groq;
