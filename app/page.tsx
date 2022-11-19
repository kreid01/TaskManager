"use client";
import {
  useGetUserQuery,
  useLogoutMutation,
  useUsersQuery,
} from "./generated/graphql";
import { useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";

export default function HomePage() {
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

  const { data } = useUsersQuery({ fetchPolicy: "network-only" });
  const { data: user } = useGetUserQuery({ fetchPolicy: "network-only" });
  const [loading, setLoading] = useState(true);

  const [logout, { client }] = useLogoutMutation();

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>loading...</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      users:{" "}
      <div>
        <ul></ul>
        {data.users.map((user) => {
          return <li key={user.id}>{user.email}</li>;
        })}
      </div>
      {JSON.stringify(user.getUser?.firstName)}
      {!loading && data && user.getUser && (
        <button
          onClick={async () => {
            logout();
            setAccessToken("");
            await client!.resetStore();
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}
