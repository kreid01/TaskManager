import Link from "next/link";
import { useLogoutMutation, useGetUserQuery } from "../../generated/graphql";
import { RootState } from "../../store/store";
import { initialState, setUser, User } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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
      className=" fixed min-h-screen w-2/12 lg:w-[13%] bg-slate-800
   flex flex-col rleative  shadow-lg"
    >
      <div>
        <header className="text-white font-bold p-5 flex text-2xl bg-slate-600">
          <img
            className="h-10 w-10 mr-3 "
            src="https://taskfzco.com/wp-content/uploads/2021/10/cropped-Task-mi-Fav-icon.png"
            alt=""
          />
          Tasker
        </header>
        <div>
          <h1 className="text-gray-300 font-semibold text-lg ml-5 mt-5">
            Pinned Tasks
          </h1>
        </div>

        <div>
          <h1 className="text-gray-300 mt-[40vh] font-semibold text-lg ml-5">
            Favourite Projects
          </h1>
        </div>
        <div className="absolute bottom-0 w-fulls">
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
              <div className="sidebar-icon ">
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
      </div>
    </nav>
  );
};
