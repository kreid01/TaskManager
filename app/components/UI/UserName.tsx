import { useGetTeamMembersQuery } from "../../generated/graphql";

interface Props {
  id: number;
}

export const UserName: React.FC<Props> = ({ id }) => {
  const { data } = useGetTeamMembersQuery({
    variables: { team: id.toString() as string },
  });

  return (
    <div>
      {data?.getTeamMembers[0].firstName} {data?.getTeamMembers[0].lastName}
    </div>
  );
};
