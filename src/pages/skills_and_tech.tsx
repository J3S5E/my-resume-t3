import type { NextPage } from "next";

const SkillsAndTech: NextPage = () => {
  return (
    <div
      className="flex
      flex-col items-center
      justify-center gap-12"
    >
      <h1
        className="text-5xl font-extrabold
            tracking-tight text-white
            sm:text-[5rem] text-center"
      >
        Skills and Technologies
      </h1>
      <div
        className="container flex
            flex-wrap items-center
            justify-center gap-16"
      >
        <SkillGroup name="Programming Languages">
          <Skill name="TypeScript" level={8} emoji="🚀" />
          <Skill name="JavaScript" level={9} emoji="📜" />
          <Skill name="Java" level={7} emoji="☕" />
          <Skill name="Kotlin" level={5} emoji="🤖" />
          <Skill name="C" level={8} emoji="💻" />
          <Skill name="Python" level={7} emoji="🐍" />
          {/* <Skill name="C#" level={0} emoji="🔫" /> */}
          {/* <Skill name="Rust" level={0} emoji="🦀" /> */}
          {/* <Skill name="Go" level={0} emoji="🏃" /> */}
          {/* <Skill name="Ruby" level={0} emoji="💎" /> */}
        </SkillGroup>

        <SkillGroup name="Frameworks and Libraries">
          <Skill name="React" level={9} emoji="⚛️" />
          <Skill name="Next.js" level={8} emoji="🏎️" />
          <Skill name="Node.js" level={9} emoji="🟢" />
          <Skill name="Express" level={9} emoji="🌐" />
          <Skill name="Bootstrap" level={4} emoji="🎨" />
          <Skill name="Tailwind CSS" level={6} emoji="🎨" />
          <Skill name="Material UI" level={4} emoji="🎨" />
          {/* <Skill name="Spring" level={7} emoji="📦" /> */}
          {/* <Skill name="Django" level={7} emoji="📦" /> */}
          {/* <Skill name="React Native" level={7} emoji="📦" /> */}
          {/* <Skill name="Flutter" level={5} emoji="📦" /> */}
          {/* <Skill name="Electron" level={5} emoji="📦" /> */}
          {/* <Skill name="jQuery" level={8} emoji="📦" /> */}
          {/* <Skill name="Styled Components" level={8} emoji="📦" /> */}
          {/* <Skill name="Jest" level={8} emoji="📦" /> */}
          {/* <Skill name="Mocha" level={7} emoji="📦" /> */}
          {/* <Skill name="Cypress" level={7} emoji="📦" /> */}
          {/* <Skill name="React Testing Library" level={7} emoji="📦" /> */}
          {/* <Skill name="Selenium" level={7} emoji="📦" /> */}
        </SkillGroup>

        <SkillGroup name="Databases and Connectors">
          <Skill name="MongoDB" level={9} emoji="🍃" />
          <Skill name="MySQL" level={8} emoji="🐬" />
          <Skill name="PostgreSQL" level={0} emoji="🐘" />
          <Skill name="SQLite" level={8} emoji="🗃️" />
          <Skill name="Firebase" level={8} emoji="🔥" />
          <Skill name="MariaDB" level={8} emoji="🐬" />
          {/* <Skill name="Redis" level={0} emoji="🚀" /> */}
          {/* <Skill name="Cassandra" level={7} emoji="🗄️" /> */}
          <br />
          <Skill name="Mongoose" level={9} emoji="🐭" />
          <Skill name="Prisma" level={8} emoji="💎" />
          {/* <Skill name="Sequelize" level={8} emoji="🐭" />
          <Skill name="TypeORM" level={8} emoji="🐭" /> */}
        </SkillGroup>

        <SkillGroup name="Cloud Services">
          <Skill name="AWS" level={7} emoji="☁" />
          <Skill name="Azure" level={9} emoji="🏢" />
          <Skill name="Google Cloud" level={7} emoji="G" />
          {/* <Skill name="Heroku" level={8} emoji="🚀" /> */}
          {/* <Skill name="Netlify" level={8} emoji="🚀" /> */}
          <Skill name="Vercel" level={8} emoji="▲" />
          {/* <Skill name="Digital Ocean" level={7} emoji="🚀" /> */}
          {/* <Skill name="Linode" level={7} emoji="🚀" /> */}
          {/* <Skill name="Cloudflare" level={7} emoji="🚀" /> */}
          {/* <Skill name="Cloudinary" level={7} emoji="🚀" /> */}
          {/* <Skill name="SendGrid" level={7} emoji="🚀" /> */}
          {/* <Skill name="Twilio" level={7} emoji="🚀" /> */}
          <Skill name="Stripe" level={7} emoji="💳" />
          <Skill name="PayPal" level={9} emoji="💳" />
        </SkillGroup>

        <SkillGroup name="DevOps">
          <Skill name="CI/CD" level={8} emoji="🚀" />
          {/* <Skill name="Terraform" level={7} emoji="🌍" /> */}
          {/* <Skill name="Ansible" level={7} emoji="🤖" /> */}
          {/* <Skill name="Kubernetes" level={7} emoji="☸" /> */}
          <Skill name="Docker" level={7} emoji="🐳" />
          {/* <Skill name="Jenkins" level={7} emoji="🤖" /> */}
          <Skill name="Apache" level={7} emoji="🐧" />
          <Skill name="Nginx" level={7} emoji="🕸" />
        </SkillGroup>

        <SkillGroup name="Testing and Debugging">
          <Skill name="Unit Testing" level={8} emoji="🧪" />
          <Skill name="Integration Testing" level={0} emoji="🧪" />
          <Skill name="End-to-End Testing" level={0} emoji="🧪" />
          <Skill name="Manual Testing" level={9} emoji="🧪" />
          <br />
          <Skill name="Debugging" level={9} emoji="🐞" />
        </SkillGroup>

        <SkillGroup name="Project Management">
          <Skill name="Agile" level={0} emoji="🏃‍♂️" />
          <Skill name="Scrum" level={0} emoji="🏃‍♂️" />
          <Skill name="Kanban" level={0} emoji="🏃‍♂️" />
          <Skill name="Jira" level={0} emoji="🏃‍♂️" />
        </SkillGroup>

        <SkillGroup name="Communication and Collaboration">
          <Skill name="Teamwork" level={10} emoji="👨‍👩‍👧‍👦" />
          <Skill name="Communication" level={8} emoji="🗣" />
          <Skill name="Leadership" level={6} emoji="👨‍🏫" />
          <Skill name="Presentation" level={7} emoji="📢" />
          <Skill name="Documentation" level={8} emoji="📝" />
        </SkillGroup>

        <SkillGroup name="Software Engineering">
          <Skill name="Software Architecture" level={9} emoji="🐙" />
          <Skill name="Design Patterns" level={7} emoji="🐙" />
          <Skill name="Data Structures" level={9} emoji="🐙" />
          <Skill name="Algorithms" level={8} emoji="🐙" />
          <Skill name="Clean Code" level={9} emoji="🐙" />
          <Skill name="Code Reviews" level={9} emoji="🐙" />
          <Skill name="OO Programming" level={7} emoji="🐙" />
          <Skill name="Functional Programming" level={9} emoji="🐙" />
          <Skill name="REST APIs" level={9} emoji="🌐" />
          <Skill name="GraphQL" level={0} emoji="🐙" />
          <Skill name="Microservices" level={8} emoji="🐙" />
        </SkillGroup>

        <SkillGroup name="Tools and Platforms">
          <Skill name="Git/Github" level={8} emoji="🐙" />
          <Skill name="VS Code" level={9} emoji="📝" />
          <Skill name="Android Studio" level={7} emoji="🤖" />
          <Skill name="Eclipse" level={6} emoji="🌘" />
          <Skill name="Linux" level={7} emoji="🐧" />
          <Skill name="Windows" level={10} emoji="🖥" />
          <Skill name="MacOS" level={4} emoji="🍎" />
          <Skill name="Chrome DevTools" level={9} emoji="🔍" />
          <Skill name="Postman" level={8} emoji="👩‍🚀" />
          <Skill name="Figma" level={7} emoji="🖼" />
        </SkillGroup>
      </div>
    </div>
  );
};

