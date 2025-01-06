import Comments from "@/components/Comments";
import PostAuthor from "@/components/PostAuthor";
import PostOverview from "@/components/PostOverview";
import { db } from "@/lib/firebaseConfig";
import { get, ref } from "firebase/database";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPost(postId) {
  try {
    const postRef = ref(db, `posts/${postId}`);

    const snapshot = await get(postRef);

    if (snapshot.exists()) return snapshot.val();
  } catch (error) {
    console.log(error.message);
  }
}

const PostDetails = async ({ params }) => {
  const postId = (await params).postId;
  const post = await getPost(postId);

  if (!post) return notFound();

  return (
    <section className="py-8 max-w-5xl mx-auto">
      <div className="my-3 ml-3 flex items-center gap-1">
        <Link href="/" className="font-semibold">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`posts/${postId}`} className="font-semibold">
          Post
        </Link>
      </div>
      <article className="flex flex-col md:flex-row px-2 md:px-4 justify-between items-start gap-4 md:gap-6">
        <div className="w-full md:w-1/2">
          <Image
            src={post.image}
            width={300}
            height={200}
            alt={post.title}
            className="w-full rounded-md h-auto"
          />

          <PostOverview likes={post.likes} comments={post.comments} />
        </div>
        <div className="w-full md:w-1/2">
          <PostAuthor post={post} />

          <div className="mb-4">
            <h1 className="text-lg text-gray-600 dark:text-gray-300 md:text-2xl font-semibold mb-2">
              {post.title}
            </h1>
            <p
              className="text-sm text-gray-600 dark:text-gray-300"
              style={{ whiteSpace: "pre-line" }}
            >
              {post.description}
            </p>
          </div>

          <div className="mt-8 max-h-[600px] overflow-y-auto">
            <h3 className="font-semibold text-gray-600 dark:text-gray-300 text-lg mb-3 border-b pb-2 border-gray-400">
              What people say!
            </h3>

            <Comments postId={postId} individual={true} />
          </div>
        </div>
      </article>
    </section>
  );
};

export default PostDetails;
