const SkeletonPost = () => {
  return (
    <article className="bg-white dark:bg-gray-800 p-2 shadow-md rounded-sm animate-pulse">
      <div className="flex justify-between items-center mb-2">
        <div className=" flex items-center gap-2">
          <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-gray-300 dark:bg-gray-400 text-gray-900 flex justify-center items-center"></div>
          <div className="flex items-center gap-2">
            <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded w-[100px]"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded w-[100px]"></div>
          </div>
        </div>
        <div className="h-6 w-6"></div>
      </div>
      <div className="flex flex-row gap-2 mb-1">
        <div className="dark:bg-gray-500 bg-gray-300 rounded mt-1 w-1/2 h-24"></div>
        <div className="dark:bg-gray-500 bg-gray-300 rounded mt-1 w-1/2 h-24"></div>
      </div>
      <div className="flex px-3 items-center justify-between mt-3 pt-2 border-t border-gray-300 dark:border-gray-500 gap-3">
        <div className="h-6 w-6"></div>
        <div className="h-6 w-6"></div>
        <div className="h-6 w-6"></div>
      </div>
    </article>
  );
};

export default SkeletonPost;
