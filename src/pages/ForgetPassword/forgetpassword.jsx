import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImg from "../../assets/Login/login.svg";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    // TODO: API to send reset code
    setStep(2);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    // TODO: Verify code
    setStep(3);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // TODO: Change password via API
    navigate("/login");
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="relative bg-[#002349] p-8 rounded-xl shadow-xl w-full max-w-sm text-white">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password?</h2>
            <p className="text-sm mb-6 text-center">
              A password reset link will be sent to your email.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <label className="block mb-1 text-sm">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full mb-6 py-2 px-3 text-gray-900 bg-white rounded"
              />
              <button
                type="submit"
                className="w-full py-2 bg-white text-[#002349] font-semibold rounded hover:bg-gray-100 transition"
              >
                Send Link
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeSubmit} className="text-center">
            <h2 className="text-xl font-bold mb-4">Verify Your Code</h2>
            <p className="text-sm mb-4">A code has been sent to your email address</p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              placeholder="Enter verification code"
              className="w-full mb-4 py-2 px-3 text-gray-900 bg-white rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-white text-[#002349] font-semibold rounded"
            >
              Submit
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordChange} className="text-center">
            <h2 className="text-xl font-bold mb-4">Set New Password</h2>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="New password"
              className="w-full mb-4 py-2 px-3 text-gray-900 bg-white rounded"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm password"
              className="w-full mb-4 py-2 px-3 text-gray-900 bg-white rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-white text-[#002349] font-semibold rounded"
            >
              Change Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}