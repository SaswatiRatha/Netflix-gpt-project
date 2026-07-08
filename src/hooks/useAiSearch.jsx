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
      console.log("Search started");
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
                content: `You are a recommendation engine.
                        Return ONLY a JSON array of 8-10 objects in this format:
                        [
                          {
                            "title": "Breaking Bad",
                            "type": "tv"
                          },
                          {
                            "title": "The Conjuring",
                            "type": "movie"
                          }
                        ]

                        Rules:
                        - Return only valid JSON.
                        - No markdown.
                        - No explanation.
                        - The "type" field must be either "movie" or "tv".
                        - Use real TMDB titles.
                        - Include the release year in the title only if needed to disambiguate remakes.`,
              },
              { role: "user", content: query },
            ],
          }),
        },
      );

      if (!aiRes.ok) throw new Error("AI request failed");
      console.log("Search started");

      console.log("AI response received");

      const aiData = await aiRes.json();

      console.log(aiData);

      const text = aiData.choices?.[0]?.message?.content?.trim() || "[]";

      console.log(text);

      const clean = text.replace(/```json|```/g, "").trim();
      const titles = JSON.parse(clean);

      console.log("titles", titles);
      const tmdbResults = await Promise.all(
        titles.map(async ({ title, type }) => {
          const searchTitle = title.replace(/\s*\(\d{4}\)\s*$/, "");
          const normalizedType = type?.toLowerCase() === "tv" ? "tv" : "movie";

          const res = await fetch(
            `https://api.themoviedb.org/3/search/${normalizedType}?query=${encodeURIComponent(
              searchTitle,
            )}&include_adult=false&language=en-US&page=1`,
            API_OPTIONS,
          );
          const json = await res.json();
          console.log(json);

          let result = json.results?.[0] || null;
          if (!result) {
            const fallbackRes = await fetch(
              `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
                searchTitle,
              )}&include_adult=false&language=en-US&page=1`,
              API_OPTIONS,
            );
            const fallbackJson = await fallbackRes.json();
            result =
              fallbackJson.results?.find(
                (item) => item.media_type === normalizedType,
              ) ||
              fallbackJson.results?.find(
                (item) =>
                  item.media_type === "movie" || item.media_type === "tv",
              ) ||
              null;
          }

          if (result && !result.media_type) {
            result.media_type = normalizedType;
          }

          return result || null;
        }),
      );

      const finalResults = tmdbResults.filter(Boolean);

      setResults(finalResults);

      return finalResults;
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
