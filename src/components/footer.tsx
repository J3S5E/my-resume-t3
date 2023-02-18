import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-gray-900 border-gray-200 px-2 sm:px-4 py-2.5 text-center">
      <b>Jesse Marr</b>
      <div className="flex justify-center gap-2">
        <a href="https://github.com/J3S5E" target="_blank" rel="noreferrer">
          <Image
            width="100"
            height="100"
            src="/github.svg"
            alt="Github"
            className="inline-block w-6 h-6"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
