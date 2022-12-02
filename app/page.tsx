"use client";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { HomePageTasks } from "./components/HomePage/HomePageTasks";
import { HomePageProjects } from "./components/HomePage/HomePageProjects";
import { TopNav } from "./components/UI/TopNav";
import React, { useState } from "react";

export default function HomePage() {
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [displayed, setDisplayed] = useState("tasks");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayed(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prevState) => !prevState);
    console.log(open);
  };

  return (
    <div>
      {currentUser && (
        <>
          <TopNav
            open={open}
            id={currentUser.id as number}
            handleChange={handleChange}
          />
          {displayed === "tasks" ? (
            <HomePageTasks
              open={open}
              handleClick={handleClick}
              id={currentUser.id as number}
            />
          ) : (
            <HomePageProjects
              open={open}
              handleClick={handleClick}
              id={currentUser.id as number}
            />
          )}
        </>
      )}
    </div>
  );
}
