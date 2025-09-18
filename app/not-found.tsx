const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-[500px] relative overflow-hidden">
      <div className="text-center text-green-900 font-mono relative z-10">
        <div className="text-8xl font-bold glitch" data-text="404">
          404
        </div>
        <div className="text-xl mt-4 glitch" data-text="Page Not Found">
          Page Not Found
        </div>
      </div>
    </div>
  );
};

export default NotFound;
