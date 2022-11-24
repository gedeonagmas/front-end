import axios from "axios";
import React, { useState } from "react";

import Cha from "../../Cha";
//import Reset from "./Reset";
import Signup from "./Signup";

const Login = () => {
  const [wrong, setWrong] = useState(false);
  const [name, setNameLogin] = useState("");
  const [password, setPasswordLogin] = useState("");
  const [chatPage, setChatPage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(true);
  //const [forget, setForget] = useState(false);
  const [signup, setSignup] = useState(false);
  const loginHandler = async () => {
    const data = await axios.get(`http://localhost:2200/login?name=${name}`);
    if (
      data?.data[0]?.userName !== undefined &&
      data?.data[0]?.userName === name &&
      data?.data[0]?.password === password
    ) {
      setCurrentUser(data.data);
      setChatPage(true);

      setLogin(false);
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
      }, [3000]);
    }
  };
  return (
    <div className="flex pl-4 items-center justify-center mt-8 bg-gray-100 h-[100vh]">
      {login && (
        <div className="flex flex-col gap-y-1 -mt-32 bg-white h-80 w-72 items-center rounded-md shadow-lg shadow-black px-4">
          {wrong && (
            <p className="absolute top-40 left-[555px] font-bold w-64 px-2 text-red-400 py-2 border-2 border-red-400 bg-white">
              Wrong Password or user name please try again correctly !!!
            </p>
          )}
          <p className="font-bold mt-10 text-gray-400">Log In</p>
          <input
            onChange={(e) => setNameLogin(e.target.value)}
            type="text"
            placeholder="user name"
            className="w-64 mt-4 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
          />
          <input
            onChange={(e) => setPasswordLogin(e.target.value)}
            type="password"
            placeholder="password"
            className="w-64 mt-1 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
          />
          <button
            onClick={() => {
              loginHandler();
            }}
            type="text"
            className="w-64 mt-4 h-8 text-sm rounded-sm pl-1 focus:outline-none text-white bg-emerald-500 border border-gray-300"
          >
            Login
          </button>
          <div className="flex flex-col mt-6 items-center justify-center gap-y-2">
            <p
              onClick={() => {
                setLogin(false);
                setSignup(true);
              }}
              className="text-xs cursor-pointer text-gray-500 hover:underline"
            >
              don't have account?{" "}
              <span className="text-emerald-400 font-bold">create new</span>
            </p>
            {/* <p
              onClick={() => {
                setLogin(false);
                setForget(true);
              }}
              className="text-xs cursor-pointer text-gray-500 hover:underline"
            >
              Forget password
            </p> */}
          </div>
        </div>
      )}
      {/* {forget && <Reset />} */}
      {signup && <Signup />}
      {chatPage && <Cha currentUser={currentUser} />}
    </div>
  );
};

export default Login;
