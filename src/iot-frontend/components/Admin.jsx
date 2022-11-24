import React, { useState } from "react";
import Delete from "@mui/icons-material/Delete";
import Accept from "@mui/icons-material/Done";
import Playlist from "@mui/icons-material/PlaylistAddCheckCircle";
import Badge from "@mui/material/Badge";
import Phone from "@mui/icons-material/Phone";
import { format } from "timeago.js";
import Email from "@mui/icons-material/Email";
import {
  useGetAllAcceptedProjectsQuery,
  useGetAllNewRequestedProjectsQuery,
  useAcceptNewProjectRequestMutation,
  useDeleteNewProjectRequestMutation,
  usePreviousProjectDeleteMutation,
  useApplyGetRequestQuery,
  useApplyGetAcceptedStudentsQuery,
  useApplyAcceptStudentsMutation,
  useApplyDeleteStudentsMutation,
  useChatGetAllUsersQuery,
  useChatGetAllGroupsQuery,
  useChatDeleteUsersMutation,
  useChatDeleteGroupsMutation,
  useBlogsGetRequestDataQuery,
  useBlogsGetAcceptedDataQuery,
  useBlogsAcceptRequestMutation,
  useBlogsDeleteMutation,
  useCreateUserAccountMutation,
} from "./../../features/api/apiSlice";
import PortraitOutlined from "@mui/icons-material/PortraitOutlined";
import { useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import AdminAuthChange from "./AdminAuthChange";
import Close from '@mui/icons-material/ArrowBack'

const Admin = () => {
  const [adminLoginPassword, setAdminLoginPassword] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminProfile, setAdminProfile] = useState("");

  // const [adminNameEdit, setAdminNameEdit] = useState("");
  // const [adminEmailEdit, setAdminEmailEdit] = useState("");
  // const [adminPasswordEdit, setAdminPasswordEdit] = useState("");
  // const [adminProfileEdit, setAdminProfileEdit] = useState("");

  const [adminAccountCreate, setAdminAccountCreate] = useState(true);
  const [adminAccountEdit, setAdminAccountEdit] = useState(false);

  //const [acceptPopUp, setAcceptPopUp] = useState(false);
  const [rejectReason, setRejectReason] = useState(false);
  const [rejectPopUp, setRejectPopUp] = useState(false);
  const [rejectId, setRejectId] = useState("");
  const [rejectText, setRejectText] = useState("");
  //################################# Admin create account handler ################################
  const [adminId] = useCreateUserAccountMutation();
  const adminAccountCreateHandler = () => {
    const fd = new FormData();
    fd.append("userName", adminName);
    fd.append("email", adminEmail);
    fd.append("password", adminPassword);
    fd.append("profilePic", adminProfile);
    fd.append("fullName", "ADMIN OF IOT LAB-CENTER");
    adminId(fd);
  };
  //############################ admin account edit handler ####################################
  //############################## variables #################################################
  const [blogs, setBlogs] = useState(true);
  const [projects, setProjects] = useState(false);
  const [allPro, setAllPro] = useState(false);
  const [newPro, setNewPro] = useState(true);
  const [apply, setApply] = useState(false);
  const [chat, setChat] = useState(false);
  const [allBlogs, setAllBlogs] = useState(true);
  const [newBlogs, setNewBlogs] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [requested, setRequested] = useState(true);
  const [allUsers, setAllUsers] = useState(true);
  const [newUsers, setNewUsers] = useState(false);
  const [yourChat, setYourChat] = useState(false);

  //################################### RTK QUERY FOR PROJECTS ##################################
  //for project accept
  const {
    data: allAcceptedProjectsData,
    isFetching: isFetchingAcceptedProject,
  } = useGetAllAcceptedProjectsQuery();
  const [accepteProjects, setAcceptedProjects] = useState(
    allAcceptedProjectsData
  );
  useEffect(() => {
    if (!isFetchingAcceptedProject) {
      setAcceptedProjects(allAcceptedProjectsData);
    }
  }, [isFetchingAcceptedProject, allAcceptedProjectsData]);
  //for project request
  const { data: allRequestedProjectsData, isFetching: isFetchingRequest } =
    useGetAllNewRequestedProjectsQuery();
  const [requestProjects, setRequestProjects] = useState(
    allRequestedProjectsData
  );
  useEffect(() => {
    if (!isFetchingRequest) {
      setRequestProjects(allRequestedProjectsData);
    }
  }, [isFetchingRequest, allRequestedProjectsData]);

  const [acceptIds] = useAcceptNewProjectRequestMutation();
  const [deleteIds] = useDeleteNewProjectRequestMutation();
  const [previousDeleteIds] = usePreviousProjectDeleteMutation();
  //############################## new project request accept handler #######################
  const newProjectAcceptHandler = (ids) => {
    acceptIds(ids);
  };
  //############################### new project request delete handler #######################
  const newProjectDeleteHandler = (ids) => {
    deleteIds(ids);
  };
  const previousProjectDeleteHandler = (ids) => {
    previousDeleteIds(ids);
  };
  //##########################################################################################
  //#################################### render handler #####################################
  const renderHandler = (val) => {
    setBlogs(false);
    setProjects(false);
    setApply(false);
    setChat(false);
    switch (val) {
      case 1: {
        setBlogs(true);
        break;
      }
      case 2: {
        setProjects(true);
        break;
      }
      case 3: {
        setApply(true);
        break;
      }
      case 4: {
        setChat(true);
        break;
      }
      default: {
        setBlogs(false);
        setProjects(false);
        setApply(false);
        setChat(false);
      }
    }
  };
  const headerClickHandler = (val) => {
    const arr = ["bl", "pr", "ap", "ch"];
    for (let i = 0; i < arr.length; i++) {
      const ids = document.getElementById(arr[i]);
      ids.classList.remove("border-b-4", "border-emerald-400");
      if (val === arr[i]) {
        const ids = document.getElementById(arr[i]);
        ids.classList.add("border-b-4", "border-emerald-400");
      }
    }
  };

  const proHandler = (val) => {
    const arr = ["proAll", "proNew"];
    for (let i = 0; i < arr.length; i++) {
      const ids = document.getElementById(arr[i]);
      ids.classList.remove("border-b-4", "border-emerald-400");
      if (val === arr[i]) {
        const ids = document.getElementById(arr[i]);
        ids.classList.add("border-b-4", "border-emerald-400");
      }
    }
  };

  const applyClickHandler = (val) => {
    const arr = ["acc", "req"];
    for (let i = 0; i < arr.length; i++) {
      const ids = document.getElementById(arr[i]);
      ids.classList.remove("border-b-4", "border-emerald-400");
      if (val === arr[i]) {
        const ids = document.getElementById(arr[i]);
        ids.classList.add("border-b-4", "border-emerald-400");
      }
    }
  };

  const clickHandler = (val) => {
    const arr = ["new", "all"];
    for (let i = 0; i < arr.length; i++) {
      const ids = document.getElementById(arr[i]);
      ids.classList.remove("border-b-4", "border-emerald-400");
      if (arr[i] === val) {
        const ids = document.getElementById(val);
        ids.classList.add("border-b-4", "border-emerald-400");
      }
    }
  };
  //############################## RTK QUERY FOR APPLY ##########################################
  //for apply request data
  const { data: applyGetRequestData, isFetching: applyRequestIsFetching } =
    useApplyGetRequestQuery();
  const [applyRequest, setApplyRequest] = useState(applyGetRequestData);
  useEffect(() => {
    if (!applyRequestIsFetching) {
      setApplyRequest(applyGetRequestData);
    }
  }, [applyRequestIsFetching, applyGetRequestData]);

  //for apply accepted data
  const { data: applyGetAcceptData, isFetching: applyAcceptIsFetching } =
    useApplyGetAcceptedStudentsQuery();
  const [applyAccept, setApplyAccept] = useState(applyGetAcceptData);
  useEffect(() => {
    if (!applyAcceptIsFetching) {
      setApplyAccept(applyGetAcceptData);
    }
  }, [applyAcceptIsFetching, applyGetAcceptData]);

  const [requestDeleteIds] = useApplyDeleteStudentsMutation();
  const [requestAcceptIds] = useApplyAcceptStudentsMutation();
  const [studentDeleteIds] = useApplyDeleteStudentsMutation();
  //############################## apparent delete from request handler ##########################
  const deleteApparentFromRequestHandler = (texts) => {
    setRejectPopUp(false);
    //rejectId && console.log(rejectId);
    //console.log('texts for student',texts);
    //send message for student throug Email logic will be here
    let emails=applyGetRequestData[0].email;
    const ids=rejectId;
    console.log(emails,'emails')
    emails &&ids && studentDeleteIds({ids,emails,texts});
  };
  //############################## apparent accept from request handler ##########################
  const acceptApparenFromRequesttHandler = (ids) => {
    //send message for student throug Email logic here
    let emails=applyGetRequestData[0].email;
    requestAcceptIds({ids,emails,texts:'Congratulations your request to apply internship on debretabour university is accepted!!!'});
  };
  //############################## delete apparent from accepted handler #########################
  const deleteApparentFromAccepted = (ids) => {
    console.log('delete apparent from accepted ');
    let emails=applyGetAcceptData[0].email;
    requestDeleteIds({ids,emails,texts:'We are sorry you are removed from debretabour university iot lab center !!! for more information please contact your adviser'});
  };
  //####################################### RTK QUERY FOR CHATS ##################################
  //get all users
  const [usersId] = useChatDeleteUsersMutation();
  const { data: allUsersData, isFetching: allUsersIsFetching } =
    useChatGetAllUsersQuery();
  const [users, setUsers] = useState(allUsersData);
  useEffect(() => {
    if (!allUsersIsFetching) {
      setUsers(allUsersData);
    }
  }, [allUsersIsFetching, allUsersData]);

  const userDeleteHandler = (ids) => {
    usersId(ids);
  };
  //get all groups
  const [groupsId] = useChatDeleteGroupsMutation();
  const { data: allGroupsData, isFetching: allGroupsIsFetching } =
    useChatGetAllGroupsQuery();
  const [groups, setGroups] = useState(allGroupsData);
  useEffect(() => {
    if (!allGroupsIsFetching) {
      setGroups(allGroupsData);
    }
  }, [allGroupsIsFetching, allGroupsData]);

  const groupDeleteHandler = (ids) => {
    groupsId(ids);
  };
  //################################ RTK QUERY FOR BLOGS ################################
  //for blogs request data
  const { data: blogsRequestData, isFetching: requestIsFetching } =
    useBlogsGetRequestDataQuery();
  const [bbb, setBbb] = useState(blogsRequestData);
  useEffect(() => {
    if (!requestIsFetching) {
      setBbb(blogsRequestData);
    }
  }, [requestIsFetching, blogsRequestData]);

  //for blogs accepted data
  const { data: blogsAcceptedData, isFetching } =
    useBlogsGetAcceptedDataQuery();
  const [aaa, setAaa] = useState(blogsAcceptedData);
  useEffect(() => {
    if (!isFetching) {
      setAaa(blogsAcceptedData);
    }
  }, [isFetching, blogsAcceptedData]);

  const [blogsDeleteId] = useBlogsDeleteMutation();
  const [blogsAcceptId] = useBlogsAcceptRequestMutation();

  const blogsDeleteHandler = (ids) => {
    blogsDeleteId(ids);
  };
  const acceptBlogsRequest = (ids) => {
    blogsAcceptId(ids);
  };
  //############################################ DOM ########################################
  //#########################################################################################
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-x-2 justify-center items-center my-2">
        <div className="flex gap-2 mt-4">
          <p
            id="bl"
            className="text-sm font-bold mx-2 px-1 cursor-pointer border-b-4 border-emerald-400 h-7"
            onClick={() => {
              setBlogs(true);
              headerClickHandler("bl");
              renderHandler(1);
            }}
          >
            Blogs
          </p>
          <p
            id="pr"
            className="text-sm font-bold cursor-pointer mx-2 px-1"
            onClick={() => {
              setProjects(true);
              headerClickHandler("pr");
              renderHandler(2);
            }}
          >
            Projects
          </p>
          <p
            id="ap"
            className="text-sm font-bold cursor-pointer mx-2 px-1"
            onClick={() => {
              setApply(true);
              headerClickHandler("ap");
              renderHandler(3);
            }}
          >
            Apply
          </p>
          <p
            id="ch"
            className="text-sm font-bold cursor-pointer mx-2 px-1"
            onClick={() => {
              setChat(true);
              headerClickHandler("ch");
              renderHandler(4);
            }}
          >
            Chat
          </p>
          <p
            onClick={() => {
              setAdminLoginPassword(true);
            }}
            className="absolute right-6 font-bold cursor-pointer text-gray-400 px-1 py-1 border border-gray-300 hover:bg-gray-200"
          >
            change password
          </p>
        </div>
        {adminLoginPassword && (
          <div className="absolute z-10 top-0 -mt-6 right-6">
            <Close onClick={()=>setAdminLoginPassword(false)} className="absolute z-20 top-32 right-32 mr-32 cursor-pointer  hover:text-gray-600" />
            <AdminAuthChange />
          </div>
        )}
        {blogs && (
          <div className="flex flex-col mt-8 h-[400px] items-center w-[500px] border bg-gray-200 border-emerald-400">
            <div className="flex gap-x-4">
              <p
                id="all"
                className="font-bold mt-3 h-8 text-sm cursor-pointer border-b-4 border-emerald-400"
                onClick={() => {
                  setAllBlogs(true);
                  setNewBlogs(false);
                  clickHandler("all");
                }}
              >
                All Blogs{""}
                <span className="text-emerald-400 ">
                  <Badge
                    badgeContent={aaa?.length}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Playlist fontSize="small" className="-mt-1 mr-1" />
                  </Badge>
                </span>
              </p>
              <p
                id="new"
                className="font-bold mt-3 ml-10 text-sm cursor-pointer h-8 "
                onClick={() => {
                  setNewBlogs(true);
                  setAllBlogs(false);
                  clickHandler("new");
                }}
              >
                New Blog{" "}
                <span className="text-red-400 ">
                  <Badge
                    badgeContent={bbb?.length}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Playlist fontSize="small" className="-mt-1 mr-1" />
                  </Badge>
                </span>
              </p>
            </div>
            {/* ############################# ALL BLOGS ############################# */}
            {allBlogs && (
              <div className="mt-5 px-4 h-[400px] w-[500px] overflow-y-scroll bg-white border border-emerald-400">
                {aaa &&
                  aaa.map((all, i) => {
                    return (
                      <div key={all._id} className="">
                        <div className="flex justify-between relative">
                          <div className="">
                            <p className="text-sm pt-2">
                              name : <span className="ml-1">{all.name}</span>
                            </p>
                            <p className="text-sm">
                              email : <span className="ml-1">{all.email}</span>
                            </p>
                          </div>
                          <div
                            onClick={() => blogsDeleteHandler(all._id)}
                            className="flex absolute left-80 gap-1 mx-1 my-4 h-7 rounded-md cursor-pointer border border-pink-500 bg-gray-100 hover:bg-gray-200"
                          >
                            <Delete
                              fontSize="small"
                              className="text-pink-500 my-[3px]"
                            />
                            <button className="text-pink-500 text-sm px-1">
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-x-2">
                          <img
                            src={require(`./../../iotUploads/${all.blogsPhoto[0].path}`)}
                            alt="dd"
                            className="w-36 h-36 mt-4"
                          />
                          <div className="mt-6">
                            <p className="font-semibold flex justify-between">
                              {all.title}{" "}
                              <span className="text-xs mt-1 mr-2 ">
                                {all.time}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">
                              {all.description}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs">
                          ------------------------------------------------------------------------------------------------
                        </p>
                      </div>
                    );
                  })}
              </div>
            )}
            {/* #################################### NEW BLOGS ################################ */}
            {newBlogs && bbb && (
              <div className="mt-5 px-4 h-[400px] w-[500px] overflow-y-scroll bg-white border border-emerald-400">
                {bbb.map((all, i) => {
                  return (
                    <div key={all._id} className="">
                      <div className="flex justify-between relative">
                        <div className="">
                          <p className="text-sm pt-2">
                            name : <span className="ml-1">{all.name}</span>
                          </p>
                          <p className="text-sm">
                            email : <span className="ml-1">{all.email}</span>
                          </p>
                        </div>
                        <div
                          onClick={() => acceptBlogsRequest(all._id)}
                          className="flex absolute left-72 my-4 h-7 rounded-md cursor-pointer border border-emerald-400 bg-gray-100 hover:bg-gray-200"
                        >
                          <Accept
                            fontSize="small"
                            className="text-emerald-400 my-[3px]"
                          />
                          <button className="text-emerald-400 text-sm px-1">
                            Accept
                          </button>
                        </div>
                        <div
                          onClick={() => blogsDeleteHandler(all._id)}
                          className="flex my-4 h-7 rounded-md cursor-pointer border border-pink-500 bg-gray-100 hover:bg-gray-200"
                        >
                          <Delete
                            fontSize="small"
                            className="text-pink-500 my-[3px]"
                          />
                          <button className="text-pink-500 text-sm px-1">
                            Reject
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-x-2">
                        <img
                          src={require(`./../../iotUploads/${all.blogsPhoto[0].path}`)}
                          alt="dd"
                          className="w-36 h-36 mt-4"
                        />
                        <div className="mt-6">
                          <p className="font-semibold flex justify-between">
                            {all.title}{" "}
                            <span className="text-xs mt-1 mr-2 ">
                              {all.time}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500">
                            {all.description}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs">
                        ------------------------------------------------------------------------------------------------
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {/* ####################################### PROJECTS ################################### */}
        {projects && (
          <div className="">
            <div className="bg-gray-300 h-[44px] w-[100%] mt-4 flex justify-center items-center border-b border-emerald-400">
              <div className="flex gap-x-12">
                <p
                  id="proAll"
                  className="text-sm font-bold cursor-pointer h-7 border-b-4 border-emerald-400"
                  onClick={() => {
                    proHandler("proAll");
                    setAllPro(false);
                    setNewPro(true);
                  }}
                >
                  New Projects
                  <span className="text-red-400 ">
                    <Badge
                      badgeContent={requestProjects?.length}
                      color="secondary"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <Playlist fontSize="small" className="-mt-1 mr-1" />
                    </Badge>
                  </span>
                </p>
                <p
                  id="proNew"
                  className="text-sm font-bold cursor-pointer h-7"
                  onClick={() => {
                    proHandler("proNew");
                    setAllPro(true);
                    setNewPro(false);
                  }}
                >
                  All Projects{" "}
                  <span className="text-emerald-500 ">
                    <Badge
                      badgeContent={accepteProjects?.length}
                      color="secondary"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <Playlist fontSize="small" className="-mt-1 mr-1" />
                    </Badge>
                  </span>
                </p>
              </div>
            </div>
            {newPro && requestProjects && (
              <div className="border border-emerald-400 w-[1300px] h-[450px]">
                <div className="w-[100%] h-[430px] overflow-y-scroll">
                  {requestProjects.map((pro, j) => {
                    return (
                      <div key={pro._id} className="">
                        <div
                          key={pro._id}
                          className="flex gap-x-2 bg-emerald-300  w-[100%] h-[410px]"
                        >
                          <div key={j} className="mx-1 bg-white h-48">
                            <video
                              src={require(`./../../iotUploads/${pro.projects[0].video.path}`)}
                              controls
                              className="w-56 h-44"
                            />
                            <p className="text-xs font-bold">
                              Title : <span className="">{pro.title}</span>
                            </p>
                            <div className="w-56 bg-white">
                              <p className="text-xs font-bold mt-2 mx-1">
                                Acknowledgment
                              </p>
                              <p className="text-xs mt-2 h-44 w-56 overflow-y-scroll">
                                {pro.ack}
                              </p>
                            </div>
                          </div>
                          {/* ############################## description ############################### */}
                          <div className="bg-white w-64 h-[400px]">
                            <p className="text-xs mx-2 font-semibold">
                              {format(pro.times)}
                            </p>
                            <p className="text-xs font-bold pt-3 px-1">
                              Descriptions of the project
                            </p>
                            <p className="text-xs text-ellipsis px-1 overflow-scroll h-[360px] w-64">
                              {pro.projects[0].description}
                            </p>
                          </div>
                          {/* ####################################### teams ################################## */}
                          <div className="bg-white w-64 h-[400px] overflow-y-scroll">
                            <p className="text-sm font-bold mx-1 w-52">
                              Team Name :{" "}
                              <span className="text-sm font-bold text-gray-600">
                                {pro.projects[0].teamName}
                              </span>
                            </p>
                            <p className="text-xs font-bold mt-1 pl-1">
                              Team Members
                            </p>
                            {pro.teams.map((team, i) => {
                              return (
                                <div key={i} className=" w-48 ml-2 mt-2">
                                  <img
                                    src={require(`./../../iotUploads/${team.path}`)}
                                    alt={team.name}
                                    className="h-20 w-20 mx-14 mt-6 rounded-full border-2 border-emerald-400"
                                  />
                                  <p className="text-xs w-44 mt-2 mx-2 font-extrabold">
                                    {team.name}{" "}
                                    <span className="font-semibold">
                                      {team.workStatus}
                                    </span>
                                  </p>
                                  <div className="">
                                    <Phone className="p-1 text-emerald-400" />
                                    <span className="text-xs bg-emerald-400 text-white rounded-sm px-1 py-[1px]">
                                      {team.phone}
                                    </span>
                                  </div>
                                  <div className="">
                                    <Email className="p-1 text-emerald-400 " />
                                    <span className="text-xs mt-[2px] bg-emerald-400 rounded-sm py-[1px] px-[2px] text-white">
                                      {team.email}
                                    </span>
                                  </div>
                                  <p className="text-xs my-1 mx-4">
                                    --------------------------------
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          {/* ############################################ material ############################### */}
                          <div className="bg-white w-64 h-[400px] ">
                            <p className="text-xs font-bold mx-1 my-1">
                              Materials
                            </p>
                            <div className=" h-[400px] pt-3 px-1 w-[245px]">
                              <div className=" text-xs font-bold px-1 bg-emerald-400 text-white py-2 flex gap-x-4 w-[245px]">
                                <p className="">No.</p>
                                <p className="">Material</p>
                                <p className="">Cheap Name</p>
                                <p className="">Amount</p>
                              </div>
                              <div className=" bg-white h-[333px]  w-[245px] overflow-y-scroll border border-emerald-500 border-t-0">
                                {pro.materials.map((mat, i) => {
                                  return (
                                    <div key={i} className="flex  mt-3 text-xs">
                                      <p className="text-xs pl-1 h-5 font-bold w-6">
                                        {i + 1}.
                                      </p>
                                      <img
                                        src={require(`./../../iotUploads/${mat.path}`)}
                                        alt={mat.name}
                                        className="w-10 h-5 rounded-md ml-[24px]"
                                      />
                                      <p className="text-xs font-semibold h-5 ml-[26px] w-24">
                                        {mat.name}
                                      </p>
                                      <p className="text-xs font-bold ml-7 h-5 w-6">
                                        {mat.amount}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                          {/* ############################################ next projects ########################## */}
                          <div className="bg-white w-64 h-[400px]">
                            <div className="flex ml-[84px] -mt-2">
                              <div
                                onClick={() => {
                                  newProjectAcceptHandler(pro._id);
                                }}
                                className="flex gap-1 mx-1 my-4 h-7 rounded-md cursor-pointer border border-emerald-500 bg-gray-100 hover:bg-gray-200"
                              >
                                <Accept
                                  fontSize="small"
                                  className="text-emerald-400 font-semibold my-[3px]"
                                />
                                <button className="text-emerald-400 text-sm px-1">
                                  Accept
                                </button>
                              </div>
                              <div
                                onClick={() => {
                                  newProjectDeleteHandler(pro._id);
                                }}
                                className="flex gap-1 mx-1 my-4 h-7 rounded-md cursor-pointer border border-pink-500 bg-gray-100 hover:bg-gray-200"
                              >
                                <Delete
                                  fontSize="small"
                                  className="text-pink-500 font-semibold my-[3px]"
                                />
                                <button className="text-pink-500 text-sm px-1">
                                  Reject
                                </button>
                              </div>
                            </div>
                            <p className="text-xs font-bold -mt-3 ml-1">
                              Next Projects
                            </p>
                            {pro.feutureProjects[0].title !== undefined &&
                              pro.feutureProjects.map((feu, i) => {
                                return (
                                  <div key={i}>
                                    <p className="text-xs font-bold my-1 mx-1">
                                      {feu.title}
                                    </p>
                                    <img
                                      src={require(`./../../iotUploads/${feu.path}`)}
                                      alt="aa"
                                      className="mx-1 mt-2 w-[248px] h-36"
                                    />
                                    <p className="text-xs mt-2 mx-2 overflow-scroll h-[170px] w-[250px]">
                                      {feu.description}
                                    </p>
                                  </div>
                                );
                              })}
                            {pro.feutureProjects[0].title === undefined && (
                              <div>
                                <p>{pro.feutureProjects[0]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm h-2 px-1 my-2">
                          ###########################################################################################################################################################
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* ######################################################## ALL PROJECTS ######################### */}
            {allPro && accepteProjects && (
              <div className=" border border-emerald-400 w-[1300px] h-[450px]">
                <div className="w-[100%] h-[430px] overflow-y-scroll">
                  {accepteProjects.map((pro, j) => {
                    return (
                      <div key={pro._id} className="">
                        <div
                          key={pro._id}
                          className="flex gap-x-2 bg-emerald-300  w-[100%] h-[410px]"
                        >
                          <div key={j} className="mx-1 bg-white h-48">
                            <video
                              src={require(`./../../iotUploads/${pro.projects[0].video.path}`)}
                              controls
                              className="w-56 h-44"
                            />
                            <p className="text-xs font-bold">
                              Title : <span className="">{pro.title}</span>
                            </p>
                            <div className="w-56 bg-white">
                              <p className="text-xs font-bold mt-2 mx-1">
                                Acknowledgment
                              </p>
                              <p className="text-xs mt-2 h-44 w-56 overflow-y-scroll">
                                {pro.ack}
                              </p>
                            </div>
                          </div>
                          {/* ############################## description ############################### */}
                          <div className="bg-white w-64 h-[400px]">
                            <p className="text-xs mx-2 font-semibold">
                              {format(pro.times)}
                            </p>
                            <p className="text-xs font-bold pt-3 px-1">
                              Descriptions of the project
                            </p>
                            <p className="text-xs text-ellipsis px-1 overflow-scroll h-[360px] w-64">
                              {pro.projects[0].description}
                            </p>
                          </div>
                          {/* ####################################### teams ################################## */}
                          <div className="bg-white w-64 h-[400px] overflow-y-scroll">
                            <p className="text-xs font-bold mt-1 pl-1">
                              Team Members
                            </p>
                            {pro.teams.map((team, i) => {
                              return (
                                <div key={i} className=" w-48 ml-2 mt-2">
                                  <img
                                    src={require(`./../../iotUploads/${team.path}`)}
                                    alt={team.name}
                                    className="h-20 w-20 mx-14 mt-6 rounded-full border-2 border-emerald-400"
                                  />
                                  <p className="text-xs w-44 mt-2 mx-2 font-extrabold">
                                    {team.name}{" "}
                                    <span className="font-semibold">
                                      {team.workStatus}
                                    </span>
                                  </p>
                                  <div className="">
                                    <Phone className="p-1 text-emerald-400" />
                                    <span className="text-xs bg-emerald-400 text-white rounded-sm px-1 py-[1px]">
                                      {team.phone}
                                    </span>
                                  </div>
                                  <div className="">
                                    <Email className="p-1 text-emerald-400 " />
                                    <span className="text-xs mt-[2px] bg-emerald-400 rounded-sm py-[1px] px-[2px] text-white">
                                      {team.email}
                                    </span>
                                  </div>
                                  <p className="text-xs my-1 mx-4">
                                    --------------------------------
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          {/* ############################################ material ############################### */}
                          <div className="bg-white w-64 h-[400px] ">
                            <p className="text-xs font-bold mx-1 my-1">
                              Materials
                            </p>
                            <div className=" h-[400px] pt-3 px-1 w-[245px]">
                              <div className=" text-xs font-bold px-1 bg-emerald-400 text-white py-2 flex gap-x-4 w-[245px]">
                                <p className="">No.</p>
                                <p className="">Material</p>
                                <p className="">Cheap Name</p>
                                <p className="">Amount</p>
                              </div>
                              <div className=" bg-white h-[333px]  w-[245px] overflow-y-scroll border border-emerald-500 border-t-0">
                                {pro.materials.map((mat, i) => {
                                  return (
                                    <div key={i} className="flex  mt-3 text-xs">
                                      <p className="text-xs pl-1 h-5 font-bold w-6">
                                        {i + 1}.
                                      </p>
                                      <img
                                        src={require(`./../../iotUploads/${mat.path}`)}
                                        alt={mat.name}
                                        className="w-10 h-5 rounded-md ml-[24px]"
                                      />
                                      <p className="text-xs font-semibold h-5 ml-[26px] w-24">
                                        {mat.name}
                                      </p>
                                      <p className="text-xs font-bold ml-7 h-5 w-6">
                                        {mat.amount}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                          {/* ############################################ next projects ########################## */}
                          <div className="bg-white w-64 h-[400px]">
                            <div className="flex ml-[84px] -mt-2">
                              <div
                                onClick={() =>
                                  previousProjectDeleteHandler(pro._id)
                                }
                                className="flex gap-1 mx-1 my-4 h-7 ml-[90px] rounded-md cursor-pointer border border-pink-500 bg-gray-100 hover:bg-gray-200"
                              >
                                <Delete
                                  fontSize="small"
                                  className="text-pink-500 font-semibold my-[3px]"
                                />
                                <button className="text-pink-500 text-sm px-1">
                                  Remove
                                </button>
                              </div>
                            </div>
                            <p className="text-xs font-bold -mt-3 ml-1">
                              Next Projects
                            </p>
                            {pro.feutureProjects[0].title !== undefined &&
                              pro.feutureProjects.map((feu, i) => {
                                return (
                                  <div key={i}>
                                    <p className="text-xs font-bold my-1 mx-1">
                                      {feu.title}
                                    </p>
                                    <img
                                      src={require(`./../../iotUploads/${feu.path}`)}
                                      alt="aa"
                                      className="mx-1 mt-2 w-[248px] h-36"
                                    />
                                    <p className="text-xs mt-2 mx-2 overflow-scroll h-[170px] w-[250px]">
                                      {feu.description}
                                    </p>
                                  </div>
                                );
                              })}
                            {pro.feutureProjects[0].title === undefined && (
                              <div>
                                <p>{pro.feutureProjects[0]}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm h-2 px-1 my-2">
                          ###########################################################################################################################################################
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ####################################### APPLY ####################################### */}
        {apply && (
          <div className="flex flex-col mt-8 h-[400px] items-center w-[500px] border bg-gray-200 border-emerald-400">
            <div className="flex gap-x-4">
              <p
                id="req"
                className="font-bold mt-3 h-8 text-sm cursor-pointer border-b-4 border-emerald-400"
                onClick={() => {
                  setAccepted(false);
                  setRequested(true);
                  applyClickHandler("req");
                }}
              >
                New Requests{" "}
                <span className="text-red-400 ">
                  <Badge
                    color="secondary"
                    badgeContent={applyRequest?.length}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Playlist fontSize="small" className="-mt-1 mr-1" />
                  </Badge>
                </span>
              </p>
              <p
                id="acc"
                className="font-bold mt-3 ml-10 text-sm cursor-pointer h-8"
                onClick={() => {
                  setAccepted(true);
                  setRequested(false);
                  applyClickHandler("acc");
                }}
              >
                Accepted Students{" "}
                <span className="text-emerald-400 ">
                  <Badge
                    color="secondary"
                    badgeContent={applyAccept?.length}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Playlist fontSize="small" className="-mt-1 mr-1" />
                  </Badge>
                </span>
              </p>
            </div>
            {/* ############################# Accepted students ############################# */}
            {requested && applyRequest && (
              <div className="mt-5 px-4 h-[400px] w-[500px] overflow-y-scroll bg-white border border-emerald-400">
                {applyRequest.map((app) => {
                  return (
                    <div key={app._id} className="">
                      <div className="flex justify-between relative">
                        <div className=" pt-4 relative">
                          <p className="text-sm font-bold">
                            full name :{" "}
                            <span className="ml-1 font-normal">
                              {app.firstName} {app.lastName}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            email :{" "}
                            <span className="ml-1 font-normal">
                              {app.email}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            gender :{" "}
                            <span className="ml-1 font-normal">
                              {app.gender}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            campus name :{" "}
                            <span className="ml-1 font-normal">
                              {app.campusName}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            year :{" "}
                            <span className="ml-1 font-normal">{app.year}</span>
                          </p>
                          <p className="text-sm font-bold">
                            department :{" "}
                            <span className="ml-1 font-normal">
                              {app.department}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            description :{" "}
                            <span className="ml-1 font-normal">
                              {app.description}{" "}
                            </span>
                          </p>
                          <div className="flex gap-x-2 relative">
                            <p className="font-bold  mt-2">
                              Apparent letter:-{" "}
                            </p>
                            <img
                              src={require(`./../../iotUploads/${app.letter[0].path}`)}
                              alt="dd"
                              className="border border-emerald-400 mt-1 w-10 h-8 ml-36 absolute hover:w-[600px] hover:h-[500px] hover:-mt-60 hover:-ml-1 hover:absolute hover:z-10"
                            />
                          </div>
                          <div className="absolute top-1 left-72 flex gap-1">
                            <div
                              onClick={() => {
                                setRejectPopUp(true);
                                setRejectId(app._id);
                              }}
                              className="flex gap-1 mx-1 my-4 h-7 rounded-md cursor-pointer border border-pink-500 bg-gray-100 hover:bg-gray-200"
                            >
                              <Delete
                                fontSize="small"
                                className="text-pink-500 my-[3px]"
                              />
                              <button className="text-pink-500 text-sm px-1">
                                Reject
                              </button>
                            </div>
                            <div
                              onClick={() => {
                                //setAcceptPopUp(true);
                                acceptApparenFromRequesttHandler(app._id);
                              }}
                              className="flex gap-1 mx-1 my-4 h-7 rounded-md cursor-pointer border border-emerald-500 bg-gray-100 hover:bg-gray-200"
                            >
                              <Accept
                                fontSize="small"
                                className="text-emerald-500 my-[3px]"
                              />
                              <button className="text-emerald-500 text-sm px-1">
                                Accept
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs mt-6 mx-2">
                        ----------------------------------------------------------------------------------------
                      </p>
                    </div>
                  );
                })}
                {rejectPopUp && (
                  <div className="absolute z-10 bg-white border shadow-2xl shadow-black border border-gray-400 rounded-sm h-44 mx-20 top-[44%] w-80">
                    <ArrowBack
                      className="text-gray-500 hover:bg-gray-200 p-1"
                      onClick={() => setRejectPopUp(false)}
                    />
                    <p className="text-xs font-semibold text-gray-500 mx-6">
                      SIR the student must know the reason why you reject
                      his/her request
                    </p>
                    <textarea
                      onChange={(e) => {
                        setRejectText(e.target.value);
                        const ids = document.getElementById("reason");
                        if (ids.value.trim().length <= 20) {
                          setRejectReason(true);
                        } else {
                          setRejectReason(false);
                        }
                      }}
                      name=""
                      id="reason"
                      cols="40"
                      rows="4"
                      className="mx-6 mt-1 text-gray-500 focus:outline-none border border-gray-300 pl-2 text-xs"
                      placeholder="please enter your reason"
                    ></textarea>
                    {rejectReason && (
                      <div className="absolute z-10 -mt-10 bg-red-400 shadow-lg shadow-black text-white h-7 py-1 px-2 ml-[50px] rounded-md text-xs">
                        <div className="h-3 w-3 -mt-[11px] bg-red-400 text-black absolute rotate-45"></div>
                        reason must be greater than 20 character
                      </div>
                    )}
                    <button
                      onClick={() => {
                        const ids = document.getElementById("reason");
                        if (ids.value.trim().length <= 20) {
                          setRejectReason(true);
                        } else {
                          deleteApparentFromRequestHandler(rejectText);
                        }
                      }}
                      className="bg-pink-500 text-white text-xs mx-6 hover:bg-pink-400 py-1 w-[267px] mt-2"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* #################################### NEW request ################################ */}
            {accepted && applyAccept && (
              <div className="mt-5 px-4 h-[400px] w-[500px] overflow-y-scroll bg-white border border-emerald-400">
                {applyAccept.map((app) => {
                  return (
                    <div key={app._id} className="">
                      <div className="flex justify-between relative">
                        <div className=" pt-4 relative">
                          <p className="text-sm font-bold">
                            full name :{" "}
                            <span className="ml-1 font-normal">
                              {app.firstName} {app.lastName}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            email :{" "}
                            <span className="ml-1 font-normal">
                              {app.email}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            gender :{" "}
                            <span className="ml-1 font-normal">
                              {app.gender}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            campus name :{" "}
                            <span className="ml-1 font-normal">
                              {app.campusName}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            year :{" "}
                            <span className="ml-1 font-normal">{app.year}</span>
                          </p>
                          <p className="text-sm font-bold">
                            department :{" "}
                            <span className="ml-1 font-normal">
                              {app.department}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            description :{" "}
                            <span className="ml-1 font-normal">
                              {app.description}{" "}
                            </span>
                          </p>
                          <div className="flex gap-x-2 relative">
                            <p className="font-bold  mt-2">
                              Apparent letter:-{" "}
                            </p>
                            <img
                              src={require(`./../../iotUploads/${app.letter[0].path}`)}
                              alt="dd"
                              className="border border-emerald-400 mt-1 w-10 h-8 ml-36 absolute hover:w-[600px] hover:h-[500px] hover:-mt-60 hover:-ml-1 hover:absolute hover:z-10"
                            />
                          </div>
                          <div className="absolute top-1 left-80 flex gap-1">
                            <div
                              onClick={() =>
                                deleteApparentFromAccepted(app._id)
                              }
                              className="flex gap-1 mx-1 my-4 h-7 rounded-md cursor-pointer border border-pink-500 bg-gray-100 hover:bg-gray-200"
                            >
                              <Delete
                                fontSize="small"
                                className="text-pink-500 my-[3px]"
                              />
                              <button className="text-pink-500 text-sm px-1">
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs mt-6 mx-2">
                        ----------------------------------------------------------------------------------------
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {/* ####################################### CHAT ######################################## */}
        {chat && (
          <div className="w-[500px] h-[450px] mt-4">
            <div className="bg-gray-200 h-10 flex border border-emerald-400 border-b-0 gap-x-6 text-sm items-center justify-center">
              <p
                className="h-7 border-b-4 border-emerald-400 cursor-pointer"
                id="allu"
                onClick={() => {
                  setAllUsers(true);
                  setNewUsers(false);
                  setYourChat(false);
                  const ids = document.getElementById("allu");
                  ids.classList.add("border-b-4", "border-emerald-400");
                  const idds = document.getElementById("newu");
                  idds.classList.remove("border-b-4", "border-emerald-400");
                  const iddd = document.getElementById("yourchat");
                  iddd.classList.remove("border-b-4", "border-emerald-400");
                }}
              >
                All Users{" "}
                <span className="text-emerald-400 ">
                  <Badge
                    badgeContent={users?.length}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Playlist fontSize="small" className="-mt-1 mr-1" />
                  </Badge>
                </span>
              </p>
              <p
                className="h-7 cursor-pointer"
                id="newu"
                onClick={() => {
                  setAllUsers(false);
                  setNewUsers(true);
                  setYourChat(false);
                  const ids = document.getElementById("newu");
                  ids.classList.add("border-b-4", "border-emerald-400");
                  const idds = document.getElementById("allu");
                  idds.classList.remove("border-b-4", "border-emerald-400");
                  const iddd = document.getElementById("yourchat");
                  iddd.classList.remove("border-b-4", "border-emerald-400");
                }}
              >
                All Groups{" "}
                <span className="text-emerald-400 ">
                  <Badge
                    badgeContent={groups?.length}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Playlist fontSize="small" className="-mt-1 mr-1" />
                  </Badge>
                </span>
              </p>
              <p
                className="h-7 cursor-pointer"
                id="yourchat"
                onClick={() => {
                  setAllUsers(false);
                  setNewUsers(false);
                  setYourChat(true);
                  const ids = document.getElementById("yourchat");
                  ids.classList.add("border-b-4", "border-emerald-400");
                  const idds = document.getElementById("newu");
                  idds.classList.remove("border-b-4", "border-emerald-400");
                  const iddd = document.getElementById("allu");
                  iddd.classList.remove("border-b-4", "border-emerald-400");
                }}
              >
                Your Account
              </p>
            </div>
            <div className="  h-[410px] border border-emerald-400 w-[500px] overflow-y-scroll">
              {allUsers && users && (
                <div className="px-2">
                  {users.map((user) => {
                    return (
                      <div className="mt-2" key={user._id}>
                        <div className="flex relative">
                          <div className="ml-10">
                            <p className="text-xs font-bold">
                              user name :{" "}
                              <span className="ml-1 font-normal">
                                {user.fullName}
                              </span>
                            </p>
                            <p className="text-xs font-bold">
                              email :{" "}
                              <span className="ml-2 font-normal">
                                {user.email}
                              </span>
                            </p>
                            <div className="flex gap-x-4 relative">
                              <p className="text-xs mt-2 font-bold">
                                profile pic :{" "}
                              </p>
                              <img
                                src={require(`./../../iotUploads/${user.profilePic[0].path}`)}
                                alt="as"
                                className="h-7 w-7 mt-1 ml-20 absolute hover:-mt-5 rounded-full hover:h-20 hover:w-20"
                              />
                            </div>
                          </div>
                          <div
                            onClick={() => userDeleteHandler(user._id)}
                            className="flex absolute right-0 gap-1 ml-32 h-7 rounded-md cursor-pointer border border-pink-500 bg-gray-100 hover:bg-gray-200"
                          >
                            <Delete
                              fontSize="small"
                              className="text-pink-500 font-semibold my-[3px]"
                            />
                            <button className="text-pink-500 text-sm px-1">
                              Remove
                            </button>
                          </div>
                        </div>
                        <p className="mx-1">
                          -------------------------------------------------------------------------
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
              {newUsers && groups && (
                <div className="">
                  {groups.map((group) => {
                    return (
                      <div key={group._id} className="mt-2">
                        <div className="flex relative">
                          <div className="ml-6">
                            <p className="text-xs font-bold">
                              group name :{" "}
                              <span className="ml-1 font-normal">
                                {group.groupName}
                              </span>
                            </p>
                            <p className="text-xs font-bold">
                              group admin :{" "}
                              <span className="ml-2 font-normal">
                                {group.ownersName}
                              </span>
                            </p>
                            <p className="text-xs font-bold">
                              number of group members :{" "}
                              <span className="ml-2 font-normal">
                                {group.members.length}
                              </span>
                            </p>
                            <div className="flex gap-x-4 relative">
                              <p className="text-xs mt-2 font-bold">
                                group profile :{"  "}
                              </p>
                              <img
                                src={require(`./../../iotUploads/${group.groupPro[0].path}`)}
                                alt="as"
                                className="h-7 w-7 mt-1 ml-24 absolute hover:-mt-5 rounded-full hover:h-20 hover:w-20"
                              />
                            </div>
                          </div>
                          <div className="flex absolute right-0 my-1 h-14 w-[164px]">
                            <div
                              onClick={() => groupDeleteHandler(group._id)}
                              className="flex gap-1 mx-1 h-7 rounded-md cursor-pointer border border-pink-500 bg-gray-100 hover:bg-gray-200"
                            >
                              <Delete
                                fontSize="small"
                                className="text-pink-500 font-semibold my-[3px]"
                              />
                              <button className="text-pink-500 text-sm px-1">
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="mx-2">
                          --------------------------------------------------------------------------
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
              {yourChat && (
                <div>
                  {adminAccountCreate && (
                    <div className="flex flex-col items-center justify-center my-10 relative">
                      <p className="text-sm font-extrabold text-gray-500">
                        Create Account To Chat With Students
                      </p>
                      <input
                        required
                        onChange={(e) => setAdminName(e.target.value)}
                        type="text"
                        className="text-xs focus:outline-none w-[270px] border border-gray-300 bg-gray-100 px-2 h-7 mt-6"
                        placeholder="your account name"
                      />
                      <input
                        required
                        onChange={(e) => setAdminEmail(e.target.value)}
                        type="text"
                        className="text-xs focus:outline-none w-[270px] border border-gray-300 bg-gray-100 px-2 h-7 mt-1"
                        placeholder="your email"
                      />
                      <input
                        required
                        onChange={(e) => setAdminPassword(e.target.value)}
                        type="text"
                        className="text-xs focus:outline-none w-[270px] border border-gray-300 bg-gray-100 px-2 h-7 mt-1"
                        placeholder="your password"
                      />
                      <input
                        required={true}
                        onChange={(e) => setAdminProfile(e.target.files[0])}
                        type="file"
                        name="profilePic"
                        id=""
                        className="w-[270px] bg-blue-400 text-sm h-8  absolute top-[140px] opacity-0"
                      />
                      <p className="w-[270px] mt-1 h-8 pt-1 text-gray-500 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300">
                        <span>
                          <PortraitOutlined className="" />
                        </span>
                        <span className="ml-2">
                          enter your profile picture{" "}
                        </span>
                      </p>
                      <button
                        type="submit"
                        onClick={adminAccountCreateHandler}
                        className="bg-emerald-500 hover:bg-emerald-400 mt-3 py-2 text-xs font-bold w-[270px] text-white"
                      >
                        Create Account
                      </button>
                      {/* <button
                        onClick={() => {
                          adminAccountEditHandler();
                          setAdminAccountEdit(true);
                          setAdminAccountCreate(false);
                        }}
                        className="bg-gray-300 mt-3 py-2 text-xs border border-gray-400 hover:bg-gray-200 font-bold w-[270px] text-black"
                      >
                        Edit Account
                      </button> */}
                    </div>
                  )}
                  {adminAccountEdit && (
                    <div className="flex flex-col relative items-center justify-center">
                      <ArrowBack
                        className="absolute top-1 left-1 hover:bg-gray-200 text-gray-500"
                        onClick={() => {
                          setAdminAccountCreate(true);
                          setAdminAccountEdit(false);
                        }}
                      />
                      <div className="flex flex-col">
                        <input
                          required
                          //onChange={(e) => setAdminNameEdit(e.target.value)}
                          type="text"
                          className="text-xs focus:outline-none w-[270px] border border-gray-300 bg-gray-100 px-2 h-7 mt-6"
                          placeholder="new account name"
                        />
                        <input
                          required
                          //onChange={(e) => setAdminEmailEdit(e.target.value)}
                          type="text"
                          className="text-xs focus:outline-none w-[270px] border border-gray-300 bg-gray-100 px-2 h-7 mt-1"
                          placeholder="new email"
                        />
                        <input
                          required
                          //onChange={(e) => setAdminPasswordEdit(e.target.value)}
                          type="text"
                          className="text-xs focus:outline-none w-[270px] border border-gray-300 bg-gray-100 px-2 h-7 mt-1"
                          placeholder="new password"
                        />
                        <button
                          onClick={() => {}}
                          className="bg-gray-300 mt-3 py-2 text-xs border border-gray-400 hover:bg-gray-200 font-bold w-[270px] text-black"
                        >
                          Update
                        </button>
                        <input
                          required={true}
                          // onChange={(e) =>
                          //   //setAdminProfileEdit(e.target.files[0])
                          // }
                          type="file"
                          name="profilePic"
                          id=""
                          className="w-[270px] bg-blue-400 text-sm h-8  absolute top-[200px] opacity-0"
                        />
                        <p className="w-[270px] mt-9 h-8 pt-1 text-gray-500 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300">
                          <span>
                            <PortraitOutlined className="" />
                          </span>
                          <span className="ml-2">
                            enter new profile picture{" "}
                          </span>
                        </p>
                        <button
                          onClick={() => {}}
                          className="bg-gray-300 mt-3 py-2 text-xs border border-gray-400 hover:bg-gray-200 font-bold w-[270px] text-black"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
