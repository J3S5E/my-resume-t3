import { useState, useEffect } from "react";

type Page = {
    name: string;
    link: string;
};

const pages: Page[] = [
    {
        name: "About Me",
        link: "/",
    },
    {
        name: "Projects",
        link: "/projects",
    },
    {
        name: "Contact Info",
        link: "/contact",
    },
];

// https://flowbite.com/docs/components/navbar/#navbar-with-cta-button

const Navbar = () => {
    const [hideOptions, setHideOptions] = useState(false);
    return (
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <NavTitle />
                    {hideOptions ? null : <NavOptions />}
                    <NavBurger
                        hideMenu={hideOptions}
                        triggerShow={setHideOptions}
                    />
                    <NavResume />
                </div>
            </nav>
        </>
    );
};

const NavTitle = () => {
    return (
        <a href="https://flowbite.com/" className="flex items-center">
            {/* TODO: add image */}
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Jesse Marr
            </span>
        </a>
    );
};

const NavOptions = () => {
    return (
        <div className="items-center justify-between w-full md:flex md:w-auto">
            <ul className="flex flex-col p-4 mt-4 mb-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:mb-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {pages.map((page, i) => (
                    <NavOption key={i} {...page} />
                ))}
            </ul>
        </div>
    );
};

const NavOption = ({ name, link }: Page) => {
    return (
        <li>
            <a
                href={link}
                className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
                {name}
            </a>
        </li>
    );
};

const NavResume = () => {
    return (
        <div className="flex">
            <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Resume
            </button>
        </div>
    );
};

const NavBurger = ({
    hideMenu,
    triggerShow,
}: {
    hideMenu: boolean;
    triggerShow: (hideMenu: boolean) => void;
}) => {
    return (
        <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => triggerShow(!hideMenu)}
        >
            <span className="sr-only">Open menu</span>
            <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                ></path>
            </svg>
        </button>
    );
};

export default Navbar;
