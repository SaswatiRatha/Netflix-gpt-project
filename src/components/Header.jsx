import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGO } from "../utils/constants";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-between absolute z-10 w-screen px-8 py-4 shadow-lg bg-linear-to-b from-black">
      <img className="w-40" src={LOGO} alt="logo" />
      {user && (
        <div className="flex">
          <h1 className="font-bold text-white">Hello {user.name}!</h1>
          <button
            onClick={handleSignOut}
            className="bg-red-400 p-2 m-2 rounded-md text-white"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
