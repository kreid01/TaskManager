import Link from "next/link";
import { useState, useEffect } from "react";
import { setAccessToken } from "../utils/accessToken";
import { useLogoutMutation, useGetUserQuery } from "../generated/graphql";

export const Nav = () => {
  const [loading, setLoading] = useState(true);
  const [logout, { client }] = useLogoutMutation();
  const { data: user } = useGetUserQuery({ fetchPolicy: "network-only" });

  useEffect(() => {
    fetch("http://localhost:3001/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  for (const link of document.getElementsByClassName(
    "sidebar-icon"
  ) as HTMLCollectionOf<HTMLElement>) {
    link.onmousemove = (e: any) => {
      const decimal = e.clientX / link.offsetWidth;

      const basePercent = 80,
        percentRange = 20,
        ajustablePercent = percentRange * decimal;

      const lightOrangePercent = basePercent + ajustablePercent;

      link.style.setProperty(
        "--light-orange-percent",
        `${lightOrangePercent}%`
      );
    };
  }

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
        {!loading && user?.getUser ? (
          <button
            className="sidebar-icon"
            onClick={async () => {
              logout();
              setAccessToken("");
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
