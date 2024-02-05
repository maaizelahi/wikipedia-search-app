import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getAuthToken, setAuthToken } from "../services/authService";

// Define the shape of the context
interface UserContextProps {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create a provider component
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const token = getAuthToken();
  const [loggedIn, setLoggedIn] = useState(!!token);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    // Check if the user is already authenticated (e.g., has a valid token)
    const token = getAuthToken();
    if (token) {
      setAuthToken(token);
      login();
    }
  }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const addToSearchHistory = (query: string) => {
    setSearchHistory((prevHistory) => [query, ...prevHistory]);
  };

  const contextValue: UserContextProps = {
    loggedIn,
    login,
    logout,
    searchHistory,
    addToSearchHistory,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
