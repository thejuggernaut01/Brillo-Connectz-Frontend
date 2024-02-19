import Navbar from "@/shared/NavBar";
import { type ReactNode } from "react";

type AuthPagesLayoutProps = {
  children: ReactNode;
};

export const AuthPagesLayout = ({
  children,
}: AuthPagesLayoutProps): JSX.Element => {
  return (
    <main className="min-h-screen">
      <section>
        <Navbar />
        {children}
      </section>
    </main>
  );
};
