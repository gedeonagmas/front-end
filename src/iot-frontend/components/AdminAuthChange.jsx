import React, { useState } from "react";
import Close from "@mui/icons-material/Close";
import {
  //useAdminAuthCreateMutation,
  useAdminAuthGetQuery,
  useAdminAuthUpdateMutation,
} from "../../features/api/apiSlice";

const AdminAuth = () => {
  const { data } = useAdminAuthGetQuery();
  if (data) {
    console.log(data);
  }
  //const [createData] = useAdminAuthCreateMutation();
  const [updateData] = useAdminAuthUpdateMutation();

  const [previousName, setPreviousName] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const [correct, setCorrect] = useState(false);

  // const loginHandler = () => {
  //   const fd = new FormData();
  //   fd.append("name", "admin");
  //   fd.append("password", 123);
  //   createData(fd);
  // };
  const updateHandler = () => {
    if (
      data[0].name === previousName &&
      data[0].password === previousPassword
    ) {
      updateData({
        name: newName,
        password: newPassword,
      });
      setCorrect(true);
      setTimeout(() => {
        setCorrect(false);
      }, 6000);
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
      }, 6000);
    }
  };
  return (
    <div className="flex flex-col place-items-center pb-44 mt-10">
      <div className="relative flex flex-col mt-20 gap-y-1 py-8 bg-white h-auto w-72 items-center rounded-md shadow-lg shadow-black px-4">
        <p className="font-bold mx-2 w-64 text-sm font-bold text-gray-400">
          create user name and password to manage everything as admin
        </p>
        {wrong && (
          <p className="absolute top-4 left-4 px-2 py-2 w-60 border-2 bg-white border-red-400 text-red-400 font-bold text-sm">
            wrong user name or password please try again correctly
          </p>
        )}
        {correct && (
          <p className="absolute top-4 left-4 px-2 py-2 w-60 border-2 bg-white border-emerald-400 text-emerald-400 font-bold text-sm">
            admin name and password update successfully
          </p>
        )}
        <input
          onChange={(e) => setPreviousName(e.target.value)}
          type="text"
          placeholder="previous name"
          className="w-64 mt-4 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
        />
        <input
          onChange={(e) => setPreviousPassword(e.target.value)}
          type="text"
          placeholder="previous password"
          className="w-64 mt-1 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
        />
        <input
          onChange={(e) => setNewName(e.target.value)}
          type="text"
          placeholder="new name"
          className="w-64 mt-1 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
        />
        <input
          onChange={(e) => setNewPassword(e.target.value)}
          type="text"
          placeholder="new password"
          className="w-64 mt-1 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
        />
        <button
          onClick={() => {
            updateHandler();
          }}
          type="text"
          className="w-64 mt-4 h-8 text-sm rounded-sm pl-1 focus:outline-none text-white bg-emerald-500 border border-gray-300 hover:bg-emerald-400"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default AdminAuth;
