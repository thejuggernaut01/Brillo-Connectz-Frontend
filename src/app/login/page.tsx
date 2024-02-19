//@ts-nocheck
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import validationSchema from "@/schema/validationSchema";
import { useRouter } from "next/navigation";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AuthPagesLayout } from "@/layouts/AuthPagesLayout";
import api from "@/utils/api";
import FormInput from "@/shared/Input/FormInput";
import Button from "@/shared/Button/Button";
import { useUser } from "@/context/UserContext";

interface FormData {
  email?: string;
  phone?: string;
  password: string;
}
const LoginPage = () => {
  const [isPhone, setIsPhone] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { user, updateUser } = useUser();

  const [phoneNumber, setPhoneNumber] = useState();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(validationSchema) });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const loginData: { password: string; email?: string; phone?: string } = {
        password: data.password,
      };

      // Include email or phone based on the user's choice
      if (!isPhone) {
        loginData.email = data.email;
      } else {
        loginData.phoneNumber = phoneNumber;
      }

      const response = await api.post("/auth/login", loginData);
      updateUser(response.data);
      setLoginSuccess(true);
      // redirect after 2 seconds
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error: any) {
      setResponseMessage(error?.response?.data?.message);
    } finally {
      setLoginSuccess(false);
      setResponseMessage(null);
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

      {loginSuccess && (
        <div className="flex justify-center text-green-500 text-sm mt-2">
          Login successful! You will be redirected shortly.
        </div>
      )}
      <form
        className="flex flex-col items-center justify-center w-full h-[calc(100vh-120px)]"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
      >
        <div className="w-full md:w-2/3 lg:w-1/3 space-y-5">
          <h1 className="text-2xl text-blue-700 flex justify-center">Login</h1>
          <p className="text-gray-500 px-5 text-center">
            Welcome back! we are glad to have you back, please login to your
            account.
          </p>
          <button
            type="button"
            className="text-blue-700"
            onClick={() => setIsPhone(!isPhone)}
          >
            Login with {isPhone ? "email" : "phone"} instead
          </button>
          {!isPhone ? (
            <div>
              <h3>
                Email <span className="font-semibold text-red-500">*</span>
              </h3>
              <FormInput
                {...register("email")}
                type="email"
                placeholder="Your email address"
                id="email"
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3>
                Phone <span className="font-semibold text-red-500">*</span>
              </h3>
              <PhoneInput
                defaultCountry="NG"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="w-full pl-4 text-sm border rounded-lg border-[#E5E5E5] h-14 md:text-lg placeholder:text-base outline-none"
                error={
                  phoneNumber
                    ? isValidPhoneNumber(phoneNumber)
                      ? undefined
                      : "Invalid phone number"
                    : "Phone number required"
                }
              />
              {errors.phone && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.phone.message}
                </div>
              )}
            </div>
          )}

          <div className="pb-2">
            <h3>
              Password <span className="font-semibold text-red-500">*</span>
            </h3>
            <FormInput
              {...register("password")}
              type="password"
              placeholder="Minimum 6 chracters"
              id="password"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </div>
            )}
          </div>
          <Link href={"/forgot-password"} className="text-blue-700">
            Forgot password?
          </Link>
          <Button
            type="submit"
            extraClass="text-white font-semibold bg-blue-600 w-full rounded-md p-3 outline-none"
            text="Login"
            isSubmitting={isSubmitting}
          />

          <p className="text-center text-sm">
            Don&apos;t have an account?&nbsp;
            <Link href="/register" className="font-medium text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </form>
    </AuthPagesLayout>
  );
};
export default LoginPage;
