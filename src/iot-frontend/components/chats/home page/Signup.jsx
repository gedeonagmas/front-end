import React, { useState } from "react";
import Portrait from "@mui/icons-material/PortraitOutlined";
import Login from "./Login";
import Back from "@mui/icons-material/ArrowBack";
import { useCreateUserAccountMutation } from "./../../../../features/api/apiSlice";

const Signup = () => {
  const [usersData] = useCreateUserAccountMutation();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(true);
  const [succ, setSucc] = useState(false);

  const signupHandler = async () => {
    const fd = new FormData();
    fd.append("fullName", fullName);
    fd.append("userName", userName);
    fd.append("email", email);
    fd.append("password", password);
    fd.append("profilePic", profile);
    fd.append("status", "offline");
    fd.append("flag", "individual");
    usersData(fd);
  };
  return (
    <div>
      {signup && (
        <div className="relative flex flex-col gap-y-1 -mt-32 bg-white h-96 w-72 items-center rounded-md shadow-lg shadow-black px-4">
          <Back
            fontSize="small"
            className="absolute left-0 top-1 text-xs text-gray-400 cursor-pointer"
            onClick={() => {
              setSignup(false);
              setLogin(true);
            }}
          />
          <p className="font-bold mt-10 text-gray-400">Signup</p>
          <input
            required
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="full name"
            className="w-64 mt-4 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
          />
          <input
            required
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="user name"
            className="w-64 mt-1 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
          />
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email"
            className="w-64 mt-1 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
          />
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="password"
            className="w-64 mt-1 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
          />
          <input
            required
            onChange={(e) => setProfile(e.target.files[0])}
            type="file"
            name="profilePic"
            id=""
            className="w-64 bg-blue-400 text-sm h-8  absolute bottom-[107px] opacity-0"
          />
          <p className="w-64 mt-1 h-8 pt-1 text-gray-500 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300">
            <span>
              <Portrait className="" />
            </span>
            <span className="ml-2">enter your profile picture </span>
          </p>
          <button
            onClick={() => {
              signupHandler();
              setSucc(true);
              setTimeout(() => {
                setLogin(true);
                setSignup(false);
                setSucc(false);
              }, 3000);
            }}
            type="text"
            className="w-64 mt-4 h-8 text-sm rounded-sm pl-1 focus:outline-none text-white bg-emerald-500 border border-gray-300"
          >
            Signup
          </button>
        </div>
      )}
      {login && <Login />}
      {succ && (
        <p className="absolute top-36 ml-2 text-lg py-2 px-2 border-2 border-emerald-400 bg-white font-bold text-emerald-400">
          Account Created Successfully.
        </p>
      )}
    </div>
  );
};

export default Signup;
