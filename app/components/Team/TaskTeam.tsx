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
    <div className=" border-[1px] border-orange-500 rounded-md mr-5 p-2 mt-3 shadow-lg">
      {data?.getTeam && (
        <section key={id}>
          <Link href={`/teams/${id}`}>
            <span className="font-semibold text-blue-900">
              {data.getTeam.teamName}
            </span>
            <TeamMembers members={data.getTeam.members} />
          </Link>
        </section>
      )}
    </div>
  ) : (
    <LoadingSVG></LoadingSVG>
  );
};
