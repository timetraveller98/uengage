import Summary from "./Summary";

const Admin = async () => {
  return (
    <div className="flex gap-4 justify-between flex-wrap">
      <Summary users={12} />
    </div>
  );
};

export default Admin;
