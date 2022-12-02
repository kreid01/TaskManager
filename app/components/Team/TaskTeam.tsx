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
    <div className="mr-5 -mt-[3px]">
      <Link href={`/teams/${id}`}>
        <section className="flex" key={id}>
          <TeamMembers members={data?.getTeam.members as string} />
        </section>
      </Link>
    </div>
  ) : (
    <LoadingSVG></LoadingSVG>
  );
};
