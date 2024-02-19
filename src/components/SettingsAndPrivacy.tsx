import React, { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import Button from "@/shared/Button/Button";
import { useUser } from "@/context/UserContext";

const SettingsAndPrivacy = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  // Make API request to change password
  const handleChangePassword = async () => {
    try {
      await api.patch("/settings/change-password", {
        password: newPassword,
      });
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
    }
  };

  // Make API request to update email
  const handleUpdateEmail = async () => {
    try {
      await api.patch("/settings/update-email", {
        email: newEmail,
      });
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
    }
  };

  // Make API request to update username
  const handleUpdateUsername = async () => {
    try {
      await api.patch("/settings/update-username", {
        username: newUsername,
      });
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
    }
  };

  // Make API request for logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      //redirect after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
    }
  };

  // Make API request to verify phone number
  const handleVerifyPhone = async () => {
    try {
      // await api.post("/verify-phone");
      setShowVerificationInput(true);
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
    }
  };

  // Submit verification code
  const handleSubmitVerification = async () => {
    try {
      // Make API request to verify the entered code
      await api.post("/verify-phone", { code: verificationCode }); // Replace with your actual endpoint and payload
      // Handle successful verification
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
    }
  };
  return (
    <>
      {responseMessage && (
        <div className="flex justify-center text-red-500 text-sm mt-2">
          {responseMessage}
        </div>
      )}

      <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-6 !mt-10 !mb-24">
        <div className="space-y-8">
          <h1 className="text-3xl font-semibold flex justify-center">
            Settings & Privacy
          </h1>
          {/* Change Password */}
          <div className="md:flex items-center gap-5 space-y-5 md:space-y-0">
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
              placeholder="New Password"
            />
            <button
              onClick={handleChangePassword}
              className="bg-blue-500 text-white py-3 rounded-md w-full"
            >
              Change Password
            </button>
          </div>

          {/* Update Email */}
          <div className="md:flex items-center gap-5 space-y-5 md:space-y-0">
            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
            />
            <button
              onClick={handleUpdateEmail}
              className="bg-blue-500 text-white py-3 rounded-md w-full"
            >
              Update Email
            </button>
          </div>

          {/* Update Username */}
          <div className="md:flex items-center gap-5 space-y-5 md:space-y-0">
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
            />
            <Button
              onClick={handleUpdateUsername}
              extraClass="bg-blue-500 text-white py-3 rounded-md w-full"
              text="Update Username"
            />
          </div>

          {/* Verify Phone Button */}
          {user?.isPhoneVerified ? null : (
            <>
              <Button
                onClick={handleVerifyPhone}
                extraClass="bg-blue-500 text-white py-3 rounded-md w-full"
                text="Verify Phone"
              />
              {showVerificationInput && (
                <div className="md:flex items-center gap-5 space-y-5 md:space-y-0">
                  <input
                    type="text"
                    placeholder="Enter Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
                  />
                  <Button
                    onClick={handleSubmitVerification}
                    extraClass="bg-blue-500 text-white py-3 rounded-md w-full"
                    text="Submit"
                  />
                </div>
              )}
            </>
          )}

          {/* Logout */}
          <div>
            <Button
              onClick={handleLogout}
              extraClass="bg-red-500 text-white p-3 rounded-md w-full"
              text="Logout"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsAndPrivacy;
