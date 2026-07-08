import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeCurrentUser, setCurrentUser } from "../store/slices/userSlice";
import Header from "./common/Header";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          setCurrentUser({
            uid: uid,
            email: email,
            name: displayName,
          }),
        );

        navigate("/browse");
      } else {
        dispatch(removeCurrentUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-20 sm:pt-2">
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
