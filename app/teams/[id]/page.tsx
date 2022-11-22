"use client";
import { Header } from "../../components/Header";
import { LoadingSVG } from "../../components/LoadingSVG";
import {
  useGetTeamMembersQuery,
  useGetTeamQuery,
} from "../../generated/graphql";
import { UserName } from "./UserName";

export default function TeamPage({ params }: any) {
  const { data: team } = useGetTeamQuery({
    variables: { id: parseInt(params.id) as number },
  });

  const { data: teamMembers } = useGetTeamMembersQuery({
    variables: { team: team?.getTeam.members.trim() as string },
  });
  return team?.getTeam ? (
    <div>
      <Header title={team?.getTeam.teamName as string}></Header>
      <div>
        <section className="mt-10 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Team Lead</h2>
          <UserName id={team?.getTeam.teamLead as number} />
        </section>
        <section className="mt-10 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Members</h2>
          <div className="">
            {teamMembers?.getTeamMembers.map((member) => (
              <div key={member.id} className="">
                {member.firstName}
              </div>
            ))}
          </div>
        </section>
        <section className="mt-10 ml-5 text-lg mx-auto">
          <h2 className="text-blue-800 font-bold text-2xl">Recent Tasks</h2>
        </section>
      </div>
    </div>
  ) : (
    <LoadingSVG />
  );
}
