import { FC, ReactNode, createContext, useContext, useState } from "react";

interface IUserContext {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

interface Props {
  children?: ReactNode;
}

export const GlobalContext = createContext<IUserContext>({
  userId: "",
  setUserId: () => {},
});
export const useGlobal = () => useContext(GlobalContext);

export const GlobalContextProvider: FC<Props> = ({ children }) => {
  const [userId, setUserId] = useState<string>(
    localStorage.getItem("userId") || ""
  );
  return (
    <GlobalContext.Provider value={{ userId, setUserId }}>
      {children}
    </GlobalContext.Provider>
  );
};
