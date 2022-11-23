"use client";
import { Header } from "./components/Header";
import { Team } from "./components/Team";
import {
  useGetUsersTeamsQuery,
  useGetUsersProjectsQuery,
} from "./generated/graphql";

import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Project } from "./components/Project";

export default function HomePage() {
  const currentUser = useSelector((state: RootState) => state.user.value);

  const { data: teams } = useGetUsersTeamsQuery({
    variables: { id: currentUser?.id as number },
  });

  const { data: projects } = useGetUsersProjectsQuery({
    variables: { id: currentUser?.id as number },
  });

  return (
    <div>
      <Header title="Home" />
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
          {projects?.getUsersProjects &&
            projects.getUsersProjects.map((project) => {
              return <Project key={project.id} project={project} />;
            })}
        </div>
      </section>
      <section>
        <h2 className="text-blue-800 mt-5 ml-5 font-bold text-2xl">
          Recent Teams
        </h2>
        <div className="grid grid-cols-2">
          {teams?.getUsersTeams &&
            teams?.getUsersTeams.map((team) => {
              return <Team key={team.id} team={team} />;
            })}
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
