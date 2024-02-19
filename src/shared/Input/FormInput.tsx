"use client";
import Image from "next/image";
import React, { forwardRef, useState, ChangeEvent } from "react";

interface FormInput {
  type: string;
  placeholder?: string;
  id?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  extraClass?: string;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.ForwardRefRenderFunction<HTMLInputElement, FormInput> = (
  {
    type,
    placeholder,
    id,
    autoFocus,
    defaultValue,
    required,
    onChange,
    ...props
  },
  ref
) => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          type={toggle && type === "password" ? "text" : type}
          placeholder={placeholder}
          id={id}
          autoFocus={autoFocus}
          ref={ref}
          required={required}
          onChange={onChange}
          defaultValue={defaultValue}
          {...props}
          className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
        />

        {type === "password" && toggle ? (
          <button
            type="button"
            onClick={() => setToggle((prev) => !prev)}
            className="focus-visible:outline-primary absolute top-[35%] right-5"
          >
            <Image
              src="/icons/open-eye.svg"
              width={20}
              height={20}
              alt="Click to hide password"
            />
          </button>
        ) : null}

        {type === "password" && !toggle ? (
          <button
            type="button"
            onClick={() => setToggle((prev) => !prev)}
            className="focus-visible:outline-primary absolute top-[35%] right-5"
          >
            <Image
              src="/icons/slashed-eye.svg"
              width={20}
              height={20}
              alt="Click to reveal password"
            />
          </button>
        ) : null}
      </div>
    </>
  );
};

export default forwardRef(FormInput);
