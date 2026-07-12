import { useDispatch, useSelector } from "react-redux";
import useMediaList from "../hooks/useMediaList";
import Dropdown from "../components/media/Dropdown";
import { LANGUAGES, LOGIN_BG } from "../utils/constants";
import {
  setLanguageMovieList,
  setLanguageTVList,
  setSelectedLanguage,
} from "../store/slices/mediaSlice";
import MediaGrid from "../components/media/MediaGrid";
import { useEffect, useMemo } from "react";

const LanguageBrowse = () => {
  const selectedLanguage = useSelector((state) => state.media.selectedLanguage);
  const languageMovieList = useSelector(
    (state) => state.media.languageMovieList,
  );
  const languageTVList = useSelector((state) => state.media.languageTVList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedLanguage({ id: "en", name: "English" }));
  }, [dispatch]);
  useMediaList(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=${selectedLanguage.id}`,
    "movie",
    setLanguageMovieList,
  );
  useMediaList(
    `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=${selectedLanguage.id}`,
    "tv",
    setLanguageTVList,
  );
  const mediaList = useMemo(() => {
    const movies = languageMovieList || [];
    const tv = languageTVList || [];
    return [...movies, ...tv].sort(
      (a, b) => (b.popularity || 0) - (a.popularity || 0),
    );
  }, [languageMovieList, languageTVList]);

  const filteredMediaList = mediaList.filter(
    (media) => media.poster_path !== null,
  );

  if (selectedLanguage.id === 0 || !languageMovieList || !languageTVList)
    return;

  //const mediaList = [...languageMovieList, ...languageTVList];
  //console.log(mediaList);

  return (
    <div className="relative min-h-screen px-4 overflow-hidden bg-black">
      <img
        className="fixed inset-0 h-dvh w-full object-cover"
        src={LOGIN_BG}
        alt="background-img"
      />
      <div className="fixed inset-0 z-10 bg-black/80" />

      <div className="fixed top-16 left-0 right-0 z-30 flex items-center justify-between px-4 py-4 sm:px-8 bg-black/90 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:text-3xl">
          Browse by Language
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-white">Select Language:</p>
          <Dropdown value={LANGUAGES} type="language" />
        </div>
      </div>

      <div className="bg-black">
        <div className="relative z-10 pb-8 pt-20 sm:pt-70 sm:-mt-14 md:-mt-28 lg:-mt-34">
          <MediaGrid title="" movies={filteredMediaList} />
        </div>
      </div>
    </div>
  );
};

export default LanguageBrowse;
