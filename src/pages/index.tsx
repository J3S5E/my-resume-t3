import type { NextPage } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

const Home: NextPage = () => {
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Hello, my name is{" "}
          <span className="text-[hsl(125,100%,60%)]">Jesse Marr</span>
        </h1>
        <Paragraph>
          I am currently in my final year of studying software engineering at
          Curtin University. While I am currently a systems administrator at a
          high school, my passion lies in developing software that can solve
          complex problems and improve people&#39;s lives.
        </Paragraph>
        <Paragraph>
          Throughout my academic journey, I have worked on different{" "}
          <Link className="text-blue-500 underline" href={"/projects"}>
            projects
          </Link>{" "}
          that have given me opportunities to learn and grow to increase my{" "}
          <Link className="text-blue-500 underline" href={"/skills_and_tech"}>
            skillset
          </Link>
          .
        </Paragraph>
        <Paragraph>
          My goal is to continue growing as a software engineer and contribute
          to innovative projects that can make a positive impact on society.
          I&#39;m available for internships or part-time roles while I finish my
          studies. My goal is to gain practical experience and contribute to a
          dynamic team. While I&#39;m interested in full-time work after
          graduation, my immediate priority is to gain valuable experience that
          will enhance my career prospects.
        </Paragraph>
        <Paragraph>
          In my spare time, I enjoy a range of hobbies that keep me balanced and
          focused. I play golf and find the game to be a great way to unwind and
          connect with nature. I also enjoy board-sports such as surfing and
          skateboarding, which require a balance of physical strength, mental
          focus, and creativity.
          <br />I am a gamer and find that video games provide a unique platform
          for storytelling and problem-solving. I enjoy exploring new games and
          the technologies that power them, and believe that gaming can have a
          positive impact on society.
        </Paragraph>
        <Paragraph>
          If you have any opportunities that align with my goals, please feel
          free to reach out to me through any of{" "}
          <Link className="text-blue-500 underline" href={"/contact"}>
            these contact methods
          </Link>
          .
        </Paragraph>
        <Paragraph>
          Thank you for taking the time to learn more about me, and I look
          forward to connecting with you.
        </Paragraph>
      </div>
    </>
  );
};

const Paragraph = ({ children }: { children: ReactNode }) => {
  return (
    <span className="text-xl text-gray-300 w-full text-left">{children}</span>
  );
};

export default Home;
