import Information from "@/components/Information";
import Post from "@/components/Post";
import ProfileHeader from "@/components/ProfileHeader";
import Image from "next/image";

const Profile = async () => {
  return (
    <section className="pb-8">
      <div className="max-w-5xl mx-auto px-2 md:px-4 mt-2">
        <div className="w-full aspect-[16/7] relative overflow-hidden rounded-t-md">
          <Image
            src="/1.png"
            alt="Cover Image"
            fill
            className="h-full w-full"
          />
        </div>
        <ProfileHeader />

        <div className="mt-4 flex flex-col gap-4 md:flex-row items-start justify-between">
          <Information />
          <div className="w-full md:w-1/2 lg:w-2/3">
            <h1 className="bg-white shadow-md dark:bg-gray-800 rounded-md p-4 text-xl  font-semibold text-gray-600 dark:text-gray-300">
              Posts
            </h1>
            <div className="flex flex-col gap-2 md:gap-4 md:mt-4 mt-2">
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
