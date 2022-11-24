import React, { useState } from "react";
import { format } from "timeago.js";
import {useFeedbackGetQuery} from './../../features/api/apiSlice';
import West from "@mui/icons-material/West";
import { Link } from "@mui/icons-material";

const Feedback = () => {
  const {data}=useFeedbackGetQuery();
  const [adminPage,setAdminPage]=useState(true);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const [correct, setCorrect] = useState(false);

  const updateHandler=()=>{
    console.log(newName,newPassword);
    if(newName==='test' && newPassword==='123'){
      console.log('true')
      setCorrect(false);
      setAdminPage(true);
    }else{
      setWrong(true);
      setTimeout(()=>{
        setWrong(false);
      },4000);
    }
  }
  if(data){
    console.log(data);
  }
  return (
    <div className="flex flex-col place-items-center pb-44 mt-10">
     {/* {correct &&<div className="relative flex flex-col mt-20 gap-y-1 py-8 bg-white h-auto py-[70px]  w-72 items-center rounded-md shadow-lg shadow-black px-4">
      <p className="font-bold mx-2 w-64 text-sm font-bold text-gray-400">
        login to see your feedback
      </p>
      {wrong && (
        <p className="absolute top-4 left-4 px-2 py-2 w-60 border-2 bg-white border-red-400 text-red-400 font-bold text-sm">
          wrong user name or password please try again correctly
        </p>
      )}
      <input
        onChange={(e) => setNewName(e.target.value)}
        type="text"
        placeholder="your name"
        className="w-64 mt-1 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
      />
      <input
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        placeholder="password"
        className="w-64 mt-1 h-8 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300"
      />
      <button
        onClick={() => {
            updateHandler();
        }}
        type="text"
        className="w-64 mt-4 h-8 text-sm rounded-sm pl-1 focus:outline-none text-white bg-emerald-500 border border-gray-300 hover:bg-emerald-400"
      >
        login
      </button>
    </div>
    }  */}
    {adminPage && data && <div className="mt-20">
      <p className="text-lg font-extrabold my-2 text-gray-600">Well Come To Our Feedback Page</p>
      <div className="mt-4 border border-emerald-400 h-[500px] w-[500px] overflow-y-scroll">
      {data.map((da)=>{
        return (
         <div className="mt-4">
          <div className="flex justify-between">
            <p className="text-sm px-2 font-bold">name: <span className='font-normal text-gray-500'> {da.name}</span></p>
            <p className="text-xs mr-4">{format(da.date)}</p>
          </div>
            <p className="text-sm px-2 font-bold">email: <span className='font-normal text-gray-500'>{da.email}</span></p>
            <p className="text-sm px-2 font-bold">feedback: <span className='font-normal text-gray-500'>{da.feedback}</span></p>
            <p className="text-sm font-bold mt-1 text-emerald-400 mx-2">-----------------------------------------------------------------------------------------------------</p>
         </div> 
        )
      })}
      </div>
    </div>
    }
 </div>
  );
};

export default Feedback;
