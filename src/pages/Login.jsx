import { useState } from "react";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignIn = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (
        <div>
            <img className="absolute w-full h-dvh object-cover" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw" alt="background-img" />
            <form className="flex flex-col absolute max-w-max p-10 my-36 mx-auto right-0 left-0 bg-black/80 text-white rounded-lg">
                <h1 className="font-bold text-3xl pb-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input type="text" placeholder="Full Name" className="bg-gray-800 p-2 my-2 rounded-md" />}
                <input type="email" placeholder="Email address" className="bg-gray-800 p-2 my-2 rounded-md" />
                <input type="password" placeholder="Password" className="bg-gray-800 p-2 my-2 rounded-md" />
                <button className="bg-red-600 p-2 my-2  rounded-md">{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <div>{isSignInForm ? "New to Netflix?" : "Already registered?"} <button type="button" className="underline" onClick={toggleSignIn}>{isSignInForm? "Signup": "Signin"}</button>{" "}Now</div>
            </form>
        </div>
    )
}

export default Login;