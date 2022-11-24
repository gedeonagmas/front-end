import React, { useState } from "react";
import Phone from "@mui/icons-material/Phone";
import Close from "@mui/icons-material/Close";
import { format } from "timeago.js";
import "./sty.css";
import { useRef } from "react";
import West from "@mui/icons-material/West";
//import To from "@mui/icons-material/PanToolAlt";
import To from "@mui/icons-material/ArrowCircleRight";
import Email from "@mui/icons-material/Email";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetAllAcceptedProjectsQuery,
  useNewProjectPostMutation,
  useMaterialPostMutation,
  useTeamPostMutation,
  useFeuturePostMutation,
} from "./../../features/api/apiSlice";
import { useEffect } from "react";
//toast.confiqure();
const Project = () => {
  const {
    data,
    isFetching: isFetchingProject,
    isError: isErrorProject,
  } = useGetAllAcceptedProjectsQuery();
  const [projectData, setProjectData] = useState();
  let projectDataLet;
  if (data) {
    projectDataLet = data;
  }
  const [videoContainer, setVideoContainer] = useState("");
  useEffect(() => {
    setProjectData(projectDataLet);
  }, [projectDataLet]);
  const [newProjectPostData] = useNewProjectPostMutation();
  const [feuturesPostData] = useFeuturePostMutation();
  const [materialPostData] = useMaterialPostMutation();
  const [teamPostData] = useTeamPostMutation();
  //##################################################################
  const [projectInformation, setProjectInformation] = useState([]);
  const [fullNameWarning, setFullNameWarning] = useState(false);
  const [workStatusWarning, setWorkStatusWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [phoneWarning, setPhoneWarning] = useState(false);
  const [teamImageWarning, setTeamImageWarning] = useState(false);
  const [back, setBack] = useState(false);

  const [materialNameWarning, setMaterialNameWarning] = useState(false);
  const [materialAmountWarning, setMaterialAmountWarning] = useState(false);
  const [materialImageWarning, setMaterialImageWarning] = useState(false);

  const [projectTitleWarning, setProjectTitleWarning] = useState(false);
  const [projectTeamNameWarning, setProjectTeamNameWarning] = useState(false);
  const [projectObjectiveWarning, setProjectObjectiveWarning] = useState(false);
  const [projectVideoWarning, setProjectVideoWarning] = useState(false);
  const [ackWarning, setAckWarning] = useState(false);
  const [materialWarning, setMaterialWarning] = useState(false);
  const [teamWarning, setTeamWarning] = useState(false);
  const [successfull, setSuccessfull] = useState(false);

  const [feautureDescriptionWarning, setFeautureDescriptionWarning] =
    useState(false);
  const [feutureTitleWarning, setFeutureTitleWarning] = useState(false);
  const [feutureImageWarning, setFeutureImageWarning] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [purpose, setPurpose] = useState(true);
  const [teams, setTeams] = useState(false);
  const [materials, setMaterials] = useState(false);
  // const [suggestion, setSuggestion] = useState(false);
  const [contact, setContact] = useState(false);
  const [description, setDescription] = useState(false);
  const [addVideo, setAddVideo] = useState(false);
  const smallReference = useRef(null);
  const bigReference = useRef(null);

  const [videoGrid, setVideoGrid] = useState(true);
  const [materialName, setMaterialName] = useState("");
  const [materialAmount, setMaterialAmount] = useState("");
  const [materialImage, setMaterialImage] = useState("");
  const [dates, setDates] = useState([]);
  const [dateNow, setDateNow] = useState([]);
  const [workStatus, setWorkStatus] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [teamImage, setTeamImage] = useState("");
  //const [dd, setDd] = useState({});
  const [feutureTitle, setFeutureTitle] = useState("");
  const [feautureDescription, setFeutureDescription] = useState("");
  const [feutureImage, setFeutureImage] = useState("");
  const [ack, setAck] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectObjective, setProjectObjective] = useState("");
  const [projectVideo, setProjectVideo] = useState("");
  const [fCounter, setFcounter] = useState(0);
  const [mCounter, setMcounter] = useState(0);
  const [tCounter, setTcounter] = useState(0);
  const [flag, setFlag] = useState("false");
  //#################################### clear all input fields handler #########################
  const clearHandler = (ids) => {
    ids.map((e) => {
      const idd = document.getElementById(e);
      idd.value = "";
      return true;
    });
  };
  //################################### upload #################################
  //########################################   axios material post ###############################

  const clickMaterialsHandler = async () => {
    if (
      materialName !== "" &&
      materialAmount !== "" &&
      materialImage !== undefined
    ) {
      const fd = new FormData();
      fd.append("name", materialName);
      fd.append("amount", materialAmount);
      fd.append("mat", materialImage);
      fd.append("fileName", `${dates}materials`);
      materialPostData(fd);
      setMcounter(mCounter + 1);
      setMaterialName("");
      setMaterialAmount("");
      setMaterialImage("");
      clearHandler(["matName", "matAmount", "matImage"]);
    } else {
      validator(
        [materialName, materialAmount, materialImage],
        [
          setMaterialNameWarning,
          setMaterialAmountWarning,
          setMaterialImageWarning,
        ]
      );
      return;
    }
  };
  //###############################################################################################

  const clickTeamsHandler = async () => {
    if (
      fullName.trim() !== "" &&
      workStatus.trim() !== "" &&
      phone.trim() !== "" &&
      email.trim() !== "" &&
      teamImage !== undefined
    ) {
      const fd = new FormData();
      fd.append("fullName", fullName);
      fd.append("workStatus", workStatus);
      fd.append("phone", phone);
      fd.append("email", email);
      fd.append("tms", teamImage);
      fd.append("fileName", `${dates}teams`);
      teamPostData(fd);
      setTcounter(tCounter + 1);
      setFullName("");
      setWorkStatus("");
      setPhone("");
      setEmail("");
      setTeamImage("");
      clearHandler([
        "teamName",
        "teamWork",
        "teamPhone",
        "teamEmail",
        "teamImage",
      ]);
    } else {
      validator(
        [fullName, workStatus, phone, email, teamImage],
        [
          setFullNameWarning,
          setWorkStatusWarning,
          setPhoneWarning,
          setEmailWarning,
          setTeamImageWarning,
        ]
      );
      return;
    }
  };
  //#################################################################################################
  //########################################   render warning handler ###########################
  const renderd = (text) => {
    return (
      <div className="absolute z-10 bg-red-400 shadow-lg shadow-black text-white h-7 py-1 px-2 ml-[50px] rounded-md text-xs">
        <div className="h-3 w-3 -mt-[11px] bg-red-400 text-black absolute rotate-45"></div>
        {text}
      </div>
    );
  };
  //#################################### input validate handler ############################
  const validator = (val, booleans) => {
    val.map((e, i) => {
      if (typeof e === "string" && e.trim() === "") {
        console.log("please enter", i);
        booleans[i](true);
      } else if (e === undefined || e === 0) {
        console.log("please enter", i);
        booleans[i](true);
      } else {
        booleans[i](false);
      }
      return true;
    });
  };
  //########################################### feuture post handler ######################
  const clickFeuturesHandler = async (e) => {
    if (
      feutureTitle.trim() !== "" &&
      feautureDescription.trim() !== "" &&
      feutureImage !== undefined
    ) {
      setFlag("true");
      const fd = new FormData();
      fd.append("title", feutureTitle);
      fd.append("description", feautureDescription);
      fd.append("feu", feutureImage);
      fd.append("fileName", `${dates}feutures`);
      feuturesPostData(fd);
      setFcounter(fCounter + 1);
      setFeutureTitle("");
      setFeutureDescription("");
      setFeutureImage("");
      clearHandler(["feuTitle", "feuObjective", "feuImage"]);
    } else {
      validator(
        [feutureTitle, feautureDescription, feutureImage],
        [
          setFeutureTitleWarning,
          setFeautureDescriptionWarning,
          setFeutureImageWarning,
        ]
      );
      return;
    }
  };
  //###############################################################################################
  //######################################### all project information handler #####################
  const informationPostHandler = async () => {
    if (
      teamName.trim() !== "" &&
      projectTitle.trim() !== "" &&
      projectObjective.trim() !== "" &&
      projectVideo !== undefined &&
      ack.trim() !== "" &&
      mCounter !== 0 &&
      tCounter !== 0
    ) {
      const fd = new FormData();
      fd.append("proTitle", projectTitle);
      fd.append("proDescription", projectObjective);
      fd.append("vid", projectVideo);
      fd.append("accept", false);
      fd.append("time", dates);
      fd.append("times", dateNow);
      fd.append("flag", flag);
      fd.append("teamName", teamName);
      fd.append("ack", ack);
      newProjectPostData(fd);
      setFlag("false");
      setTcounter(0);
      setFcounter(0);
      setMcounter(0);
      setProjectTitle("");
      setProjectObjective("");
      setProjectVideo("");
      setTeamName("");
      setAddVideo(false);
      clearHandler([
        "teamNames",
        "ack",
        "feuTitle",
        "feuObjective",
        "feuImage",
        "matName",
        "matAmount",
        "matImage",
        "teamName",
        "teamWork",
        "teamPhone",
        "teamEmail",
        "teamImage",
        "title",
        "objective",
        "video",
      ]);
      setSuccessfull(true);
      setTimeout(() => {
        setSuccessfull(false);
      }, 6000);
    } else {
      validator(
        [projectTitle, projectObjective, projectVideo, ack, teamName],
        [
          setProjectTitleWarning,
          setProjectObjectiveWarning,
          setProjectVideoWarning,
          setAckWarning,
          setProjectTeamNameWarning,
        ]
      );
      mCounter > 0 && setMaterialWarning(false);
      mCounter === 0 && setMaterialWarning(true);
      tCounter > 0 && setTeamWarning(false);
      tCounter === 0 && setTeamWarning(true);
      setTimeout(() => {
        setMaterialWarning(false);
        setTeamWarning(false);
      }, 3000);
      return;
    }
  };
  //###############################################################################################
  //###############################################################################################
  const videoHandler = (val) => {
    setPurpose(true);
    setVideoContainer(val);
    setDescription(true);
    setVideoGrid(false);
  };
  const opHandler = (val) => {
    if (val) {
      const ids = document.getElementById("oo");
      ids?.classList.add("bg-opacity-50");
    } else {
      const ids = document.getElementById("oo");
      ids?.classList.remove("bg-opacity-50");
    }
  };
  const borderHandler = (val) => {
    const arr = ["pur", "tea", "mat", "sug", "fea"];
    for (let i = 0; i < arr.length; i++) {
      if (val === arr[i]) {
        const ids = document.getElementById(arr[i]);
        ids?.classList.add("border-b-4", "border-emerald-400");
      } else {
        const ids = document.getElementById(arr[i]);
        ids?.classList.remove("border-b-4", "border-emerald-400");
      }
    }
  };
  //################################## video information handler ############################
  const projectInformationHandler = (pro) => {
    setProjectInformation(pro);
  };
  // const teamsCommentHandler = (val) => {
  //   //send comment for all team members througn email logic will be put in here
  //   console.log(val, "current team");
  // };
  //#################### project search handler #########################
  const projectSearchHandler = (val) => {
    projectDataLet = data.filter((d) =>
      d.title.toLowerCase().includes(val.toLowerCase())
    );
    setProjectData(projectDataLet);
  };
  //##########################################################################
  //############################### DOM ######################################
  return (
    <div className="flex mt-14">
      <div className="flex"></div>
      {/*######################################################################################
             ###################################### VIDEO SCREEN ################################### */}
      <div className="flex flex-col flex-[50%] h-screen bg-white relative">
        {back && (
          <West
            className="text-gray-500 font-extrabold absolute w-10 right-0 cursor-pointer rounded-md hover:bg-gray-200 my-1"
            onClick={() => {
              setDescription(false);
              setVideoGrid(true);
              data && setProjectData(data);
              setBack(false);
            }}
          />
        )}
        <div className="h-[85vh] w-[108vh] bg-black ml-10 mt-[26px]">
          <div className="object-cover">
            <video
              loop
              src={videoContainer}
              autoPlay
              ref={bigReference}
              controls
              className="object-cover h-[85vh] w-[108vh]"
            />
          </div>
        </div>
      </div>
      {/*######################################################################################
             ###################################### VIDEO LISTS ################################### */}
      {videoGrid && (
        <div className="flex flex-col flex-[50%] bg-white h-screen items-center my-6">
          <p className="text-xl font-extrabold text-gray-500">
            well come to our project page
          </p>
          <p className="text-sm font-semibold mt-1">
            click each video to deep dive
          </p>
          {successfull && (
            <p className="absolute top-16 font-bold right-4 px-2 py-2 border-2 border-emerald-400 text-emerald-400 bg-white">
              successfull! your project will be post ones the admin aproves it
            </p>
          )}
          <input
            onChange={(e) => {
              projectSearchHandler(e.target.value);
            }}
            type="text"
            name=""
            id=""
            className="px-2 py-1 text-sm text-gray-500 mr-2 w-[602px] focus:outline-none rounded-sm mt-4 border border-dotted border-emerald-400"
            placeholder="Search projects"
          />
          {/*############################################################################################
              ###################################### VIDEO LISTS CONTAINER ##############################*/}
          <div className="flex">
            <div
              id="ooo"
              className="overflow-y-scroll grid grid-cols-3 bg-white  h-[344px] w-[629px] mx-6 my-6 px-2"
            >
              {projectData &&
                projectData.map((pro) => {
                  return (
                    <div
                      key={pro._id}
                      className="h-40 w-[200px] bg-black ml-[2px] mt-2 flex flex-col items-center justify-center"
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        id="aa"
                        ref={smallReference}
                        onClick={() => {
                          projectInformationHandler(pro);
                          videoHandler(
                            require(`./../../iotUploads/${pro.projects[0].video.path}`)
                          );
                          setAddVideo(false);
                          setBack(true);
                        }}
                        src={require(`./../../iotUploads/${pro.projects[0].video.path}`)}
                        className="h-36 w-[200px] cursor-pointer"
                      />
                      <p className="text-xs text-white mx-2 cursor-pointer">
                        {pro.title}
                      </p>
                      <p className="text-xs text-white">{format(pro.times)}</p>
                    </div>
                  );
                })}
              {isFetchingProject && (
                <div className="text-xl text-gray-500 font-semibold h-[344px] w-[600px] flex flex-col items-center justify-center">
                  Loading...
                </div>
              )}
              {isErrorProject && (
                <div className="text-xl text-gray-500 font-semibold h-[344px] w-[600px] flex flex-col items-center justify-center">
                  something went wrong.
                </div>
              )}
              {projectData && projectData.length === 0 && (
                <div className="text-xl text-gray-500 font-semibold h-[344px] w-[600px] flex flex-col items-center justify-center">
                  Projects Not Found!
                </div>
              )}
            </div>
          </div>

          <div className="">
            <div className="flex gap-x-1">
              <p className="text-sm font-semibold mt-1">
                you can even post your own project. just click the button{" "}
                <span>
                  <To className="text-emerald-400" />
                </span>
              </p>
              <button
                className="px-4 py-[2px] font-bold w-56 text-white text-sm bg-emerald-400"
                onClick={() => {
                  setAddVideo(true);
                  setDates(new Date().toISOString().replace(/:/g, "-"));
                  setDateNow(Date.now());
                  console.log(new Date().toISOString().replace(/:/g, "-"));
                  console.log(Date.now());
                  opHandler(true);
                }}
              >
                add new project
              </button>
            </div>
          </div>
        </div>
      )}
      {/*######################################################################################
             ###################################### ADD NEW PROJECTS ################################### */}
      {addVideo && (
        <div id="blur" className="">
          <div className="absolute py-5  right-0 h-auto w-[405px]   bg-white  shadow-2xl shadow-black  top-5 pt-10">
            <div className="flex justify-between">
              <p className="font-extrabold text-sm my-1 ml-6 text-gray-600 my-3">
                PROJECT INFORMATIONS
              </p>
              <Close
                className="text-gray-500 hover:text-black font-extrabold w-10 cursor-pointer mt-1 hover:bg-gray-200"
                onClick={() => {
                  clearHandler([
                    "teamNames",
                    "ack",
                    "feuTitle",
                    "feuObjective",
                    "feuImage",
                    "matName",
                    "matAmount",
                    "matImage",
                    "teamName",
                    "teamWork",
                    "teamPhone",
                    "teamEmail",
                    "teamImage",
                    "title",
                    "objective",
                    "video",
                  ]);
                  setAddVideo(false);
                  opHandler(false);
                }}
              />
            </div>

            <div className="relative w-[405px] h-[85vh] overflow-y-scroll">
              <input
                onChange={(e) => {
                  if (e.target.value.trim().length > 0) {
                    setProjectTeamNameWarning(false);
                  } else {
                    setProjectTeamNameWarning(true);
                  }
                  setTeamName(e.target.value);
                }}
                id="teamNames"
                type="text"
                placeholder="Team Name"
                className="text-xs mt-1 w-[350px] mx-6 p-1  border border-dotted border-emerald-400 focus:outline-none"
              />
              {projectTeamNameWarning && (
                <div className="ml-32">{renderd("Please Enter Team Name")}</div>
              )}
              <input
                onChange={(e) => {
                  if (e.target.value.trim().length > 0) {
                    setProjectTitleWarning(false);
                  } else {
                    setProjectTitleWarning(true);
                  }
                  setProjectTitle(e.target.value);
                }}
                id="title"
                type="text"
                placeholder="Title of the project"
                className="text-xs mt-1 w-[350px] mx-6 p-1  border border-dotted border-emerald-400 focus:outline-none"
              />
              {projectTitleWarning && renderd("Please Enter Project Title")}
              <textarea
                onChange={(e) => {
                  if (e.target.value.trim().length > 0) {
                    setProjectObjectiveWarning(false);
                  } else {
                    setProjectObjectiveWarning(true);
                  }
                  setProjectObjective(e.target.value);
                }}
                name="objective"
                id="objective"
                cols="50"
                rows="4"
                placeholder="Objective of the Project"
                className="mx-6 p-1 mt-2 text-xs text-gray-600 focus:outline-none border border-dotted border-emerald-400"
              ></textarea>
              {projectObjectiveWarning && (
                <div className="absolute -mt-7 ml-10 w-64">
                  {renderd("Please Enter Project Objective")}
                </div>
              )}
              <div className="relative mx-6 border-b border-dotted border-emerald-400 w-[352px] h-14">
                <input
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setProjectVideoWarning(false);
                    } else {
                      setProjectVideoWarning(true);
                    }
                    setProjectVideo(e.target.files[0]);
                  }}
                  type="file"
                  name="vid"
                  id="video"
                  placeholder="teams picture"
                  className="text-xs absolute opacity-0 w-[352px] bg-red-300 text-white mt-1 h-6 border border-dotted border-emerald-400 focus:outline-none"
                />
                <p className="text-xs pl-28 bg-emerald-300 w-[352px] mt-1  h-6 p-1 text-white">
                  choose project video here
                </p>
                {projectVideoWarning && renderd("Please Enter Project Video")}
              </div>
              <div className="flex flex-col p-2 mt-2">
                <div className="flex justify-between">
                  <p className="text-xs font-bold px-2 pt-1 mx-2 my-1">
                    Add Your Team Memebers
                  </p>
                  <p className="text-xs font-bold mt-[6px] mr-4 ml-2 text-gray-400">
                    You Added{" "}
                    <span className="text-red-500 font-extrabold">
                      {tCounter}{" "}
                    </span>
                    Team memebers
                  </p>
                </div>

                <div className="flex flex-col">
                  <input
                    onChange={(e) => {
                      if (e.target.value.trim().length > 0) {
                        setFullNameWarning(false);
                      } else {
                        setFullNameWarning(true);
                      }
                      setFullName(e.target.value);
                    }}
                    id="teamName"
                    type="text"
                    placeholder="team member full name"
                    className="text-xs mt-1 mx-4 p-1  border border-dotted border-emerald-400 focus:outline-none"
                  />
                  {fullNameWarning && (
                    <div className="ml-20">
                      {renderd("Please Enter Full Name")}
                    </div>
                  )}

                  <input
                    onChange={(e) => {
                      if (e.target.value.trim().length > 0) {
                        setWorkStatusWarning(false);
                      } else {
                        setWorkStatusWarning(true);
                      }
                      setWorkStatus(e.target.value);
                    }}
                    id="teamWork"
                    type="text"
                    placeholder="team member work status"
                    className="text-xs mt-2 mx-4 p-1  border border-dotted border-emerald-400 focus:outline-none"
                  />
                  {workStatusWarning && (
                    <div className="ml-14">
                      {renderd("Please Enter Work Status")}
                    </div>
                  )}
                  <input
                    onChange={(e) => {
                      if (e.target.value.trim().length > 0) {
                        setPhoneWarning(false);
                      } else {
                        setPhoneWarning(true);
                      }
                      setPhone(e.target.value);
                    }}
                    type="text"
                    id="teamPhone"
                    placeholder="team member phone number"
                    className="text-xs mt-2 mx-4 p-1  border border-dotted border-emerald-400 focus:outline-none"
                  />
                  {phoneWarning && (
                    <div className="ml-24">
                      {renderd("Please Enter Phone Number")}
                    </div>
                  )}
                  <input
                    onChange={(e) => {
                      if (e.target.value.trim().length > 0) {
                        setEmailWarning(false);
                      } else {
                        setEmailWarning(true);
                      }
                      setEmail(e.target.value);
                    }}
                    type="text"
                    id="teamEmail"
                    placeholder="team member email account"
                    className="text-xs mt-2 mx-4 p-1  border border-dotted border-emerald-400 focus:outline-none"
                  />
                  {emailWarning && (
                    <div className="ml-20">{renderd("Please Enter Email")}</div>
                  )}
                  <div className="flex gap-2 border-b border-dotted  border-emerald-400 h-16 mx-4 border-spacing-10">
                    <div className="relative">
                      <input
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setTeamImageWarning(false);
                          } else {
                            setTeamImageWarning(true);
                          }
                          setTeamImage(e.target.files[0]);
                        }}
                        type="file"
                        name="tms"
                        id="teamImage"
                        placeholder="teams picture"
                        className="text-xs absolute opacity-0 w-[182px] bg-red-300 text-white mt-2 h-6 border border-dotted border-emerald-400 focus:outline-none"
                      />
                      <p className="text-xs px-1 bg-emerald-300 w-[182px] mt-2  h-6 p-1 text-white">
                        choose project team image
                      </p>
                    </div>

                    <button
                      type="submit"
                      onClick={() => {
                        clickTeamsHandler();
                      }}
                      className=" bg-emerald-300 mt-2 ml-1 w-44 text-xs h-6 py-[2px] text-white"
                    >
                      add member
                    </button>
                    {teamImageWarning && (
                      <div className="mt-8 -ml-96">
                        {renderd("Please Enter Teams Photo")}
                      </div>
                    )}
                  </div>
                  {teamWarning && (
                    <div className="-mt-2 ml-4">
                      {renderd("Please Add At Least One Member")}
                    </div>
                  )}
                </div>

                <div className="  mx-4 mt-5">
                  <div className="flex justify-between">
                    <p className="text-xs font-bold my-1">
                      Input Your Materials
                    </p>
                    <p className="text-xs font-bold mt-[6px] mr-2  ml-2  text-gray-400">
                      You Added{" "}
                      <span className="text-red-400 font-extrabold">
                        {mCounter}{" "}
                      </span>
                      Materials
                    </p>
                  </div>
                  <div className="flex gap-2 ">
                    <input
                      onChange={(e) => {
                        if (e.target.value.trim().length > 0) {
                          setMaterialNameWarning(false);
                        } else {
                          setMaterialNameWarning(true);
                        }

                        setMaterialName(e.target.value);
                      }}
                      type="text"
                      id="matName"
                      name="cheap"
                      className="text-xs pl-2 mt-1 text-gray-600 w-[182px] h-6 border border-dotted border-emerald-400 focus:outline-none"
                      placeholder="Cheap or Tool name"
                    />
                    {materialNameWarning && (
                      <div className="absolute mt-7 -ml-2 w-52">
                        {renderd("Please Enter Cheap or Tool Name")}
                      </div>
                    )}
                    <input
                      onChange={(e) => {
                        if (e.target.value.trim().length > 0) {
                          setMaterialAmountWarning(false);
                        } else {
                          setMaterialAmountWarning(true);
                        }
                        setMaterialAmount(e.target.value);
                      }}
                      type="text"
                      name="amount"
                      id="matAmount"
                      className="text-xs pl-2 mt-1 text-gray-600 h-6 w-[159px]  ml-1 border border-dotted border-emerald-400 focus:outline-none"
                      placeholder="amount"
                    />
                    {materialAmountWarning && (
                      <div className="absolute mt-7 ml-40 w-48">
                        {renderd("Please Enter Amount")}
                      </div>
                    )}
                  </div>
                  <div className="flex h-16 gap-2 border-b border-dotted  border-emerald-400">
                    <div className="relative">
                      <input
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setMaterialImageWarning(false);
                          } else {
                            setMaterialImageWarning(true);
                          }
                          setMaterialImage(e.target.files[0]);
                        }}
                        type="file"
                        name="mat"
                        id="matImage"
                        placeholder="teams picture"
                        className="text-xs absolute opacity-0 w-[182px] bg-red-300 text-white mt-2 h-6 border border-dotted border-emerald-400 focus:outline-none"
                      />
                      <p className="text-xs px-1 bg-emerald-300 w-[182px] mt-2  h-6 p-1 text-white">
                        choose your material or tool image
                      </p>
                      {materialImageWarning && (
                        <div className="absolute mt-1 -ml-10 w-52">
                          {renderd("Please Enter Cheap Image")}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      onClick={() => {
                        clickMaterialsHandler();
                      }}
                      className="px-1 bg-emerald-300 mt-2 ml-1  text-xs h-6 w-44 py-[2px] text-white"
                    >
                      add cheap
                    </button>
                  </div>
                  {materialWarning &&
                    renderd("Please Add At Least One Material")}
                </div>

                <div className="mt-5 ">
                  <div className="flex justify-between">
                    <p className="text-xs font-bold mx-4 my-1">
                      Feuture Projects
                    </p>
                    <p className="text-xs font-bold mt-[6px] mr-4 ml-2 text-gray-400">
                      You Added{" "}
                      <span className="text-red-400 font-extrabold">
                        {fCounter}{" "}
                      </span>
                      Feuture Projects
                    </p>
                  </div>
                  <input
                    onChange={(e) => {
                      if (e.target.value.trim().length > 0) {
                        setFeutureTitleWarning(false);
                      } else {
                        setFeutureTitleWarning(true);
                      }
                      setFeutureTitle(e.target.value);
                    }}
                    type="text"
                    id="feuTitle"
                    placeholder="Title of feuture project"
                    className="text-xs mt-2 mx-4 p-1  border w-[353px] border-dotted border-emerald-400 focus:outline-none"
                  />
                  {feutureTitleWarning && renderd("Please Enter Title")}
                  <textarea
                    onChange={(e) => {
                      if (e.target.value.trim().length > 0) {
                        setFeautureDescriptionWarning(false);
                      } else {
                        setFeautureDescriptionWarning(true);
                      }
                      setFeutureDescription(e.target.value);
                    }}
                    name="objective"
                    id="feuObjective"
                    cols="50"
                    rows="4"
                    placeholder="Description of feuture Project"
                    className="px-2 py-1 text-xs mx-4 mt-1 text-gray-600 focus:outline-none border border-dotted border-emerald-400"
                  ></textarea>
                  {feautureDescriptionWarning && (
                    <div className="absolute -mt-10 w-52">
                      {renderd("Please Enter Description")}
                    </div>
                  )}

                  <div className="flex gap-2 mx-4 border-b border-dotted  border-emerald-400 h-16">
                    <div className="relative">
                      <input
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setFeutureImageWarning(false);
                          } else {
                            setFeutureImageWarning(true);
                          }
                          setFeutureImage(e.target.files[0]);
                        }}
                        type="file"
                        name="feu"
                        id="feuImage"
                        placeholder="teams picture"
                        className="text-xs absolute opacity-0 w-[182px] bg-red-300 text-white mt-2 h-6 border border-dotted border-emerald-400 focus:outline-none"
                      />
                      <p className="text-xs px-1 bg-emerald-300 w-[182px] mt-2  h-6 p-1 text-white">
                        choose feuture project image
                      </p>
                      {feutureImageWarning && renderd("Please Enter Photo")}
                    </div>
                    <button
                      type="submit"
                      onClick={() => {
                        clickFeuturesHandler();
                      }}
                      className="px-1 bg-emerald-300 mt-2 ml-1 w-44 text-xs h-6 py-[2px] text-white"
                    >
                      add feuture project
                    </button>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-xs my-1 mx-4 font-bold">Acknowledgment</p>
                  <textarea
                    onChange={(e) => {
                      if (e.target.value.trim().length > 0) {
                        setAckWarning(false);
                      } else {
                        setAckWarning(true);
                      }
                      setAck(e.target.value);
                    }}
                    name="objective"
                    id="ack"
                    cols="50"
                    rows="4"
                    placeholder="Acknowledgment"
                    className="px-2 py-1 text-xs mx-4 mt-1 text-gray-600 focus:outline-none border border-dotted border-emerald-400"
                  ></textarea>
                  {ackWarning && renderd("Please Enter Acknowledgment")}
                </div>
                <button
                  onClick={() => {
                    informationPostHandler();
                    //setAddVideo(false);
                  }}
                  className="px-12 text-white font-bold py-1 bg-emerald-400 mt-3 mx-4 hover:bg-emerald-500"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*######################################################################################
             ###################################### VIDEO HEADER ################################### */}
      {description && projectInformation && (
        <div className="bg-white h-screen flex flex-col flex-[50%]">
          <div className="flex gap-4 mx-16 h-10 text-sm font-semibold w-[85vh] my-8 py-1 px-2">
            <p
              id="pur"
              className="cursor-pointer h-7 pb-2 border-b-4 border-emerald-400"
              onClick={() => {
                borderHandler("pur");
                setPurpose(true);
                setTeams(false);
                setMaterials(false);
                //setSuggestion(false);
                setContact(false);
              }}
            >
              purpose
            </p>
            <p
              id="tea"
              className="cursor-pointer h-7 pb-3"
              onClick={() => {
                borderHandler("tea");
                setPurpose(false);
                setTeams(true);
                setMaterials(false);
                //setSuggestion(false);
                setContact(false);
              }}
            >
              teams
            </p>
            <p
              id="mat"
              className="cursor-pointer h-7 pb-3"
              onClick={() => {
                borderHandler("mat");
                setPurpose(false);
                setTeams(false);
                setMaterials(true);
                //setSuggestion(false);
                setContact(false);
              }}
            >
              materials
            </p>
            <p
              id="fea"
              className="cursor-pointer h-7 pb-3"
              onClick={() => {
                borderHandler("fea");
                setPurpose(false);
                setTeams(false);
                setMaterials(false);
                //setSuggestion(false);
                setContact(true);
              }}
            >
              next projects
            </p>
            {/* <p
              id="sug"
              className="cursor-pointer h-7 pb-3"
              onClick={() => {
                borderHandler("sug");
                setPurpose(false);
                setTeams(false);
                setMaterials(false);
                setSuggestion(true);
                setContact(false);
              }}
            >
              comment us
            </p> */}
          </div>
          {/*######################################################################################
             ###################################### PURPOSE ################################### */}
          {purpose && projectInformation && (
            <div className="mx-16 my-20">
              <p className="font-bold text-lg">{projectInformation.title}</p>
              <p className="my-4 w-[550px] text-sm h-52 overflow-y-scroll">
                {projectInformation.projects[0].description}
              </p>
              <div className="flex gap-2 mt-10">
                <div className="px-4 w-[260px] h-3 bg-emerald-400 text-white"></div>
                <div className="w-3 h-3 rotate-45 bg-emerald-400 text-white"></div>
                <div className="px-4 w-[260px] h-3 bg-emerald-400 text-white"></div>
              </div>
            </div>
          )}
          {/*######################################################################################
             ###################################### TEAMS ################################### */}
          {teams && projectInformation && (
            <div className="mx-14 my-10 text-gray-800">
              <p className="font-bold text-lg">
                Team Name :{" "}
                <span className="text-gray-600">
                  {projectInformation.projects[0].teamName}
                </span>
              </p>
              <div className="grid grid-cols-3 overflow-y-scroll w-[85vh] h-52">
                {projectInformation.teams.map((team) => {
                  return (
                    <div className=" w-48 ml-2 mt-2">
                      <img
                        src={require(`./../../iotUploads/${team.path}`)}
                        alt={team.name}
                        className="h-20 w-20 mx-14 mt-6 rounded-full border-2 border-emerald-400"
                      />
                      <p className="text-xs w-44 mt-2 mx-2 font-extrabold">
                        {team.name}{" "}
                        <span className="font-semibold">{team.workStatus}</span>
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
                    </div>
                  );
                })}
              </div>
              <p className="font-bold mt-10 text-emerald-400">Aknowledgment</p>
              <p className="text-xs w-[85vh]">{projectInformation.ack}</p>
            </div>
          )}
          {/*######################################################################################
             ###################################### MATERIALS ################################### */}
          {materials && projectInformation && (
            <div className="mx-16 mt-2">
              <p className="font-bold text-lg my-4">
                For This Project We Use The Following Materials
              </p>
              <div className=" h-[400px] py-2 px-2 w-[400px]">
                <div className=" text-sm font-bold mt-4 px-1 bg-emerald-400 text-white py-2 flex justify-between w-[88vh]">
                  <p className="">No.</p>
                  <p className="">Material</p>
                  <p className="">Cheap Name</p>
                  <p className="">Amount</p>
                </div>
                <div className=" bg-white h-64 overflow-y-scroll w-[88vh] border border-emerald-500 border-t-0">
                  {projectInformation.materials.map((mat, i) => {
                    return (
                      <div className="flex justify-between mt-3">
                        <p className="text-xs pl-1 h-5 font-bold w-6">
                          {i + 1}
                        </p>
                        <img
                          src={require(`./../../iotUploads/${mat.path}`)}
                          alt={mat.name}
                          className="w-10 h-5 rounded-md"
                        />
                        <p className="text-sm font-semibold h-5 w-24">
                          {mat.name}
                        </p>
                        <p className="text-xs font-bold h-5 mr-1 w-6">
                          {mat.amount}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2 mt-6 w-[95vh]">
                  <To className="text-emerald-400" />
                  <p className="text-xs   py-[2px] ">
                    All the materials are provided by{" "}
                    <span className="font-bold text-xs ">
                      Debre Tabour university information technology
                      laboratory(IOT)
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          )}
          {/*######################################################################################
             ###################################### SUGGESTIONS ################################### */}
          {/* {suggestion && (
            <div>
              <p className=" text-sm mx-16 w-80 ">
                write your comment or suggestion here
              </p>
              <div className="flex flex-col w-80 mx-16  mt-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="pl-2 text-xs text-gray-400 py-1 focus:outline-none rounded-sm border border-dotted border-emerald-400"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="pl-2 text-xs mt-2 text-gray-400 py-1 focus:outline-none rounded-sm border border-dotted border-emerald-400"
                />
                <textarea
                  name="texts"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Your Advice"
                  className="text-xs text-gray-400 pl-2 mt-2 focus:outline-none border border-dotted border-emerald-400"
                ></textarea>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() =>
                      teamsCommentHandler(projectInformation.teams)
                    }
                    className="text-sm bg-emerald-400 text-white font-bold px-36 py-1"
                  >
                    Send
                  </button>
                </div>
              </div>
              <div className="flex gap-2 mt-3 mx-16">
                <To className="text-emerald-400" />
                <p className="text-xs mt-1">
                  we realy thank you for commenting us!!!
                </p>
              </div>
            </div>
          )} */}
          {/*######################################################################################
             ###################################### FEUTURE PROJECTS ################################### */}
          {contact &&
            projectInformation &&
            projectInformation.feutureProjects[0].title !== undefined && (
              <div className="mx-16 border-sky-200">
                <p className="text-sm font-semibold mt-4">
                  {projectInformation.feutureProjects[0].title}
                </p>
                <div className="flex gap-x-4  my-6 ">
                  <img
                    src={require(`./../../iotUploads/${projectInformation.feutureProjects[0].path}`)}
                    alt="feuture project"
                    className="mt-2 h-56 w-44"
                  />
                  <p className="w-[400px] text-sm">
                    {projectInformation.feutureProjects[0].description}
                  </p>
                </div>
                <p className="text-3xl mx-40 font-extrabold my-5 text-emerald-400">
                  Many Thanks!!!
                </p>
              </div>
            )}
          {contact &&
            projectInformation.feutureProjects[0].title === undefined && (
              <div className="mx-16 border-sky-200 flex flex-col justify-center items-center">
                <p className="text-lg text-gray-500 font-bold mt-10">
                  For The Movement We Dont Have Feuture Projects
                </p>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Project;
