import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import log from "../../../assets/img/log.svg";

const NavBar = () => {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const activeLinkStyle = "text-blue-500 dark:text-blue-400";

  return (
    <header className="flex items-center justify-between py-4 px-6 shadow-md bg-white dark:bg-gray-900 duration-500">
      <nav className="flex w-full max-w-[85rem] mx-auto items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src={log} alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            Innova
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Skills
            </span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <button
            onClick={() => navigate("/Propos")}
            className={`text-gray-800 dark:text-white hover:${activeLinkStyle}`}
          >
            À Propos
          </button>
          <button
            onClick={() => navigate("/ressources")}
            className={`text-gray-800 dark:text-white hover:${activeLinkStyle}`}
          >
            Ressources
          </button>
        </div>

        {/* Authentication and Dark Mode Section */}
        <div className="flex items-center gap-4">
          {/* Buttons */}
          <button
            type="button"
            className="py-2 px-4 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            onClick={() => navigate("/")}
          >
            Se connecter
          </button>
          <button
            type="button"
            className="py-2 px-4 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-gray-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            onClick={() => navigate("/Signup")}
          >
            S'inscrire
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={darkModeHandler}
            className="text-gray-800 dark:text-gray-300 hover:text-blue-500"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>

          {/* Responsive Toggle */}
          <button
            type="button"
            className="block md:hidden p-2.5 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-label="Toggle navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
