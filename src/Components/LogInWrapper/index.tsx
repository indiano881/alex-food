"use client";

import LogIn from "../Login";
import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import Menu from "../Menu";
import GuestHome from "../GuestHome";

const LogInWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext() as UserContextType;
  const { setUser } = useUserContext() as UserContextType;

  const handleLogOut = () => {
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <>
          <LogIn />
          <GuestHome />
        </>
      ) : (
        <>
          <Menu />
          <div className="flex justify-between p-6">
            <div className="text-black space-y-3">
              <p className="text-xl">Hi {user.name}</p>
              <p>Welcome to the inside!</p>
              <p>
                Browse, save and prepare your favourite recipes
                <span className="text-2xl">&#127837;</span>
              </p>
            </div>
            <div
              className="fixed top-[10px] right-4 z-50 flex items-center cursor-pointer border border-1 border-zinc-900 rounded-md p-1 hover:text-white hover:bg-zinc-950"
              onClick={handleLogOut}
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
              Logout
            </div>
          </div>
          {children}
        </>
      )}
    </div>
  );
};

export default LogInWrapper;
