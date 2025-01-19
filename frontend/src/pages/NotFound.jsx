import React from "react";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "../components";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-bg dark:bg-dark-primary-bg text-center transition-colors px-4 sm:px-6 lg:px-8">

      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-text dark:text-dark-primary-text mb-6">
        404 - Page Not Found
      </h1>

      <img
        src="https://media.tenor.com/kv12Y9MZo8IAAAAi/cute-worried.gif"
        alt="404"
        className="w-1/2 sm:w-1/3 lg:w-1/4 mx-auto mb-8"
      />
      
      <Link
        to="/"
        className="px-6 sm:px-8 lg:px-10 py-2 sm:py-3 bg-accent-color dark:bg-dark-accent-color text-white font-medium rounded-full shadow-md hover:shadow-lg hover:bg-pink-600 dark:hover:bg-pink-500 transition-all duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
