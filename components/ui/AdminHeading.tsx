interface AdminHeadingProps {
  title: string;
  center?: boolean;
}

const AdminHeading: React.FC<AdminHeadingProps> = ({ title, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-left"} mb-6`}>
      <h3
        className={`
          text-xl md:text-2xl font-semibold tracking-tight
          bg-gradient-to-r from-gray-600 to-black-800 bg-clip-text text-transparent
        `}
      >
        {title}
      </h3>
      <div
        className={`h-0.5 w-12 mt-2 rounded-full bg-gradient-to-r from-gray-500 to-black-800 ${
          center ? "mx-auto" : ""
        }`}
      />
    </div>
  );
};

export default AdminHeading;
