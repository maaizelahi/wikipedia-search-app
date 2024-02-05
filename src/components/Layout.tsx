import React, { useState } from "react";
import Modal from "./Modal";
import LoginForm from "./Auth/LoginForm";
import SignupForm from "./Auth/SignupForm";
import { useUserContext } from "../contexts/UserContext";
import { removeToken } from "../services/authService";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const { loggedIn, logout } = useUserContext();

  const handleLogout = () => {
    removeToken();
    logout();
  };

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="pl-36 text-3xl font-semibold mx-auto">
          Wikipedia Search App
        </h1>
        {!loggedIn ? (
          <div className="flex">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded m-2"
              onClick={() => setLoginModalOpen(true)}
            >
              Login
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded m-2"
              onClick={() => setSignupModalOpen(true)}
            >
              Signup
            </button>
          </div>
        ) : (
          <div className="flex">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded m-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Modals */}
      {isLoginModalOpen && (
        <Modal onClose={() => setLoginModalOpen(false)}>
          <LoginForm
            onSuccess={() => setLoginModalOpen(false)}
            onClose={() => setLoginModalOpen(false)}
          />
        </Modal>
      )}
      {isSignupModalOpen && (
        <Modal onClose={() => setSignupModalOpen(false)}>
          <SignupForm
            onSuccess={() => setLoginModalOpen(false)}
            onClose={() => setLoginModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Layout;
