"use client";
import { AuthPagesLayout } from "@/layouts/AuthPagesLayout";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import Button from "@/shared/Button/Button";

const VerificationPage = () => {
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;
  // Check if localStorage is available
  const storedEmail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

  //make api call to verify email endpoint to verify the email finally
  const verifyEmail = async (token: string) => {
    try {
      await api.post(`/auth/verify-email`, { token });
      setVerificationSuccess(true);
      //redirect after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
    }
  };

  //opens the email app
  const handleContinueToEmail = () => {
    //this email should come from the local storage
    window.location.href = JSON.stringify(storedEmail);
  };

  //resend the verification email
  const handleResendEmail = async () => {
    try {
      await api.post("/auth/resend-email", {
        //this email should come from local storage
        email: storedEmail,
      });
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  };

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [responseMessage]);
  return (
    <AuthPagesLayout>
      {responseMessage && (
        <div className="flex justify-center text-red-500 text-sm mt-2">
          {responseMessage}
        </div>
      )}

      {verificationSuccess && (
        <div className="flex justify-center text-green-500 text-sm mt-2">
          Email verification successful! You will be redirected shortly.
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-120px)]">
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-medium">Verify your email</h1>
          <div className="">
            {token ? (
              //if token is available

              <Button
                extraClass="!mt-6 bg-blue-700 w-full rounded-md text-white py-3"
                text="Verify Email"
                onClick={() => verifyEmail(token)}
              />
            ) : (
              // Token is not available, rendering buttons
              <>
                <p className="text-md text-gray-500">
                  Please choose an option below to continue.
                </p>

                <Button
                  extraClass="!mt-6 bg-blue-700 w-full rounded-md text-white py-3"
                  text="Check your email"
                  onClick={handleContinueToEmail}
                />
                <Button
                  extraClass="mt-2 bg-red-500 w-full rounded-md text-white py-3"
                  text="Resend email"
                  onClick={handleResendEmail}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </AuthPagesLayout>
  );
};
export default VerificationPage;
