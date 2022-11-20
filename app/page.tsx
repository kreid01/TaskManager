"use client";
import { useUsersQuery } from "./generated/graphql";

export default function HomePage() {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="h-[61px]  text-white bg-gradient-to-r from-orange-600 to-amber-500 grid justify-center">
        <h1 className="font-bold text-2xl my-auto">Home</h1>
      </header>
      <section>
        <h2 className="text-blue-800 mt-5 ml-5 font-bold text-2xl">
          Todays Tasks
        </h2>
        <div className="grid grid-cols-2">
          <div className=" border-[1px] border-orange-500 rounded-md p-2 mx-5 shadow-lg">
            <h3 className="text-lg font-bold">Task Name:</h3>
            <h2>Team</h2>
            <p className="text-gray-400 text-sm">Date to be completed</p>
            <p>Task body</p>
          </div>
          <div className=" border-[1px] border-orange-500 rounded-md p-2 mx-5">
            <h3 className="text-lg font-bold">Task Name:</h3>
            <h2>Team</h2>
            <p className="text-gray-400 text-sm">Date to be completed</p>
            <p>Task body</p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-blue-800 mt-5 ml-5 font-bold text-2xl">
          Current Projects
        </h2>
        <div className="grid grid-cols-2">
          <div className=" border-[1px] border-orange-500 rounded-md p-2 mx-5 shadow-lg">
            <h3 className="text-lg font-bold">Project Name:</h3>
            <h2>Team</h2>
          </div>
          <div className=" border-[1px] border-orange-500 rounded-md p-2 mx-5">
            <h3 className="text-lg font-bold">Task Name:</h3>
            <h2>Team</h2>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-blue-800 mt-5 ml-5 font-bold text-2xl">
          Recent Teams
        </h2>
        <div className="grid grid-cols-2">
          <div className=" border-[1px] border-orange-500 rounded-md p-2 mx-5 shadow-lg">
            <h3 className="text-lg font-bold">Team Name:</h3>
            <h2>Members</h2>
            <p className="text-gray-400 text-sm">Most recent task</p>
          </div>
          <div className=" border-[1px] border-orange-500 rounded-md p-2 mx-5">
            <h3 className="text-lg font-bold">Team Name:</h3>
            <h2>Members</h2>
            <p className="text-gray-400 text-sm">Most recent task</p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-blue-800 mt-5 ml-5 font-bold text-2xl">Messages</h2>
      </section>
      <div className=" border-[1px] my-2 border-orange-500 rounded-md p-2 mx-5 shadow-lg">
        Message contents
      </div>
      <div className=" border-[1px] my-2 border-orange-500 rounded-md p-2 mx-5 shadow-lg">
        Message contents
      </div>
      <div className=" border-[1px] my-2 border-orange-500 rounded-md p-2 mx-5 shadow-lg">
        Message contents
      </div>
    </div>
  );
}
