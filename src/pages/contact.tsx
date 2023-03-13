import type { NextPage } from "next";

const Contact: NextPage = () => {
  return (
    <div
      className="flex
          flex-col items-center
          justify-center gap-12"
    >
      <h1
        className="text-5xl font-extrabold
                tracking-tight text-white
                sm:text-[5rem] text-center mb-8"
      >
        Contact Information
      </h1>
      <div className="grid grid-cols-2 justify-items-center items-center gap-x-10 w-full ">
        <h2 className="text-xl tracking-tight text-white sm:text-[1.5rem]">
          Email Address
        </h2>
        <a
          href="mailto:jesse.marr@icloud.com"
          className="text-2xl tracking-tight text-white sm:text-[2rem] underline"
        >
          jesse.marr@icloud.com
        </a>
      </div>
      <div className="grid grid-cols-2 justify-items-center items-center gap-x-10 w-full ">
        <h2 className="text-xl tracking-tight text-white sm:text-[1.5rem]">
          Phone Number
        </h2>
        <a
          href="tel:0450168796"
          className="text-2xl tracking-tight text-white sm:text-[2rem] underline"
        >
          0450 168 796
        </a>
      </div>
      <div className="grid grid-cols-2 justify-items-center items-center gap-x-10 w-full ">
        <h2 className="text-xl tracking-tight text-white sm:text-[1.5rem]">
          Social Media
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <a href="https://github.com/J3S5E" target="_blank" rel="noreferrer">
            <img
              src="/github.svg"
              alt="Github"
              className="inline-block w-6 h-6 sm:w-8 sm:h-8"
            />
          </a>
          <a href="/" target="_blank" rel="noreferrer">
            <img
              src="/linkedin.svg"
              alt="LinkedIn"
              className="inline-block w-6 h-6 sm:w-8 sm:h-8"
            />
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-items-center items-center gap-x-10 w-full ">
        <h2 className="text-xl tracking-tight text-white sm:text-[1.5rem]">
          Location
        </h2>
        <p className="text-2xl tracking-tight text-white sm:text-[2rem]">
          Perth, Australia
        </p>
      </div>
      <div className="flex flex-col container mt-8">
        <p className="text-2xl tracking-tight text-white sm:text-[2rem]">
          I&#39;m available for internships or part-time roles while I finish my
          studies. My goal is to gain practical experience and contribute to a
          dynamic team. While I&#39;m interested in full-time work after graduation,
          my immediate priority is to gain valuable experience that will enhance
          my career prospects.
        </p>
      </div>
    </div>
  );
};

export default Contact;