type SkillGroupProps = {
  name: string;
  children: React.ReactNode;
};

const SkillGroup = ({ name, children }: SkillGroupProps) => {
  return (
    <div
      className="flex flex-col
            items-center justify-center
            gap-1 p-6 bg-gray-900 rounded-3xl shadow-2xl"
    >
      <p
        className="text-xl font-bold
            tracking-tight text-white
            sm:text-[3rem] sm:mb-8 mb-2"
      >
        {name}
      </p>
      {children}
    </div>
  );
};

const Skill: React.FC<{ name: string; level: number; emoji: string }> = ({
  name,
  level,
  emoji,
}) => {
  const getEmojis = () => {
    const returnArray = [];
    for (let i = 0; i < 10; i++) {
      if (i < level) {
        returnArray.push(<p>{emoji}</p>);
      } else {
        returnArray.push(
          <p
            className="text-transparent"
            style={{
              textShadow: "0 0 3px #000",
            }}
          >
            {emoji}
          </p>
        );
      }
    }
    return returnArray;
  };

  return (
    <div className="grid grid-cols-2 justify-items-center items-center gap-x-10 w-full">
      <p
        className=" tracking-tight text-white
        sm:text-[2rem]"
      >
        {name}
      </p>
      <div
        className="flex flex-row text-xs sm:text-lg w-full justify-around"
        title={`${level} / 10`}
      >
        {getEmojis()}
      </div>
    </div>
  );
};

export default SkillsAndTech;
