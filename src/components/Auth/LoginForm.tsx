import React, { useState } from "react";
import { login } from "../../services/authService";
import { useUserContext } from "../../contexts/UserContext";

interface LoginFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: loginContext } = useUserContext();

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      console.log("Login success:", token);
      onSuccess();
      loginContext();
    } catch (error) {
      console.error("Login error:", error);
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <input
            className="w-full border border-gray-300 p-2"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full border border-gray-300 p-2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
