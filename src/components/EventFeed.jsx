import Post from "./Post";
import SkeletonPost from "./SkeletonPost";

const EventFeed = ({ posts, loading }) => {
  return (
    <div className="flex flex-col gap-2 md:gap-4 mt-4">
      {loading ? (
        <>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </>
      ) : posts ? (
        posts?.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No event published yet!</p>
      )}
    </div>
  );
};

export default EventFeed;
