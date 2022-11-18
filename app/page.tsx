"use client";
import { useUsersQuery } from "./generated/graphql";

export default function HomePage() {
  const { data, loading } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div>Loading...</div>;
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
    </div>
  );
}
