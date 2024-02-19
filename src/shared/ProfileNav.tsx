import Link from "next/link";

type ProfileNavNavProps = {
  onSidebarItemClick: (path: string) => void;
};

const ProfileNav = ({ onSidebarItemClick }: ProfileNavNavProps) => {
  const navItems = [
    { path: "/profile", icon: "P", name: "Profile" },
    {
      path: "",
      icon: "B",
      name: "Buddies",
    },
    {
      path: "",
      icon: "D",
      name: "Discover",
    },
    { path: "", icon: "SP", name: "Settings" },
  ];

  const handleLogoClick = () => {
    onSidebarItemClick("Profile");
  };
  const handleMenuClick = (name: string) => {
    onSidebarItemClick(name);
  };
  return (
    <header className="fixed bottom-0 left-0 md:relative md:top-0 w-full flex rounded-t-lg bg-blue-100 md:bg-transparent rounded-lg text-xl justify-center items-center transition-all duration-500 ease-in-out">
      <nav className="w-full mx-auto items-center justify-center md:py-3">
        <ul
          className="py-4 flex 
               justify-center md:justify-between items-center md:space-x-10 lg:mb-10"
        >
          <button
            className="text-green-500 hidden md:flex flex-row items-center justify-center"
            onClick={handleLogoClick}
          >
            Logo
          </button>
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-center md:space-x-3"
              >
                <Link
                  href={item.path}
                  onClick={() => handleMenuClick(item.name)}
                >
                  <span className="flex flex-col items-center justify-center">
                    <span className="md:hidden">{item.icon}</span>
                    <span className="mt-1 text-sm">{item.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};
export default ProfileNav;
