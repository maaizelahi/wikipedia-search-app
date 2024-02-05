import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect,
// } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { setAuthToken, getAuthToken } from "./services/authService";
// import PrivateRoute from "./components/PrivateRoute";
import SearchPage from "./components/Search/SearchPage";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    // {
    //   path: "/login",
    //   element: <LoginForm />,
    // },
    // {
    //   path: "/signup",
    //   element: <SignupForm />,
    // },
    // {
    //   path: "/signup",
    //   element: <SignupForm />,
    // },
    {
      path: "/sp",
      element: <SearchPage />,
    },
    // {
    //   path: "/sr",
    //   element: <SearchResult />,
    // },
    // {
    //   path: "/pc",
    //   element: <PageContent />,
    // },
    // {
    //   path: "/sh",
    //   element: <SearchHistory />,
    // },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />;
    </UserProvider>
  );
};

export default App;
