interface AdminHeadingProps {
  title: string;
  center?: boolean;
}

const AdminHeading: React.FC<AdminHeadingProps> = ({ title, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-left"} mb-6`}>
      <h2
        className={`
          text-xl md:text-2xl font-semibold tracking-tight
          bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent
        `}
      >
        {title}
      </h2>
      <div
        className={`h-0.5 w-12 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 ${
          center ? "mx-auto" : ""
        }`}
      />
    </div>
  );
};

export default AdminHeading;
