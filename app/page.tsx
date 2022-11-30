"use client";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { HomePageTasks } from "./components/HomePage/HomePageTasks";
import { HomePageProjects } from "./components/HomePage/HomePageProjects";
import { HomePageTeams } from "./components/HomePage/HomePageTeams";

export default function HomePage() {
  const currentUser = useSelector((state: RootState) => state.user.value);

  return (
    <div>
      {currentUser && (
        <>
          <HomePageTasks id={currentUser.id as number} />
          <HomePageProjects id={currentUser.id as number} />
          <HomePageTeams id={currentUser.id as number} />
        </>
      )}
    </div>
  );
}
