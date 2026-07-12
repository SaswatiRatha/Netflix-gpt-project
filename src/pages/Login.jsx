import { useRef, useState } from "react";
import { checkValidation } from "../utils/validateForm";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store/slices/userSlice";
import { LOGIN_BG } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [error, setError] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSignInForm) {
      const checkError = checkValidation(
        email.current.value,
        password.current.value,
      );
      setError(checkError);
      if (checkError) return;
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              name.current.value,
            )}&background=E50914&color=000000&bold=true`,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(
                setCurrentUser({
                  uid: uid,
                  email: email,
                  name: displayName,
                  photo: photoURL,
                }),
              );
              //navigate("/browse");
            })
            .catch((error) => {
              console.log(error);
            });
          //console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            setError((prev) => ({
              ...prev,
              email: "Email already registered. Please sign in.",
            }));
          }

          console.log("Error:", errorCode + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError("Invalid email or password!");
          console.log(errorCode + errorMessage);
        });
    }
  };

  console.log(error);

  return (
    <div>
      <img
        className="absolute w-full h-dvh object-cover"
        src={LOGIN_BG}
        alt="background-img"
      />

      <form className="flex flex-col absolute left-1/2 top-30 z-20 w-[min(90vw,26rem)] -translate-x-1/2 rounded-lg bg-black/80 p-6 text-white shadow-xl sm:p-10">
        <h1 className="font-bold text-3xl pb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="bg-gray-800 p-2 my-2 rounded-md"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email address"
          className="bg-gray-800 p-2 my-2 rounded-md"
        />
        {!isSignInForm && error?.email ? (
          <span className="text-red-400 text-sm mb-2 italic">
            {error.email}
          </span>
        ) : (
          ""
        )}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="bg-gray-800 p-2 my-2 rounded-md"
        />
        {!isSignInForm ? (
          error?.password ? (
            <span className="text-red-400 text-sm mb-2 italic">
              {error.password}
            </span>
          ) : (
            ""
          )
        ) : error ? (
          <span className="text-red-400 text-sm mb-2 italic">{error}</span>
        ) : (
          ""
        )}
        <button
          className="bg-red-600 p-2 my-2  rounded-md"
          onClick={handleSubmit}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div>
          {isSignInForm ? "New to Netflix?" : "Already registered?"}{" "}
          <button type="button" className="underline" onClick={toggleSignIn}>
            {isSignInForm ? "Signup" : "Signin"}
          </button>{" "}
          Now
        </div>
      </form>
    </div>
  );
};

export default Login;
