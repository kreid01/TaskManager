import {
  faBell,
  faPlusCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserCircle } from "./UserCircle";

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: number;
  open: boolean;
}
export const TopNav: React.FC<Props> = ({ handleChange, id, open }) => {
  const isOpenStyle = open
    ? "brightness-[60%] z-20 sticky bg-white"
    : "z-20 sticky";
  return (
    <section className={isOpenStyle}>
      <div className="p-[19px] border-b-[1px] border-gray-200 flex justify-between">
        <div></div>
        <div className="flex">
          <button className="my-auto text-gray-500 border-[1px] border-gray-200 rounded-full mx-2  bg-gray-50 p-2 px-3">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button className="bg-orange-500 mx-3 text-white cursor-pointer text-lg rounded-2xl w-32">
            <FontAwesomeIcon className="mr-3" icon={faPlusCircle} />
            Add New
          </button>
          <div className="mx-2">{id && <UserCircle id={id} />}</div>
          <button className="mx-2 text-lg text-gray-500">
            <FontAwesomeIcon icon={faBell} />
          </button>
        </div>
      </div>
      <div className="flex py-5">
        <li className="list-none">
          <input
            value="projects"
            className="hidden peer"
            id="projects"
            type="radio"
            name="display"
            onChange={(event) => handleChange(event)}
          />
          <label className="profile-link" htmlFor="projects">
            Projects
          </label>
        </li>
        <li className="list-none">
          <input
            className="hidden peer"
            value="tasks"
            name="display"
            id="tasks"
            type="radio"
            onChange={(event) => handleChange(event)}
          />
          <label className="profile-link" htmlFor="tasks">
            Tasks
          </label>
        </li>
        <li className="list-none">
          <input
            className="hidden peer"
            value="calendar"
            name="display"
            id="calendar"
            type="radio"
            onChange={(event) => handleChange(event)}
          />
          <label className="profile-link" htmlFor="calendar">
            Calendar
          </label>
        </li>
      </div>
    </section>
  );
};
