const SkeletonComment = () => {
  return (
    <div className="p-2 rounded-md flex items-start gap-2 animate-pulse">
      <div className="h-8 w-8 rounded-full bg-gray-400"></div>
      <div className="text-sm w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300 flex flex-col items-start gap-1">
        <div className="h-4 bg-gray-400 w-1/3 rounded"></div>
        <div className="h-3 bg-gray-400 w-full rounded mt-1"></div>
      </div>
    </div>
  );
};

export default SkeletonComment;
