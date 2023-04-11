import type { BlogPost } from "@prisma/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { api } from "../../utils/api";
import Image from "next/image";

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
      className={`flex flex-col gap-4 ${
        post.published ? "bg-gray-900" : "bg-gray-700"
      } relative w-full max-w-5xl rounded-xl p-4 shadow-lg`}
    >
      <div className="flex flex-row items-center gap-4">
        <>
          {data?.image ? (
            <Image
              className="rounded-full"
              src={data.image}
              alt="Poster"
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={`/_next/image?url=${data.image}&w=16&q=15`}
            />
          ) : null}
          <div className="flex flex-col gap-2">
            <h2 className="pt-6 text-4xl font-bold">{post.title}</h2>
            <h3 className="text-xl font-bold">{post.description}</h3>
          </div>
        </>
      </div>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      <div className="absolute top-0 w-full pr-6 pt-1 text-right">
        <p>Posted on - {getDateString(post.createdAt)}</p>
        <p>{getEditedString(post.createdAt, post.updatedAt)}</p>
      </div>
    </div>
  );
};

export default BlogPostViewer;
