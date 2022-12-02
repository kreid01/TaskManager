import { TeamMembers } from "./TeamMembers";

interface Props {
  members: string;
}

export const TaskTeam: React.FC<Props> = ({ members }) => {
  return (
    <div className="mr-5 -mt-[3px]">
      <section className="flex">
        <TeamMembers members={members as string} />
      </section>
    </div>
  );
};
