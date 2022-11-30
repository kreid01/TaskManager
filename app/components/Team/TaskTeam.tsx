import { LoadingSVG } from "../UI/LoadingSVG";
import { TeamMembers } from "./TeamMembers";
import { useGetTeamQuery } from "../../generated/graphql";
import Link from "next/link";

interface Props {
  id: number;
}

export const TaskTeam: React.FC<Props> = ({ id }) => {
  const { data, loading } = useGetTeamQuery({
    variables: { id: id as number },
  });

  return !loading ? (
    <div className="border-[1px] rounded-md mr-5 p-1 mt-1 shadow-lg">
      <Link href={`/teams/${id}`}>
        <section className="flex" key={id}>
          <span className="font-semibold test-slate-800 text-lg mt-3 ml-3">
            {data?.getTeam.teamName}
          </span>
          <TeamMembers members={data?.getTeam.members as string} />
        </section>
      </Link>
    </div>
  ) : (
    <LoadingSVG></LoadingSVG>
  );
};
