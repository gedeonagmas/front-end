import React, { useEffect, useState } from "react";
import "./style.css";
import {
  useBlogsGetAcceptedDataQuery,
  useBlogsPostMutation,
} from "../../features/api/apiSlice";
import { CloseOutlined, PortraitOutlined } from "@mui/icons-material";
import { format } from "timeago.js";

const Contact = () => {
  const [fullData, setFullData] = useState([]);
  const [posted, setPosted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [menu, setMenu] = useState(false);
  const { data } = useBlogsGetAcceptedDataQuery();
  const [blogData] = useBlogsPostMutation();
  const postHandler = () => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("blo", photo);
    fd.append("time", new Date().toISOString());
    blogData(fd);
  };

  useEffect(() => {
    data && console.log(data, "ddd");
    fullData && console.log(fullData, "full data");
    data && setFullData(data[0]);
  }, []);
  const fullVideoHandler = (value) => {
    setFullData(value);
  };
  return (
    <div className="my-1 mt-4 flex flex-col pb-5 items-center justify-center w-[96%]">
      <p className="text-xl font-extrabold text-gray-500">
        WELL COME TO OUR TOP BLOGS
      </p>
      <p
        className="text-xs font-bold text-gray-500 border border-gray-400 bg-white shadow shadow-black hover:bg-gray-200 absolute top-20 right-10 px-2 py-1 cursor-pointer rounded-sm"
        onClick={() => setMenu(true)}
      >
        post blog
      </p>
      {posted && (
        <p className="absolute top-20 right-9 font-bold py-2 px-2 border-2 border-emerald-400 text-emerald-400 bg-white">
          successfull. your blog will be posted ones the admin aproves it
        </p>
      )}
      {menu && (
        <div className="absolute flex flex-col items-center z-10 right-1 top-20 border border-gray-400 shadow-xl shadow-black h-96 w-72 rounded-sm bg-white">
          <CloseOutlined
            onClick={() => setMenu(false)}
            className="absolute cursor-pointer right-0 top-1 text-gray-500 hover:text-black"
          />
          <p className="text-sm font-bold text-gray-600 mt-4">
            Blogs Information
          </p>
          <input
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="text-xs focus:outline-none w-[270px] border border-gray-300 bg-gray-100 px-2 h-7 mt-6"
            placeholder="your name"
          />
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="text-xs focus:outline-none w-[270px] border border-gray-300 bg-gray-100 px-2 h-7 mt-1"
            placeholder="your email"
          />
          <input
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="text-xs focus:outline-none w-[270px] border border-gray-300 bg-gray-100 px-2 h-7 mt-1"
            placeholder="blog title"
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            required
            name=""
            id=""
            cols="37"
            rows="8"
            className="text-xs focus:outline-none border border-gray-300 bg-gray-100 px-2 mt-1"
            placeholder="blog description"
          ></textarea>
          <input
            required
            onChange={(e) => setPhoto(e.target.files[0])}
            type="file"
            name="blo"
            id=""
            className="w-[270px] bg-blue-400 text-sm h-8  absolute top-[290px] opacity-0"
          />
          <p className="w-[270px] mt-1 h-8 pt-1 text-gray-500 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300">
            <span>
              <PortraitOutlined className="" />
            </span>
            <span className="ml-2">enter your profile picture </span>
          </p>
          <button
            onClick={() => {
              postHandler();
              setMenu(false);
              setPosted(true);
              setTimeout(() => {
                setPosted(false);
              }, 6000);
            }}
            className="bg-emerald-500 mt-3 py-2 text-xs border border-emerald-400 hover:bg-emerald-400 font-bold w-[270px] text-white"
          >
            Post
          </button>
        </div>
      )}
      <div className="h-[90vh] w-screen mt-4 flex">
        <div className="w-72 h-[88vh] overflow-y-scroll bg-gray-200 text-black shadow-sm shadow-black rounded-md ml-14 mt-2">
          {data &&
            data.length !== 0 &&
            data.map((da) => {
              return (
                <div
                  key={da.email}
                  className="mt-10 hover:bg-gray-400 cursor-pointer"
                  onClick={() => {
                    fullVideoHandler(da);
                  }}
                >
                  <p className=" text-xs font-bold my-1 mx-4">{da.title}</p>
                  <img
                    src={require(`./../../iotUploads/${da.blogsPhoto[0].path}`)}
                    alt="default img"
                    className="h-28 w-60 mx-4"
                  />
                  <p className="text-xs mx-4">
                    {format(da.time)}
                    <span className=" font-bold ml-16">by {da.name}</span>
                  </p>
                  <p className="text-sm font-bold text-emerald-400 mx-2">
                    ----------------------------------------------
                  </p>
                </div>
              );
            })}
        </div>
        <div className="flex flex-col w-[60%] h-[76vh] mt-14 ml-16 px-10 overflow-y-scroll relative">
          {data && fullData && (
            <div key={fullData.email}>
              <div className="flex">
                <div className="w-[500px]">
                  <p className="text-gray-700 text-lg font-extrabold my-4 text-gray-500">
                    {fullData.title}
                  </p>
                  <img
                    src={
                      fullData.blogsPhoto[0].path !== undefined
                        ? require(`./../../iotUploads/${fullData.blogsPhoto[0].path}`)
                        : require(`./../../iotUploads/${data[0].blogsPhoto[0].path}`)
                    }
                    alt="default img"
                    className="h-64 w-[96%]"
                  />
                </div>
                <div className="ml-10 bg-gray-200 text-gray-500 rounded-md py-2 px-4 h-24 flex flex-col items-center justify-center mt-20 border border-gray-200 ">
                  <p className="text-sm font-bold my-1">
                    blogers name:{" "}
                    {fullData.length !== 0 ? fullData.name : data[0].name}
                  </p>
                  <p className="text-sm font-bold">
                    email:{" "}
                    {fullData.length !== 0 ? fullData.email : data[0].email}
                  </p>
                </div>
              </div>
              <p className="absolute top-72 left-[800px] text-xs text-gray-500">
                {format(fullData.length !== 0 ? fullData.time : data[0].time)}
              </p>
              <p className="my-2 text-sm text-gray-500">
                {fullData.length !== 0
                  ? fullData.description
                  : data[0].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
