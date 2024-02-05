import React from "react";
import { UserProvider } from "./contexts/UserContext";
import SearchPage from "./components/Search/SearchPage";

const App: React.FC = () => {
  return (
    <UserProvider>
      <SearchPage />
    </UserProvider>
  );
};

export default App;
