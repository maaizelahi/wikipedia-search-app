import React, { useState } from "react";
import { signup } from "../../services/authService";
import { useUserContext } from "../../contexts/UserContext";

interface SignupFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext();

  const handleSignup = async () => {
    try {
      const token = await signup(username, password);
      console.log("Signup success:", token);
      onSuccess();
      login();
    } catch (error) {
      console.error("Signup error:", error);
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
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
          className="w-full bg-green-500 text-white p-2 rounded"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
