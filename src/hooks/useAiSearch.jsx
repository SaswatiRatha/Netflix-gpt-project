import { useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useAiSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  const search = async (query) => {
    if (!query?.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const aiRes = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content:
                  "You are a movie recommendation engine. Given a natural " +
                  "language query, respond ONLY with a JSON array of 8-10 " +
                  "real movie titles (with release year in parentheses). " +
                  "No preamble, no markdown, just the raw JSON array of strings.",
              },
              { role: "user", content: query },
            ],
          }),
        },
      );

      if (!aiRes.ok) throw new Error("AI request failed");
      const aiData = await aiRes.json();
      const text = aiData.choices?.[0]?.message?.content?.trim() || "[]";
      const clean = text.replace(/```json|```/g, "").trim();
      const titles = JSON.parse(clean);

      const tmdbResults = await Promise.all(
        titles.map(async (title) => {
          const cleanTitle = title.replace(/\s*\(\d{4}\)\s*$/, "");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              cleanTitle,
            )}&include_adult=false&language=en-US&page=1`,
            API_OPTIONS,
          );
          const json = await res.json();
          return json.results?.[0] || null;
        }),
      );

      setResults(tmdbResults.filter(Boolean));
    } catch (err) {
      console.error(err);
      setError("Something went wrong with the search. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { search, results, loading, error };
};
export default useAiSearch;
