"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
  user: any;
  updateUser: (userData: any) => void;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);

  const updateUser = (userData: any) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
