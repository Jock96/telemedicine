import React, { createContext, useContext } from "react";
import { IUser } from "../entities";

export interface IUserContext<TUser = IUser> {
  user?: TUser;
}

const UserContext = createContext<IUserContext>({
  user: undefined,
});

const UserContextProvider = <TUser extends IUser>({
  children,
  value,
}: {
  value: IUserContext<TUser>;
  children: React.ReactNode;
}) => <UserContext.Provider value={value} children={children} />;

const useUserContext = <TUser extends IUser>() => {
  const context = useContext<IUserContext<TUser>>(
    UserContext as unknown as React.Context<IUserContext<TUser>>
  );

  if (!context) {
    throw new Error("useUserContext must be used under UserContextProvider");
  }

  return context;
};

export { UserContextProvider, useUserContext };
