import Buddies from "@/components/Buddies";
import Discover from "@/components/Discover";
import SettingsAndPrivacy from "@/components/SettingsAndPrivacy";
import ProfileNav from "@/shared/ProfileNav";
import { type ReactNode, useState } from "react";

type ProfilePageLayoutProps = {
  children: ReactNode;
};

export const ProfilePageLayout = ({
  children,
}: ProfilePageLayoutProps): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState("Profile");

  const handleSidebarItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "Profile":
        return children;
      case "Buddies":
        return <Buddies />;
      case "Discover":
        return <Discover />;
      case "Settings":
        return <SettingsAndPrivacy />;

      default:
        return null;
    }
  };

  return (
    <main className=" min-h-full scroll-smooth">
      <div className="hidden md:flex">
        <ProfileNav onSidebarItemClick={handleSidebarItemClick} />
      </div>
      <section>{renderSelectedComponent()}</section>
      <div className="md:hidden flex-1 overflow-y-auto">
        <ProfileNav onSidebarItemClick={handleSidebarItemClick} />
      </div>
    </main>
  );
};
