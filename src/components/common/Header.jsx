import { useSelector } from "react-redux";
import SearchBar from "../search/SearchBar";
import Navbar from "./Navbar";
import Profile from "./Profile";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  //console.log(user);

  return (
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-black/90 px-4 py-4  shadow-lg sm:px-8">
      <Navbar />

      {user && (
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <SearchBar />

          {/* <p className="hidden md:block text-sm font-medium text-gray-300">
            {user.name}
          </p> */}
          <Profile />
        </div>
      )}
    </header>
  );
};

export default Header;
