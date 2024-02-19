//@ts-nocheck
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "@/schema/validationSchema";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AuthPagesLayout } from "@/layouts/AuthPagesLayout";

import FormInput from "@/shared/Input/FormInput";
import Button from "@/shared/Button/Button";
import InterestPage from "@/app/interests/page";

interface FormValues {
  email: string;
  password: string;
}
const RegisterPage = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [showInterestPage, setShowInterestPage] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    // Set registration form values to state
    setRegistrationData({
      email: data.email,
      password: data.password,
    });
    // Show the InterestPage component
    setShowInterestPage(true);
  };

  return (
    <AuthPagesLayout>
      {/* Conditionally render the InterestPage component */}
      {showInterestPage ? (
        <InterestPage
          registrationData={registrationData}
          phoneNumber={phoneNumber}
        />
      ) : (
        <form
          action=""
          className="flex flex-col items-center justify-center w-full h-[calc(100vh-120px)]"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(onSubmit)(event);
          }}
        >
          <div className="w-full md:w-2/3 lg:w-1/3 space-y-5">
            <h1 className="text-2xl text-blue-500 flex justify-center">
              Register
            </h1>
            <p className="text-gray-500 px-5 md:px-10 lg:px-0 text-center">
              Create an account with us and enjoy all our mind-blowing services
              for free!
            </p>
            <div>
              <h3>
                Email <span className="font-semibold text-red-500">*</span>
              </h3>

              <FormInput
                {...register("email")}
                type="email"
                required
                placeholder="Your email address"
                id="email"
              />

              {errors.email && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </div>
              )}
            </div>
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
            </div>
            <div>
              <h3>
                Password <span className="font-semibold text-red-500">*</span>
              </h3>

              <FormInput
                {...register("password")}
                type="password"
                required
                placeholder="Minimum 6 chracters"
                id="password"
              />

              {errors.password && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </div>
              )}
            </div>

            <Button
              type="submit"
              extraClass="text-white font-semibold bg-blue-600 w-full rounded-md p-3"
              text="Register"
              isSubmitting={isSubmitting}
            />
            <p className="text-center text-sm">
              Already have an account?&nbsp;
              <Link href="/login" className="font-medium text-blue-700">
                Login
              </Link>
            </p>
          </div>
        </form>
      )}
    </AuthPagesLayout>
  );
};
export default RegisterPage;
