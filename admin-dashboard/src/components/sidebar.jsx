import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { HiMenu, HiX } from "react-icons/hi";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Stats", href: "/statistics" },
];



function RightSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="fixed top-0 left-0 z-50">
      {/* Expand/hide button for small screens */}
      <button
        className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 block md:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <HiX className="h-6 w-6" aria-hidden="true" />
        ) : (
          <HiMenu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Navigation links */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="md:block"
      />
      <div className="fixed top-0 left-0 w-80 h-screen bg-white dark:bg-gray-800 shadow-lg py-4 px-3">
        <div className="my-8">
          <h3 className="text-gray-600 dark:text-gray-400 font-medium mb-4">
            Admin Profile
          </h3>
          <div className="flex items-center space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src="https://picsum.photos/id/1025/200/200"
              alt="Admin Profile"
            />
            <div>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                John Doe
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Admin</p>
            </div>
          </div>
        </div>
        <nav>
          <ul className="space-y-2">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Dark mode toggle */}
        <div className="flex justify-end mt-8">
          <button
            className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <svg
                className="h-5 w-5 text-gray-800 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-800 dark:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a10 10 0 100 20 10 10 0 000-20zM7.364 4.636a7.5 7.5 0 010 10.728A7.5 7.5 0 014.636 7.364a7.5 7.5 0 0110.728 0 7.5 7.5 0 010 10.728 7.5 7.5 0 01-10.728 0 7.5 7.5 0 010-10.728z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default RightSideBar