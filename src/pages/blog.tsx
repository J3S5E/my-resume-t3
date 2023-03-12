import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import BlogPostViewer from "../components/viewer/blogPost";
import { api } from "../utils/api";

const Blog: NextPage = () => {
  const { data, isError, error, isLoading } = api.blog.getAll.useQuery();
  const { data: session } = useSession();

  if (isError) {
    console.error(error);
    return <div>Error loading posts</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sortedPosts = data?.slice(0).sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  }) ?? [];

  const isAdmin = session?.user.admin === true;

  return (
    <>
        <div
            className="container flex
            flex-col items-center
            justify-center gap-12"
        >
            <h1
                className="text-5xl font-extrabold
            tracking-tight text-white
            sm:text-[5rem]"
            >
                Blog
            </h1>
            {
                isAdmin ? (
                    <NewPostForm />
                ) : null
            }
            <div
                className="flex flex-col
            md:flex-row flex-wrap
            items-center justify-center
            gap-6 w-full"
            >
                {sortedPosts.map((post) => (
                    <BlogPostViewer key={post.id} post={post} isAdmin />
                ))}
            </div>
        </div>
    </>
  );
};

const NewPostForm = () => {
    const title = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLTextAreaElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const publish = useRef<HTMLInputElement>(null);
    const slug = useRef<HTMLInputElement>(null);

    const addPost = api.blog.post.useMutation();

    function save() {
        console.log("Saving post");
        if (title.current === null || content.current === null || description.current === null || publish.current === null || slug.current === null) {
            console.error("Missing ref.current");
            return false;
        }
        try {
            addPost.mutate({
                title: title.current.value,
                content: content.current.value,
                description: description.current.value,
                published: publish.current.value === "on",
                slug: slug.current.value,
            }, {
                onError: (error) => {
                    console.error(error);
                }
            });
            return true;
        }
        catch (e) {
            console.error("Error saving post");
            console.error(e);
            return false;
        }
    }

    return (
        <div className="flex flex-col gap-4 bg-gray-900 p-4 rounded-xl shadow-lg w-full max-w-3xl">
            <h2 className="text-2xl font-bold">New Post</h2>
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full bg-gray-700 rounded p-2"
                    ref={title}
                />
                <input
                    type="text"
                    placeholder="Slug"
                    className="w-full bg-gray-700 rounded p-2"
                    ref={slug}
                />
                </div>
            <input
                type="text"
                placeholder="Description"
                className="w-full bg-gray-700 rounded p-2"
                ref={description}
            />
            <textarea
                placeholder="Content"
                className="w-full bg-gray-700 rounded p-2"
                ref={content}
            />
            <div className="flex flex-row gap-4">
                <label htmlFor="publish">Publish</label>
                <input
                    type="checkbox"
                    id="publish"
                    ref={publish}
                />
            </div>
            <button
                type="button"
                onClick={save}
                className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
                Post
            </button>
        </div>
    );
};




export default Blog;