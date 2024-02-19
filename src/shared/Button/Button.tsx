import React, { MouseEventHandler } from "react";
import Loader from "@/shared/Loader";

interface FormButton {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  ref?: React.ForwardedRef<HTMLButtonElement>;
  isSubmitting?: true | false;
  extraClass?: string;

  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<FormButton> = ({
  type,
  text,
  ref,
  isSubmitting,
  extraClass,
  onClick,
}) => {
  return (
    <>
      <button
        type={type}
        ref={ref}
        className={`${extraClass} border rounded-md w-full h-14 text-white text-lg font-semibold focus-visible:outline-primary`}
        onClick={onClick}
      >
        {isSubmitting ? <Loader /> : text}
      </button>
    </>
  );
};

export default Button;
