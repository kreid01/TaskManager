import Link from "next/link";
import { useLogoutMutation, useGetUserQuery } from "../../generated/graphql";
import { RootState } from "../../store/store";
import { initialState, setUser, User } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendar,
  faProjectDiagram,
  faPeopleGroup,
  faBell,
  faSearch,
  faUserAlt,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export const Nav = () => {
  const [logout, { client }] = useLogoutMutation();

  const { data: user } = useGetUserQuery({ fetchPolicy: "network-only" });
  const currentUser = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(user?.getUser as User));
  }, [user?.getUser]);

  return (
    <nav
      className="fixed min-h-screen w-3/12 lg:w-2/12 bg-gradient-to-r from-orange-600 to-amber-500
   flex flex-col  shadow-lg"
    >
      <div className="sidebar-icon">
        <Link className="z-10" href="/">
          <FontAwesomeIcon icon={faHome} className="h-6 mx-1" /> Home
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link className="z-10" href="/calender">
          <FontAwesomeIcon icon={faCalendar} className="h-6 mx-1" /> Calender
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link className="z-10" href="/projects">
          <FontAwesomeIcon icon={faProjectDiagram} className="h-6 mx-1" />{" "}
          Projects
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link className="z-10" href="/teams">
          <FontAwesomeIcon icon={faPeopleGroup} className="h-6 mx-1" /> Teams
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link className="z-10" href="/notifcations">
          <FontAwesomeIcon icon={faBell} className="h-6 mx-1" /> Notifications
        </Link>
      </div>
      <div className="sidebar-icon">
        <Link className="z-10" href="/search">
          <FontAwesomeIcon icon={faSearch} className="h-6 mx-1 mr-2" />
          Search
        </Link>
      </div>
      <div className="mt-auto">
        <div className="sidebar-icon border-t-[1px]">
          <Link className="z-10" href="/profile">
            <FontAwesomeIcon icon={faUserAlt} className="h-6 mx-1 mr-2 " />
            Profile
          </Link>
        </div>
        {currentUser != undefined ? (
          <button
            className="sidebar-icon"
            onClick={async () => {
              logout();
              dispatch(setUser(initialState.value));
              await client!.resetStore();
            }}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="h-6 mx-1 mr-2 z-10"
            />
            <p className="z-10">Logout</p>
          </button>
        ) : (
          <>
            <div className="sidebar-icon border-t-[1px]">
              <Link className="z-10" href="register">
                Register
              </Link>
            </div>
            <div className="sidebar-icon">
              <Link className="z-10" href="login">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
