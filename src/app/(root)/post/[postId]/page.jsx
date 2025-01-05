import Comments from "@/components/Comments";
import { auth, db } from "@/lib/firebaseConfig";
import { get, ref } from "firebase/database";
import Image from "next/image";
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

  console.log(post.image);

  return (
    <section className="py-8">
      <article className="flex flex-col md:flex-row px-2 md:px-4 justify-between items-start gap-4 md:gap-6 max-w-5xl mx-auto">
        <div className="w-full md:w-1/2">
          <Image
            src={post.image}
            width={300}
            height={200}
            alt={post.title}
            className="w-full rounded-md h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <h1 className="text-lg md:text-2xl font-semibold mb-2">
              {post.title}
            </h1>
            <p className="text-sm">{post.description}</p>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-3 border-b pb-2 border-gray-400">
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
