import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";

const Navbar = () => {
  return (
    <div className="flex justify-between p-4 shadow">
      <h1 className="text-xl font-semibold">Pension Management</h1>
      <NotificationDropdown />
    </div>
  );
};

export default Navbar;
