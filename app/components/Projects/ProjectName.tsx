import { useGetProjectQuery } from "../../generated/graphql";
import { LoadingSVG } from "../UI/LoadingSVG";

interface Props {
  id: number;
}

export const ProjectName: React.FC<Props> = ({ id }) => {
  const { data } = useGetProjectQuery({ variables: { id: id } });


  return data?.getProject ? (
    <div className="text-slate-800 ml-2">{data.getProject.projectName}</div>
  ) : (
    <LoadingSVG />
  );
};
