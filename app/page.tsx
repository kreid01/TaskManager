"use client";
import { Header } from "./components/UI/Header";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { HomePageTasks } from "./components/HomePage/HomePageTasks";
import { HomePageProjects } from "./components/HomePage/HomePageProjects";
import { HomePageTeams } from "./components/HomePage/HomePageTeams";

export default function HomePage() {
  const currentUser = useSelector((state: RootState) => state.user.value);

  return (
    <div>
      <Header title="Home" />
      {currentUser && (
        <>
          <HomePageTasks id={currentUser.id as number} />
          <HomePageProjects id={currentUser.id as number} />
          <HomePageTeams id={currentUser.id as number} />
        </>
      )}
      <section>
        <h2 className="text-blue-800 mt-5 ml-5 font-bold text-2xl">Messages</h2>
      </section>
      <div className=" border-[1px] my-2 border-orange-500 rounded-md p-2 mx-5 shadow-lg">
        Message contents
      </div>
      <div className=" border-[1px] my-2 border-orange-500 rounded-md p-2 mx-5 shadow-lg">
        Message contents
      </div>
      <div className=" border-[1px] my-2 border-orange-500 rounded-md p-2 mx-5 shadow-lg">
        Message contents
      </div>
    </div>
  );
}
