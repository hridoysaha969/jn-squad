import { getTimeAgo } from "@/lib/getTimeAgo";
import { fetchAuthor } from "@/services/fetchAuthor";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NotificationItem = ({ item }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (item?.authorId) {
      fetchAuthor(item.authorId).then((author) => setAuthor(author));
    }
    setLoading(false);
  }, [item]);

  if (loading) return;
  console.log(item);

  return (
    <DropdownMenuItem className="hover:outline-none mb-2">
      <Link
        href={`/post/${item?.postId}`}
        className="flex gap-2 shadow-md py-1 rounded-md items-center justify-start px-1 md:px-2"
      >
        {!loading && author && (
          <Image
            src={author.photoURL || "/avatar.png"}
            width={30}
            height={30}
            loading="lazy"
            alt={author.displayName}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col gap-1 items-start">
          <p className="text-sm">
            <strong>{author?.displayName}</strong> just published a new event at
            JN Squad.
          </p>
          <span className="text-xs">{getTimeAgo(item?.timeStamp)}</span>
        </div>
      </Link>
    </DropdownMenuItem>
  );
};

export default NotificationItem;
