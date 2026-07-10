import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-7xl font-extrabold text-red-600 sm:text-8xl">
          404
        </h1>

        <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
          Lost your way?
        </h2>

        <p className="mt-4 text-base leading-7 text-gray-400 sm:text-lg">
          Sorry, we can't find the page you're looking for. You'll find lots to
          explore on the home page.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/browse"
            className="rounded-md bg-red-600 px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-red-700"
          >
            Go to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-md border border-gray-500 px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
          >
            Go Back
          </button>
        </div>

        <p className="mt-12 text-sm text-gray-500">Error Code: NSES-404</p>
      </div>
    </div>
  );
};

export default Error;
