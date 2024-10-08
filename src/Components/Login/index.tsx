"use client";

import { SetStateAction, useState } from "react";
import { registeredUsers } from "@/utils/users";
import { UserContextType, UserType } from "@/utils/types";
import { useUserContext } from "@/utils/contexts";
import Button from "../Button";

const LogIn = () => {
  const [userInput, setUserInput] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const { setUser } = useUserContext() as UserContextType;

  const handleChange = (e: {
    target: { value: SetStateAction<string | null> };
  }) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    const loggedInUser = registeredUsers.filter(
      (user: UserType) => user.name === userInput
    );
    if (loggedInUser.length) {
      setUser(loggedInUser[0]);
    }
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showLogin ? (
        <div className="space-x-2 text-black p-2 text-right bg-orange-400 animate-fade-in-down">
          <Button buttonText="Close" onClick={toggleLogin} />
          <label htmlFor="user-input"></label>
          <p className="m-2 text-black">Got an account? Log in here!</p>
          <input
            className="text-black p-4 rounded-md h-6 m-2 outline-none border border-1 border-zinc-900 "
            id="user-input"
            placeholder="Enter username"
            onChange={handleChange}
          />
          <Button buttonText="Go" onClick={handleClick} />
        </div>
      ) : (
        <div
          className="fixed top-[10px] right-4 z-50 flex items-center cursor-pointer border border-1 border-zinc-900 rounded-md p-1 hover:text-white hover:bg-zinc-950"
          onClick={toggleLogin}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          Login
        </div>
      )}
    </>
  );
};

export default LogIn;
