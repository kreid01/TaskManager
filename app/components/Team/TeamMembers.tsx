import { useGetTeamMembersQuery } from "../../generated/graphql";

interface Props {
  members: string;
}

const colors = ["blue", "red", "green", "pink", "purple"];

export const TeamMembers: React.FC<Props> = ({ members }) => {
  const { data: teamMembers } = useGetTeamMembersQuery({
    variables: { team: members.trim() as string },
  });
  return (
    <div className="flex mr-5 p-2 ">
      {teamMembers?.getTeamMembers.map((member) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div key={member.id} className="">
            <div
              className={
                color === "red"
                  ? "member bg-red-500"
                  : color === "blue"
                  ? "member bg-blue-500"
                  : color === "green"
                  ? "member bg-green-500"
                  : color === "pink"
                  ? "member bg-pink-500"
                  : color === "purple"
                  ? "member bg-purple-500"
                  : ""
              }
            >
              <div className="pt-[5px] group relative">
                {" "}
                {member.firstName.charAt(0)}
                {member.lastName.charAt(0)}
                <span className=" w-auto p-2 m-2 absolute group-hover:scale-100 scale-0  min-w-max left-12 z-10 -top-1 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100  origin-left">
                  {member.firstName} {member.lastName}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
