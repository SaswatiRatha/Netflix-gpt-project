import { updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useState } from "react";
import { setCurrentUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const ManageProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [name, setName] = useState(currentUser?.name || "");
  const [photo, setPhoto] = useState("");
  const [showInput, setShowInput] = useState(false);

  const previewPhoto =
    photo.trim() ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=E50914&color=000000&bold=true`;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    const finalPhoto =
      photo.trim() ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name,
      )}&background=E50914&color=000000&bold=true`;

    console.log(finalPhoto);

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: finalPhoto,
    })
      .then(() => {
        dispatch(
          setCurrentUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name,
            photo: finalPhoto,
          }),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-1 sm:pt-16 pb-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">Edit Profile</h1>

      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-6 items-start">
        <button className="relative mx-auto sm:mx-0 w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={previewPhoto}
            alt="profile"
          />

          <img
            onClick={() => setShowInput((prev) => !prev)}
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/40 p-1 invert cursor-pointer"
            src="https://img.icons8.com/windows/32/edit--v1.png"
            alt="edit"
          />
        </button>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2">Profile Name</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-zinc-600 rounded-md px-4 py-2 outline-none"
              type="text"
            />
          </div>

          {showInput && (
            <div>
              <label className="block mb-2">Custom Profile URL</label>

              <input
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full border border-zinc-600 rounded-md px-4 py-2 outline-none"
                placeholder="https://..."
                type="text"
              />
            </div>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold">Your Email</h2>

        <p className="mt-3 text-base sm:text-lg break-all">
          {currentUser?.email}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSave}
          className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-md text-white"
        >
          Save
        </button>

        <button
          onClick={() => navigate("/browse")}
          className="flex-1 bg-zinc-600 hover:bg-zinc-700 py-2 rounded-md text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ManageProfile;
