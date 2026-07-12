import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { removeCurrentUser } from "../store/slices/userSlice";

const UserProfile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(removeCurrentUser());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-5">
      {/* Profile */}
      <div className="flex flex-col items-center">
        <img
          src={user?.photo}
          alt="profile"
          className="w-28 h-28 rounded-xl object-cover"
        />

        <h1 className="mt-4 text-2xl font-bold">{user?.name}</h1>

        <p className="text-gray-400">{user?.email}</p>
      </div>

      {/* Menu */}
      <div className="mt-10 space-y-3">
        <button
          onClick={() => navigate("/manage-profile")}
          className="w-full rounded-lg bg-zinc-900 px-5 py-4 flex justify-between items-center hover:bg-zinc-800"
        >
          <span>Manage Profile</span>
          <span>›</span>
        </button>

        <button
          onClick={() => navigate("/watchlist")}
          className="w-full rounded-lg bg-zinc-900 px-5 py-4 flex justify-between items-center hover:bg-zinc-800"
        >
          <span>My List</span>
          <span>›</span>
        </button>

        <button
          onClick={() => navigate("/language")}
          className="w-full rounded-lg bg-zinc-900 px-5 py-4 flex justify-between items-center hover:bg-zinc-800"
        >
          <span>Browse by Language</span>
          <span>›</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-600 py-4 font-semibold hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
