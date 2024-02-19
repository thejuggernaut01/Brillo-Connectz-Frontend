"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 0);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //this effect closes the navbar if it's open when you click anywhere on the window object
  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (navbarRef.current && !navbarRef.current.contains(event.target)) {
  //       setOpen(false);
  //     }
  //   };

  //   if (open) {
  //     document.addEventListener("click", handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [open]);

  const navLinks = [
    {
      name: "Login",
      link: "login",
    },
    {
      name: "Register",
      link: "register",
    },
  ];
  return (
    <>
      <header className="mb-5">
        <div
          className={`md:flex justify-between items-center z-10 w-full transition-colors duration-300 ${
            scrolled ? "bg-transparent backdrop-filter backdrop-blur-md" : ""
          }`}
        >
          <div className="flex justify-between items-center py-4 lg:py-8">
            <div>
              <Link
                href="/"
                onClick={() => {
                  open ? setOpen(!open) : !open;
                }}
              >
                <div className="text-green-500 text-xl transition ease-in-out duration-500 inline-block text-text-main fluid-4xl hover:-translate-y-1">
                  Logo
                </div>
              </Link>
            </div>
            <div
              className="md:hidden cursor-pointer"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {!open ? <p>=</p> : <p>X</p>}
            </div>
          </div>

          <div
            ref={navbarRef}
            className="hidden md:flex md:items-center md:justify-between pb-5 md:pb-0  md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
							top-[-490px] md:opacity-100 opacity-100"
          >
            <div className="md:flex">
              {navLinks.map(({ link, name }) => (
                <div key={name} className="hover:border-b border-b-white mx-2">
                  <Link
                    href={link}
                    className={`md:px-4 my-5 md:my-0 inline-block font text-text-main fluid-4xl hover:-translate-y-1 transition duration-300 ${
                      pathname.startsWith(link) ? "" : ""
                    }`}
                  >
                    {name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* mobile screen navbar  */}
          <div
            className={` ${
              !open
                ? "hidden"
                : " md:hidden absolute right-8 top-16 w-32 z-10 bg-blue-700 text-white rounded-lg overflow-hidden text-xl justify-center items-center flex transition-all duration-500 ease-in-out"
            }`}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div
              onClick={() => {
                setOpen(!open);
              }}
              className="w-full my-5 transition-all duration-500"
            >
              {navLinks.map(({ link, name }) => (
                <Link
                  href={link}
                  key={name}
                  className="justify-center items-center flex"
                >
                  <div
                    className={`font hover:bg-blue-500 px-6 py-3 rounded-sm w-full ${
                      pathname.startsWith(link) ? "" : ""
                    }`}
                  >
                    {name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
