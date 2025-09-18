const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-transparent border-t-green-900 border-b-green-900 rounded-full animate-spin"></div>
        <div className="absolute w-10 h-10 border-4 border-transparent border-t-green-900 border-b-green-900 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};
export default Loading;
