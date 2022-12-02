interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TopNav: React.FC<Props> = ({ handleChange }) => {
  return (
    <div className="flex my-5">
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
        <label htmlFor="tasks" className="profile-link">
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
  );
};
