"use client";
import { Teams, useDeleteTeamMutation } from "../../generated/graphql";
import Link from "next/link";
import { TeamMembers } from "./TeamMembers";
import { UserCircle } from "../UI/UserCircle";

interface Props {
  team?: Teams;
}

export const Team: React.FC<Props> = ({ team }) => {
  return (
    <div className=" border-[1px] bg-orange-500 rounded-md p-2 mx-5 my-5 shadow-lg text-white">
      <Link href={`/teams/${team?.id}`}>
        <header className="flex justify-between">
          <div className="flex">
            {" "}
            <h3 className="text-2xl font-bold text-white mt-1">
              {" "}
              {team?.teamName}
            </h3>
            <div className="ml-2">
              {" "}
              {team && <UserCircle id={team?.teamLead as number} />}{" "}
            </div>{" "}
          </div>
        </header>
        <section>
          {team?.members && team?.members.length > 3 && (
            <TeamMembers members={team?.members as string} />
          )}
        </section>
      </Link>
    </div>
  );
};
