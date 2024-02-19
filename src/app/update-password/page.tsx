"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/schema/validationSchema";
import { useRouter } from "next/navigation";
import { AuthPagesLayout } from "@/layouts/AuthPagesLayout";
import api from "@/utils/api";
import { useSearchParams } from "next/navigation";
import FormInput from "@/shared/Input/FormInput";
import Button from "@/shared/Button/Button";

interface FormData {
  password: string;
}

const UpdatePasswordPage = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await api.patch("/auth/update-password", {
        password: data.password,
        token,
      });
      setUpdateSuccess(true);
      //redirect after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
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

      {updateSuccess && (
        <div className="flex justify-center text-green-500 text-sm mt-2">
          Password update successful! You will be redirected shortly.
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
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-semibold text-abeg-neutral-10 md:text-2xl">
              Reset Password
            </h1>
            <p className="md:text-lg text-gray-500 px-5 lg:px-0">
              Enter a new password to sign in
            </p>
          </div>
          <div className="mt-2 space-y-6">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Password
              </label>

              <FormInput
                {...register("password")}
                type="password"
                placeholder="Enter your new password"
                id="password"
              />

              {errors.password && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 text-center">
            <Button
              type="submit"
              extraClass="text-white font-semibold bg-blue-600 w-full rounded-md p-3"
              text="Submit"
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </form>
    </AuthPagesLayout>
  );
};

export default UpdatePasswordPage;
