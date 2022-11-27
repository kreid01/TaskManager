import { useGetTeamMembersQuery } from "../../generated/graphql";

interface Props {
  id: number;
}

const colors = ["orange", "red", "green", "pink", "purple"];
export const UserCircle: React.FC<Props> = ({ id }) => {
  const { data } = useGetTeamMembersQuery({
    variables: { team: id.toString() as string },
  });

  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div>
      <div className="member bg-black">
        <div className="pt-[5px] group relative">
          {" "}
          {data?.getTeamMembers[0].firstName.charAt(0)}
          {data?.getTeamMembers[0].lastName.charAt(0)}
          <span className=" w-auto p-2 m-2 absolute group-hover:scale-100 scale-0  min-w-max left-12 z-10 -top-1 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100  origin-left">
            {data?.getTeamMembers[0].firstName}{" "}
            {data?.getTeamMembers[0].lastName}
            <div>Lead</div>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
