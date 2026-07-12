import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";

const Profile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dropdownref = useRef(null);
  useOutsideClick(dropdownref, () => setIsProfileOpen(false), isProfileOpen);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleProfileClick = () => {
    if (window.matchMedia("(max-width: 639px)").matches) {
      navigate("/profile");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };
  return (
    <div ref={dropdownref} className="relative">
      <button onClick={handleProfileClick} className="flex gap-1 items-center">
        <img src={user?.photo} alt="profile" className="w-8 h-8 rounded-lg" />
        <span className="fill-white text-white hidden sm:block text-xs ml-2">
          ▼
        </span>
      </button>
      {isProfileOpen && (
        <div className="absolute flex flex-col top-full right-0  mt-1 w-max rounded-md border border-gray-600 bg-zinc-900 shadow-lg z-50">
          <h1
            onClick={() => setIsProfileOpen(false)}
            className="w-full px-4 py-2 text-center text-white text-base font-bold"
          >
            {user.name}
          </h1>
          <button
            onClick={() => navigate("/manage-profile")}
            className="w-full px-4 py-2 text-center text-white hover:bg-gray-700 text-base"
          >
            Manage Profile
          </button>
          <button
            onClick={handleSignOut}
            className=" border-t border-gray-600 w-full px-4 py-2 text-center text-white hover:bg-gray-700 text-base"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
