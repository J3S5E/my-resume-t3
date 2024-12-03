import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import logo from "../../public/logo.png";

type Page = {
  name: string;
  link: string;
};

type NavOptionProp = {
  name: string;
  link: string;
  triggerHide: (hideMenu: boolean) => void;
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
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Skills and Technologies",
    link: "/skills_and_tech",
  },
  {
    name: "Contact Info",
    link: "/contact",
  },
];

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({ width: undefined, height: undefined });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// https://flowbite.com/docs/components/navbar/#navbar-with-cta-button

const Navbar = () => {
  const [hideOptions, setHideOptions] = useState(true);
  const { width } = useWindowSize();
  const smallScreen = width !== undefined && width < 768;
  return (
    <>
      <nav className="border-gray-200 bg-gray-900 px-2 py-2.5 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between md:justify-evenly">
          <NavTitle />
          {hideOptions && smallScreen ? null : (
            <NavOptions triggerHide={setHideOptions} />
          )}
          <NavBurger hideMenu={hideOptions} triggerHide={setHideOptions} />
          <NavResume />
        </div>
      </nav>
    </>
  );
};

const NavTitle = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        width="64"
        height="64"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        src={logo}
        alt="Logo"
        className="mr-5 inline-block h-10 w-10"
        placeholder="blur"
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold">
        Jesse Marr
      </span>
    </Link>
  );
};

const NavOptions = ({
  triggerHide,
}: {
  triggerHide: (hideMenu: boolean) => void;
}) => {
  return (
    <div className="w-full items-center justify-between md:flex md:w-auto">
      <ul className="mt-4 mb-4 flex flex-col rounded-lg border border-gray-700 bg-gray-900 p-4 md:mt-0 md:mb-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
        {pages.map((page, i) => (
          <NavOption key={i} {...page} triggerHide={triggerHide} />
        ))}
      </ul>
    </div>
  );
};

const NavOption = ({ name, link, triggerHide }: NavOptionProp) => {
  // get current page
  const currentPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { pathname } = router;
    return pathname;
  };
  return (
    <li>
      <Link
        href={link}
        className="block rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700"
        onClick={() => triggerHide(true)}
      >
        {currentPage() === link ? (
          <span className="font-extrabold text-white">{name}</span>
        ) : (
          <span>{name}</span>
        )}
      </Link>
    </li>
  );
};

const NavResume = () => {
  return (
    <div className="flex">
      <a href="/JesseMarr-Resume.pdf">
        <button
          type="button"
          className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
        >
          Resume
        </button>
      </a>
    </div>
  );
};

const NavBurger = ({
  hideMenu,
  triggerHide,
}: {
  hideMenu: boolean;
  triggerHide: (hideMenu: boolean) => void;
}) => {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
      onClick={() => triggerHide(!hideMenu)}
    >
      <span className="sr-only">Open menu</span>
      <svg
        className="h-6 w-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
      </svg>
    </button>
  );
};

export default Navbar;
