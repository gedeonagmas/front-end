import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./css/styles.css";

const Header = () => {
  const clickHandler = (val) => {
    const container = [
      "home",
      "project",
      "about",
      "blog",
      "apply",
      "chat",
      "real",
    ];
    for (let i = 0; i < container.length; i++) {
      const ids = document.getElementById(container[i]);
      ids?.classList.remove(
        "border-b-4",
        "border-emerald-400",
        "text-emerald-400"
      );
      if (val === container[i]) {
        const ids = document.getElementById(val);
        ids.classList.add("border-b-4", "border-emerald-400");
      }
    }
  };

  return (
    <div className="fixed top-0 bg-white z-10">
      <div className="h-16 w-screen flex justify-between pl-20 pr-4 py-5 border-b-2 border-gray-200">
        <div className="">
          <img
            src="./img/iot-loggggo.png"
            alt="DTU IOT CENTER"
            className=" h-[42px] w-15"
          />
        </div>
        <div className="flex gap-x-4  font-bold text-sm text-gray-700">
          <Link to="/">
            <div
              id="home"
              className="flex h-8 border-b-4 border-emerald-400"
              onClick={() => {
                clickHandler("home");
              }}
            >
              <p className="px-2 py-1">Home</p>
            </div>
          </Link>
          <Link to="/projects">
            <div
              id="project"
              className="flex rounded-md rounded-b-none"
              onClick={() => {
                clickHandler("project");
              }}
            >
              <p className="px-2 py-1">Projects</p>
            </div>
          </Link>

          <Link to="/about">
            <div
              id="about"
              className="flex rounded-md rounded-b-none"
              onClick={() => {
                clickHandler("about");
              }}
            >
              <p className="px-2 py-1">About</p>
            </div>
          </Link>

          <Link to="/blogs">
            <div
              id="blog"
              className="flex rounded-md rounded-b-none"
              onClick={() => {
                clickHandler("blog");
              }}
            >
              <p className="px-2 py-1">Blogs</p>
            </div>
          </Link>
          <Link to="apply">
            <div
              id="apply"
              className="flex rounded-md rounded-b-none"
              onClick={() => {
                clickHandler("apply");
              }}
            >
              <p className="px-2 py-1">Apply</p>
            </div>
          </Link>
          <Link to="real">
            <div
              id="chat"
              className="flex  rounded-b-none bg-emerald-400 text-white"
              onClick={() => {
                clickHandler("chat");
              }}
            >
              <p className="px-2 py-1">Chat</p>
            </div>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
