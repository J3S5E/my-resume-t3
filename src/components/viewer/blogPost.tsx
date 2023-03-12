import type { BlogPost } from "@prisma/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { api } from "../../utils/api";

type propsType = {
  post: BlogPost;
  isAdmin: boolean;
};

const BlogPostViewer = (props: propsType) => {
  const { post, isAdmin } = props;

  if (post.id === undefined || (post.published === false && !isAdmin)) {
    return <></>;
  }

  const { data } = api.blog.getPoster.useQuery({
    id: post.id,
  });

  function getDateString(date: Date): string {
    return `${date.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} @ ${date.toLocaleTimeString("en-AU", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  }

  function getEditedString(createdAt: Date, updatedAt: Date): string {
    // check if edited a different day than created
    if (createdAt.getDate() !== updatedAt.getDate()) {
      return `Last edit on - ${getDateString(updatedAt)}`;
    }
    return "";
  }

  return (
    <div
      className={
        isAdmin && !post.published
          ? "flex flex-col gap-4 bg-gray-700 p-4 rounded-xl shadow-lg w-full max-w-5xl relative"
          : "flex flex-col gap-4 bg-gray-900 p-4 rounded-xl shadow-lg w-full max-w-5xl relative"
      }
    >
      <div className="flex flex-row items-center gap-4">
        <>
          {data?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="rounded-full"
              src={data.image}
              alt="Poster"
              width={100}
              height={100}
            />
          ) : null}
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-bold pt-6">{post.title}</h2>
            <h3 className="text-xl font-bold">{post.description}</h3>
          </div>
        </>
      </div>
      <ReactMarkdown className="text-xl">{post.content}</ReactMarkdown>
      <div className="absolute text-right w-full pr-6 top-0 pt-1">
        <p>Posted on - {getDateString(post.createdAt)}</p>
        <p>{getEditedString(post.createdAt, post.updatedAt)}</p>
      </div>
    </div>
  );
};

export default BlogPostViewer;