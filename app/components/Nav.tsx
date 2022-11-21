import Link from "next/link";
import { useState, useEffect } from "react";
import { useLogoutMutation, useGetUserQuery } from "../generated/graphql";
import { RootState } from "../store/store";
import { setUser } from "../slices/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../utils/accessToken";

export const Nav = () => {
  const [logout, { client }] = useLogoutMutation();
  const { data: user } = useGetUserQuery({ fetchPolicy: "network-only" });
  const currentUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <nav
      className="fixed min-h-screen md:w-3/12 lg:w-4/12
   flex flex-col bg-white shadow-lg"
    >
      <div className="sidebar-icon">
        <Link className="z-10" href="/">
          Home
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link className="z-10" href="/calender">
          Calender
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link className="z-10" href="/search">
          Projects
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link className="z-10" href="/teams">
          Teams
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link className="z-10" href="/notifcations">
          Notifications
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link className="z-10" href="/search">
          Search
        </Link>
      </div>
      <div className="mt-auto">
        <div className="sidebar-icon">
          <Link href="/profile">Profile</Link>
        </div>
        {user?.getUser ? (
          <button
            className="sidebar-icon"
            onClick={async () => {
              logout();
              dispatch(setUser(" "));
              await client!.resetStore();
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <div className="sidebar-icon">
              <Link className="z-10" href="register">
                Register
              </Link>
            </div>
            <div className="sidebar-icon">
              <Link className="z-10" href="login">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
