import { API_OPTIONS } from "../utils/constants";

const BASE_URL = "https://api.themoviedb.org/3";

const request = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch TMDB data with http error ${response.status}`,
      );
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};

export const getCast = async (id, type) => {
  const json = await request(`/${type}/${id}/credits?language=en-US`);
  const cast = json.cast.filter(
    (item) => item.known_for_department === "Acting",
  );
  const castNames = cast.map((cast) => cast.name);
  return castNames;
};
