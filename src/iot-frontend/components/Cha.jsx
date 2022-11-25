import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Search from "@mui/icons-material/Search";
import { io } from "socket.io-client";
// import Folder from "@mui/icons-material/Folder";
// import Emoji from "@mui/icons-material/EmojiEmotions";
import Back from "@mui/icons-material/ArrowBack";
import Close from "@mui/icons-material/Close";
import FilePresent from "@mui/icons-material/FilePresent";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import "./sty.css";
import Add from "@mui/icons-material/Add";
import Login from "./chats/home page/Login";
import PortraitOutlined from "@mui/icons-material/Groups";
import Done from "@mui/icons-material/Done";
import QuestionMark from "@mui/icons-material/QuestionMark";
import Badge from "@mui/material/Badge";
import { format } from "timeago.js";
import {
  useChatGetAllUsersQuery,
  useChatGetAllGroupsQuery,
  useChatCreateGroupMutation,
} from "./../../features/api/apiSlice";

const Cha = ({ currentUser }) => {
  const [userData, setUserData] = useState([]);
  const {
    data: allUsersData,
    isFetching: isFetchingUser,
    isError: isErrorUser,
  } = useChatGetAllUsersQuery();
  let userDataLet;
  if (allUsersData) {
    userDataLet = allUsersData;
  }
  useEffect(() => {
    setUserData(userDataLet);
  }, [userDataLet]);

  const userSearchHandler = (val) => {
    userDataLet = allUsersData.filter((u) =>
      u.userName.toLowerCase().includes(val.toLowerCase())
    );
    setUserData(userDataLet);
  };

  //######################## group search handler ###################
  const [groupsData, setGroupsData] = useState([]);
  const {
    data: allGroupsDatas,
    isFetching: isFetchingGroup,
    isError: isErrorGroup,
  } = useChatGetAllGroupsQuery();
  const [groupDataValues] = useChatCreateGroupMutation();
  let groupDataLet;
  if (allGroupsDatas) {
    groupDataLet = allGroupsDatas;
  }
  useEffect(() => {
    setGroupsData(groupDataLet);
  }, [groupDataLet]);
  const searchGroupHandler = (val) => {
    groupDataLet = allGroupsDatas.filter((g) =>
      g.groupName.toLowerCase().includes(val.toLowerCase())
    );
    setGroupsData(groupDataLet);
  };
  //#################################################################
  const [writeMessage, setWriteMessage] = useState(false);
  const [please, setPlease] = useState(false);
  const [wellCome, setWellCome] = useState(true);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  // const [groupMembers, setGroupMembers] = useState(null);
  const [back, setBack] = useState(true);
  const [usersToBeAddedContainer, setUsersToBeAddedContainer] = useState(false);
  const [usersToBeAddedData, setUsersToBeAddedData] = useState(null);
  const [newRequestContainer, setNewRequestContainer] = useState(false);
  const [onlyAddAndRemoveContainer, setOnlyAddAndRemoveContainer] =
    useState(false);
  const [newRequestData, setNewRequestData] = useState(null);
  const [addAndRemove, setAddAndRemove] = useState(null);
  const [addAndRemoveContainer, setAddAndRemoveContainer] = useState(false);
  const [ownGroupList, setOwnGroupList] = useState(false);
  const [ownGroupData, setOwnGroupData] = useState(null);
  const [ownGroupContainer, setOwnGroupContainer] = useState(false);
  const [manageGroup, setManageGroup] = useState(false);
  const [manageGroupText, setManageGroupText] = useState(false);
  const [joinHope, setJoinHope] = useState(false);
  const [singleGroupData, setSingleGroupData] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [joinFlag, setJoinFlag] = useState(false);
  const [groupProfile, setGroupProfile] = useState("");
  const [fileSendFlag, setFileSendFlag] = useState(false);
  const [fileDescription, setFileDescription] = useState("");
  const [files, setFiles] = useState("");
  const [chatPage, setChatPage] = useState(true);
  const [login, setLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [texts, setTexts] = useState("");
  const [socket, setSocket] = useState(null);
  // const [allUsers, setAllUsers] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [more, setMore] = useState(false);
  const [groupForm, setGroupForm] = useState(false);
  // const [groupData, setGroupData] = useState(null);
  const [firstIds, setFirstId] = useState(null);
  const [secondIds, setSecondId] = useState(null);
  const [groupIds, setGroupIds] = useState(null);
  // const [lastId, setLastId] = useState(null);
  const [noRequest, setNoRequest] = useState(false);
  // const [currentGroupName, setCurrentGroupName] = useState(null);
  // const [otherUser, setOtherUser] = useState(null);
  const [sayHi, setSayHi] = useState(false);
  // const fetchAllDataHandler = async () => {
  //   const data = await axios.get(`http://localhost:2200/get/all/users`);
  //   setAllUsers(data.data);
  // };
  // const groupGetHandler = async () => {
  //   const data = await axios.get("http://localhost:2200/get/group/data");
  //   setGroupData(data.data);
  //   if (data.request.status === 200) {
  //     socket?.emit("sen dddd", data.data);
  //     socket?.on("rec dddd", (val) => {
  //       setGroupData(val);
  //     });
  //   }
  // };

  useEffect(() => {
    //groupGetHandler();
    // const func = async () => {
    //   if (groupIds) {
    //     const data1 = await axios.get(
    //       `http://localhost:2200/get/single/group?ids=${groupIds}`
    //     );
    //     socket?.emit("ff1", data1.data[0].members.length);
    //     socket?.on("ff2", (val) => {
    //       setGroupMembers(val);
    //     });
    //   }
    // };
    // func();
  }, []);

  // useEffect(() => {
  //   fetchAllDataHandler();
  // }, []);
  useEffect(() => {
    setSocket(io("https://iot-back-end.onrender.com"));
  }, []);

  useEffect(() => {
    socket?.emit("com", currentUser[0].userName);
    socket?.on("aaa", (val) => {
      setOnlineUsers(val);
    });
  }, [socket, currentUser]);
  const dataSenderHandler = (messages, rooms) => {
    socket?.emit("aa", messages, rooms);
    socket?.on("bb", (text) => {
      setTexts(text);
    });
  };
  //############################################## file delete handler #####################################
  const fileDeleteHandler = async () => {
    await axios.delete(`https://iot-back-end.onrender.com/delete/file?ids=${chatId}`);
    setFileSendFlag(false);
    setFiles("");
    setFileDescription("");
  };
  //############################################## message send patch handler ##############################
  const patchHandler = async (data) => {
    if (data) {
      const da = await axios.patch(
        `https://iot-back-end.onrender.com/update/private/chat?ids=${data.chatId}`,
        {
          chatOwners: data.chatOwners,
          chatId: data.chatId,
          messages: [
            ...data.messages,
            {
              messageType: "text",
              content: message,
              time: new Date().toISOString(),
              sender: currentUser[0].userName,
              image: currentUser[0].profilePic[0].path,
            },
          ],
          chatType: data.chatType,
        }
      );
      if (da.request.status === 200) {
        const data2 = await axios.get(
          `https://iot-back-end.onrender.com/get/private/chat?ids=${chatId}`
        );
        setTexts(data2.data[0].messages);
        dataSenderHandler(data2.data[0].messages, data2.data[0].chatId);
      }
    }
    setMessage("");
  };

  //############################################## messege send handler ####################################
  const [typing, setTyping] = useState(false);
  const messageSendHandler = async () => {
    const data2 = await axios.get(
      `https://iot-back-end.onrender.com/get/private/chat?ids=${chatId}`
    );
    if (data2.request.status === 201) {
      patchHandler(data2.data[0]);
    }
    socket?.emit("typing f", false, chatId);
    socket?.on("typing false", (bool) => {
      setTyping(bool);
    });
  };
  //######################################## scroll to last message handler ################################

  const refer = useRef(null);
  useEffect(() => {
    refer.current?.scrollIntoView();
  }, [texts]);
  useEffect(() => {
    refer.current?.scrollIntoView();
  }, [typing]);
  //###################################### typing handler ###############################################
  const typingHandler = (e) => {
    if (e.target.value.length > 0) {
      socket?.emit("typing t", true, chatId);
      socket?.on("typing true", (bool) => {
        setTyping(bool);
      });
    } else {
      socket?.emit("typing f", false, chatId);
      socket?.on("typing false", (bool) => {
        setTyping(bool);
      });
    }
  };
  //############################################ creat room handler helper ###################################
  const createRoomHandlerHelper = async (elId, elName, types) => {
    const data = await axios.post("https://iot-back-end.onrender.com/create/private/chat", {
      chatOwners: `${currentUser[0].userName} and ${elName}`,
      chatId: elId,
      messages: {
        messageType: "text",
        content: "",
        time: new Date().toISOString(),
        sender: currentUser[0].userName,
        image: currentUser[0].profilePic[0].path,
      },
      chatType: types,
    });
    if (data.request.status === 201) {
      const data1 = await axios.get(
        `https://iot-back-end.onrender.com/get/private/chat?ids=${elId}`
      );
      if (data1.data.length !== 0) {
        if (data1.data[0].messages.length < 2) {
          setSayHi(true);
        } else {
          setSayHi(false);
        }
        setTexts(data1.data[0].messages);
        setChatId(data1.data[0].chatId);
        dataSenderHandler(data1.data[0].messages, data1.data[0].chatId);
      }
    }
  };
  //############################################## create room handler #######################################
  const createRoomHandler = async (firstId, secondId, elName, type) => {
    setFirstId(firstId);
    setSecondId(secondId);
    const data1 = await axios.get(
      `https://iot-back-end.onrender.com/get/private/chat?ids=${firstId}`
    );
    if (data1.data.length === 0) {
      const data2 = await axios.get(
        `https://iot-back-end.onrender.com/get/private/chat?ids=${secondId}`
      );
      if (data2.data.length === 0) {
        createRoomHandlerHelper(firstId, elName, type);
      } else {
        if (data2.data[0].messages.length < 2) {
          setSayHi(true);
        } else {
          setSayHi(false);
        }
        setTexts(data2.data[0].messages);
        setChatId(data2.data[0].chatId);
        dataSenderHandler(data2.data[0].messages, data2.data[0].chatId);
      }
    } else {
      if (data1.data[0].messages.length < 2) {
        setSayHi(true);
      } else {
        setSayHi(false);
      }
      setTexts(data1.data[0].messages);
      dataSenderHandler(data1.data[0].messages, data1.data[0].chatId);
      setChatId(data1.data[0].chatId);
    }
  };
  //############################### private underline handler ###############################
  const underlineHandler = async (val) => {
    const data = await axios.get(`https://iot-back-end.onrender.com/get/all/users`);
    let b = [];
    data.data.map((ee, j) => {
      b.push(ee._id);
      if (j === data.data.length - 1) {
        const fu = async () => {
          const data2 = await axios.get("https://iot-back-end.onrender.com/get/group/data");
          data2.data.map((e, i) => {
            b.push(e._id);
            if (i === data2.data.length - 1) {
              b.map((el) => {
                const ids = document.getElementById(el);
                ids?.classList.remove("bg-gray-300");
                if (el === val) {
                  const idd = document.getElementById(val);
                  idd?.classList.add("bg-gray-300");
                }
                return true;
              });
            }
            return true;
          });
        };
        fu();
      }
      return true;
    });
  };
  //############################################## file patch handler ###############################
  const filePatchHandler = async (messageData, fileData) => {
    const data1 = await axios.patch(
      `https://iot-back-end.onrender.com/update/private/chat?ids=${messageData.chatId}`,
      {
        chatOwners: messageData.chatOwners,
        chatId: messageData.chatId,
        messages: [
          ...messageData.messages,
          {
            messageType: fileData.messageType,
            fileDescription: fileData.fileDescription,
            chatId: fileData.chatId,
            fileName: fileData.fileName,
            path: fileData.path,
            sender: fileData.sender,
            size: fileData.size,
            time: fileData.time,
            type: fileData.type,
            image: currentUser[0].profilePic[0].path,
          },
        ],
        chatType: messageData.chatType,
      }
    );
    if (data1.request.status === 200) {
      const data2 = await axios.get(
        `https://iot-back-end.onrender.com/get/private/chat?ids=${chatId}`
      );
      if (data2.data[0].messages.length < 2) {
        setSayHi(true);
      } else {
        setSayHi(false);
      }
      setTexts(data2.data[0].messages);
      dataSenderHandler(data2.data[0].messages, data2.data[0].chatId);
      fileDeleteHandler();
    }
  };
  //############################################## file get handler #################################
  const fileGetHandler = async () => {
    const fileData = await axios.get(
      `https://iot-back-end.onrender.com/get/file?ids=${chatId}`
    );
    if (fileData.data.length !== 0) {
      const data1 = await axios.get(
        `https://iot-back-end.onrender.com/get/private/chat?ids=${firstIds}`
      );
      if (data1.request.status === 201 && data1.data.length !== 0) {
        filePatchHandler(data1.data[0], fileData.data[0]);
      } else {
        const data2 = await axios.get(
          `https://iot-back-end.onrender.com/get/private/chat?ids=${secondIds}`
        );
        if (data2.request.status === 201 && data2.data.length !== 0) {
          filePatchHandler(data2.data[0], fileData.data[0]);
        } else {
          console.log("please first create chat room");
        }
      }
    }
  };
  //############################################# file post handler #################################
  const fileHandler = async () => {
    if (files) {
      const fd = new FormData();
      fd.append("fileUpload", files);
      fd.append("messageType", "file");
      fd.append("fileDescription", fileDescription);
      fd.append("time", new Date().toISOString());
      fd.append("sender", currentUser[0].userName);
      fd.append("chatId", chatId);
      const data = await axios.post("https://iot-back-end.onrender.com/post/file", fd);
      if (data.request.status === 200) {
        fileGetHandler();
      }
    }
  };
  //######################################## group create handler #####################################
  const groupCreateHandler = async () => {
    const fd = new FormData();
    fd.append("groupName", groupName);
    fd.append("flag", "groups");
    fd.append("groupPro", groupProfile);
    fd.append("ownersName", currentUser[0].userName);
    fd.append("ownersId", currentUser[0]._id);
    fd.append("members", currentUser[0]._id);
    fd.append("requests", []);
    groupDataValues(fd);
    setGroupProfile("");
    setGroupName("");
    setGroupForm(false);
    // const data1 = await axios.post(
    //   `http://localhost:2200/post/group`,
    //   {
    //     groupName: groupName,
    //     flag: "groups",
    //     groupPro: groupProfile,
    //     ownersName: currentUser[0].userName,
    //     ownersId: currentUser[0]._id,
    //     members: currentUser[0]._id,
    //     requests: [],
    //   },
    //   {
    //     headers: {
    //       "content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    // if (data1.request.status === 200) {
    //   console.log(data1.data, "group created");
    //   setGroupProfile("");
    //   setGroupName("");
    //   setGroupForm(false);
    //groupGetHandler();
    // }
  };
  //######################################## group room create handler ################################
  const groupJoinHandler = async (groupId, groupName, groups) => {
    const data = await axios.get(
      `https://iot-back-end.onrender.com/get/single/group?ids=${groupId}`
    );
    if (data.data.length !== 0 && data.request.status === 200) {
      setOwnGroupData(data.data);
      setNewRequestData(data.data[0].requests);
      setSingleGroupData(data.data);
      if (data.data[0].ownersId === currentUser[0]._id) {
        setManageGroup(true);
      } else {
        setManageGroup(false);
      }
      if (data.data[0].members.includes(currentUser[0]._id)) {
        createRoomHandler(groupId, groupId, groupName, groups);
        setJoinFlag(false);
      } else {
        setJoinFlag(true);
      }
    }
  };
  //##################################### join handler ################################################
  const joinHandler = async () => {
    socket?.emit("cc1", false);
    socket?.on("cc2", (val) => {
      setJoinHope(val);
    });
    const data = await axios.get(
      `https://iot-back-end.onrender.com/get/single/group?ids=${groupIds}`
    );
    const b = data.data[0].requests;
    const a = currentUser[0]._id;
    if (b.includes(a)) {
      socket?.emit("cc1", true);
      socket?.on("cc2", (val) => {
        setJoinHope(val);
      });
    } else {
      let filterdIds = b.concat(a);
      const data1 = await axios.patch(
        `https://iot-back-end.onrender.com/join/request?ids=${groupIds}`,
        {
          requests: filterdIds,
        }
      );
      if (data1.request.status === 200) {
        setJoinHope(true);
        console.log(data1.data, "request send");
        const data2 = await axios.get(
          `https://iot-back-end.onrender.com/get/single/group?ids=${groupIds}`
        );
        newRequestDataSetHandler(data2.data);
        afterCancel();
      }
    }
  };
  //################################ group memeber add and remove handler #############################
  const groupMemberAddAndRemoveHandler = async (el) => {
    const data2 = await axios.get(
      `https://iot-back-end.onrender.com/get/single/group?ids=${groupIds}`
    );
    console.log(data2.data, "new fetch");
    console.log(ownGroupData, "own");
    const members = ownGroupData[0].members;
    setOwnGroupList(false);
    let arr = [];
    members.map((els) => {
      const func = async () => {
        const data = await axios.get(
          `https://iot-back-end.onrender.com/get/single/user?ids=${els}`
        );
        arr.push(data.data[0]);
        if (arr.length === members.length) {
          setAddAndRemove(arr);
        }
      };
      func();
      return true;
    });
    setAddAndRemoveContainer(true);
  };
  //################################## new request data set handler ###################################
  const newRequestDataSetHandler = async (el) => {
    console.log("request accepted from data set handler");
    const requests = el[0].requests;
    let arr = [];
    if (requests.length === 0) {
      socket?.emit("bb1", arr);
      socket?.on("bb2", (val) => {
        console.log(val, "after socket io boolean");
        setNewRequestData(val);
      });
    } else {
      socket?.emit("bb1", false);
      socket?.on("bb2", (val) => {
        console.log(val, "after socket io boolean");
        setNoRequest(val);
      });
      console.log(noRequest, "if request is no 0");
      requests.map((els, i) => {
        const func = async () => {
          const data = await axios.get(
            `https://iot-back-end.onrender.com/get/single/user?ids=${els}`
          );
          arr.push(data.data[0]);
          if (i === requests.length - 1) {
            setNewRequestData(arr);
            socket?.emit("a1", arr);
            socket?.on("a2", (val) => {
              console.log(val, "after socket io");
              setNewRequestData(val);
            });
          }
        };
        func();
        return true;
      });
    }
  };

  //########################### after cancel ##################################
  const afterCancel = async () => {
    const data = await axios.get(
      `https://iot-back-end.onrender.com/get/single/group?ids=${groupIds}`
    );
    setOwnGroupData(data.data);
  };
  //###################### after delete fetch data for total users and add members ####################
  const fetchForAllMembersAfterDelete = async () => {
    const data1 = await axios.get(
      `https://iot-back-end.onrender.com/get/single/group?ids=${groupIds}`
    );
    // socket?.emit("ff1", data1.data[0].members.length);
    // socket?.on("ff2", (val) => {
    //   setGroupMembers(val);
    // });
    //setGroupMembers(data1.data[0].members.length);
    if (data1.request.status === 200 && data1.data.length !== 0) {
      setOwnGroupData(data1.data);
      let bb = [];
      data1.data[0].members.map((aa, i) => {
        const func = async () => {
          const data4 = await axios.get(
            `https://iot-back-end.onrender.com/get/single/user?ids=${aa}`
          );
          if (data4.data.length !== 0 && data4.request.status === 200) {
            bb.push(data4.data[0]);
            if (i === data1.data[0].members.length - 1) {
              setAddAndRemove(bb);
              socket?.emit("sen bbbb", bb);
              socket?.on("rec bbbb", (val) => {
                setAddAndRemove(val);
              });
            }
            return bb;
          }
        };
        func();
        return bb;
      });
    }
  };
  //##################### after delete fetch datas for add members ######################################
  const fetchForAddMembersAfterDelete = async () => {
    const data1 = await axios.get(
      `https://iot-back-end.onrender.com/get/single/group?ids=${groupIds}`
    );
    // socket?.emit("ff1", data1.data[0].members.length);
    // socket?.on("ff2", (val) => {
    //   setGroupMembers(val);
    // });
    let idContainer = [];
    const data = await axios.get("https://iot-back-end.onrender.com/get/all/users");
    data.data.map((e, i) => {
      idContainer.push(e._id);
      if (i === data.data.length - 1) {
        const ids = idContainer.filter(
          (o) => data1.data[0].members.indexOf(o) === -1
        );
        let aaa = [];
        ids.map((ee, i) => {
          const func = async () => {
            const data4 = await axios.get(
              `https://iot-back-end.onrender.com/get/single/user?ids=${ee}`
            );
            if (data4.data.length !== 0 && data4.request.status === 200) {
              aaa.push(data4.data[0]);
              if (i === ids.length - 1) {
                setUsersToBeAddedData(aaa);
                socket?.emit("sen aaaa", aaa);
                socket?.on("rec aaaa", (val) => {
                  setUsersToBeAddedData(val);
                });
              }
              return aaa;
            }
          };
          func();
          return true;
        });
      }
      return idContainer;
    });
  };
  //#################################### delete user from group hadler ################################
  const deleteUserFromGroupHandler = async (ids) => {
    const currentMembers = ownGroupData[0].members;
    const idsToBeRemoved = ids;
    const filterdIds = currentMembers.filter(
      (o) => idsToBeRemoved.indexOf(o) === -1
    );
    const data = await axios.patch(
      `https://iot-back-end.onrender.com/add/group/member?ids=${groupIds}`,
      {
        members: filterdIds,
      }
    );
    if (data.request.status === 200) {
      fetchForAllMembersAfterDelete();
      fetchForAddMembersAfterDelete();
      //groupGetHandler();
    }
  };
  //####################################### add memebers handler ######################################
  const addMembersHandler = async (el) => {
    const data = await axios.get("https://iot-back-end.onrender.com/get/all/users");
    if (data.data.length !== 0 && data.request.status === 200) {
      const allUser = data.data;
      const members = ownGroupData[0].members;
      let all = [];
      allUser.map((e, i) => {
        all.push(e._id);
        if (i === allUser.length - 1) {
          const arr1 = all;
          const arr2 = members;
          let unique1 = arr1.filter((o) => arr2.indexOf(o) === -1);
          let aaa = [];
          unique1.map((ee, i) => {
            const func = async () => {
              const data4 = await axios.get(
                `https://iot-back-end.onrender.com/get/single/user?ids=${ee}`
              );
              if (data4.data.length !== 0 && data4.request.status === 200) {
                aaa.push(data4.data[0]);
                if (i === unique1.length - 1) {
                  setUsersToBeAddedData(aaa);
                }
                return aaa;
              }
            };
            func();
            return true;
          });
        }
        return all;
      });
    }
  };
  //####################################### add users to group handler ################################
  const addUsersToGroupHandler = async (val) => {
    const data = await axios.patch(
      `https://iot-back-end.onrender.com/add/group/member?ids=${groupIds}`,
      {
        members: [...ownGroupData[0].members, val],
      }
    );
    if (data.data.length !== 0 && data.request.status === 200) {
      fetchForAddMembersAfterDelete();
      fetchForAllMembersAfterDelete();
    }
  };
  //############################################# request accept handler ##############################
  const requestAcceptHandler = async (val) => {
    const data1 = await axios.get(
      `https://iot-back-end.onrender.com/get/single/group?ids=${groupIds}`
    );
    if (data1.data.length !== 0 && data1.request.status === 200) {
      const acceptedIds = val;
      const currentIds = data1.data[0].requests;
      const filterdIds = currentIds.filter((el) => el !== acceptedIds);
      const data2 = await axios.patch(
        `https://iot-back-end.onrender.com/join/request?ids=${groupIds}`,
        {
          requests: filterdIds,
        }
      );
      if (data2.request.status === 200) {
        addUsersToGroupHandler(val);
        const data3 = await axios.get(
          `https://iot-back-end.onrender.com/get/single/group?ids=${groupIds}`
        );
        newRequestDataSetHandler(data3.data);
        // socket?.emit("ff1", data3.data[0].members.length);
        // socket?.on("ff2", (val) => {
        //   setGroupMembers(val);
        // });
        // socket?.emit("dd1", false);
        // socket?.on("dd2", (val) => {
        //   setJoinFlag(val);
        // });
      }
    }
  };
  //############################################# request reject handler ##############################
  const requestRejectHandler = async (val) => {
    const data1 = await axios.get(
      `https://iot-back-end.onrender.com/get/single/group?ids=${groupIds}`
    );
    if (data1.request.status === 200 && data1.data.length !== 0) {
      const currentIds = data1.data[0].requests;
      const removedIds = val;
      const filterdIds = currentIds.filter((el) => el !== removedIds);
      const data2 = await axios.patch(
        `https://iot-back-end.onrender.com/join/request?ids=${groupIds}`,
        {
          requests: filterdIds,
        }
      );
      if (data2.request.status === 200) {
        const data3 = await axios.get(
          `https://iot-back-end.onrender.com/get/single/group?ids=${groupIds}`
        );
        newRequestDataSetHandler(data3.data);
        setJoinHope(false);
        // socket?.emit("cc1", false);
        // socket?.on("cc2", (val) => {
        //   setJoinHope(val);
        // });
      }
    }
  };
  //########################################### request accepted helper ###############################
  const requestAcceptedHandler = async (name) => {
    // socket?.emit("ss0", name);
    // socket?.on("ss1", (val) => {
    //   console.log(val);
    // });
    // console.log("request accepted from helper function");
  };
  //##################################################### DOM #########################################
  //###################################################################################################
  return (
    <div className="fixed top-0 left-52">
      {chatPage && (
        <div className="absolute left-[15%] flex place-items-center top-[60px]">
          <Back
            fontSize="small"
            className="absolute left-1 top-2 text-xs text-gray-500 cursor-pointer"
            onClick={() => {
              setChatPage(false);
              setLogin(true);
            }}
          />
          <div className="mt-6">
            <input
              onChange={(e) => userSearchHandler(e.target.value)}
              type="text"
              className="w-[270px] rounded-sm  h-8 border-b pr-14 border-gray-400 focus:outline-none bg-gray-100 text-xs pl-4"
              placeholder="search individual users"
            />
            <Search
              fontSize="small"
              className="text-gray-400 absolute left-56 mt-1"
            />
            <div className="overflow-y-scroll pr-2 ml-2 w-64 h-[490px]">
              {userData &&
                userData.map((users) => {
                  return (
                    users._id !== currentUser[0]._id && (
                      <div
                        key={users._id}
                        id={users._id}
                        onClick={() => {
                          //setOtherUser(users);
                          underlineHandler(users._id);
                          createRoomHandler(
                            `${users._id}//${currentUser[0]._id}`,
                            `${currentUser[0]._id}//${users._id}`,
                            users.userName,
                            "private"
                          );
                          setWellCome(false);
                          setPlease(false);
                          setJoinFlag(false);
                          setManageGroup(false);
                          setWriteMessage(false);
                        }}
                        className="flex relative cursor-pointer gap-x-2 hover:bg-gray-300 mt-2"
                      >
                        <img
                          src={require(`./../../iotUploads/${users.profilePic[0].path}`)}
                          className="h-8 w-8 mt-[6px] object-cover rounded-full "
                          alt="pro"
                        />{" "}
                        {users.fullName !== "ADMIN OF IOT LAB-CENTER" && (
                          <div className="text-xs mt-[5px] relative">
                            <p className="font-semibold">{users.fullName}</p>
                            <p className="text-emerald-500">{users.userName}</p>
                          </div>
                        )}
                        {users.fullName === "ADMIN OF IOT LAB-CENTER" && (
                          <div className="text-xs mt-[5px] relative">
                            <p className="font-bold text-red-500">
                              {users.fullName}
                            </p>
                            <p className="text-emerald-500 font-bold">
                              {users.userName}
                            </p>
                          </div>
                        )}
                        <div className="absolute bg-gray-400 ml-[22px] mt-[6px] h-[14px] w-[14px] rounded-full"></div>
                        <div
                          className="font-semibold text-emerald-400"
                          key={users.fullName}
                        >
                          {onlineUsers &&
                            onlineUsers.map((el) => {
                              if (el.name.includes(users.userName)) {
                                return (
                                  <div
                                    key={users.fullName}
                                    className="absolute bottom-[18px] left-[22px] bg-emerald-400 h-[14px] w-[14px] rounded-full"
                                  ></div>
                                );
                              }
                              return true;
                            })}
                        </div>
                      </div>
                    )
                  );
                })}
              {isFetchingUser && (
                <p className="text-sm mt-10 ml-4 font-bold text-gray-500">
                  Loading...
                </p>
              )}
              {isErrorUser && (
                <p className="text-sm mt-10 ml-4 font-bold text-red-500">
                  something went wrong!
                </p>
              )}
              {userData && userData.length === 0 && (
                <p className="text-sm mt-10 ml-4 font-bold text-red-400">
                  Users Not Found!
                </p>
              )}
            </div>
          </div>
          {/* ################################################################################################## */}
          <div className="h-[550px] w-[70vh] mt-1 flex flex-col place-items-center">
            <div className="flex gap-x-2 border-b border-gray-400 h-[55px] place-items-center justify-center w-[62vh]">
              <img
                src={require(`./../../iotUploads/${currentUser[0].profilePic[0].path}`)}
                className="h-8 w-8 mt-[3px] object-cover rounded-full"
                alt="pro"
              />{" "}
              <div className="text-xs mt-[3px]">
                <p className="">{currentUser[0].userName}</p>
                <p className="font-semibold text-emerald-400">online</p>
              </div>
              <MoreHoriz
                onClick={() => {
                  setMore(false);
                  setGroupForm(true);
                }}
                onMouseOver={(e) => setMore(true)}
                onMouseLeave={(e) => setMore(false)}
                sx={{ width: 32, height: 32 }}
                className="absolute cursor-pointer left-[58%] text-gray-500 hover:text-black"
              />
              {more && (
                <div className="absolute z-10 left-[54.5%] top-14">
                  <p className="text-xs w-24 px-[9px] py-2 bg-white border border-gray-300 shadow-lg shadow-black">
                    Create Group
                  </p>
                </div>
              )}
              {manageGroup && (
                <div className="absolute left-[64%]">
                  <Badge
                    badgeContent={newRequestData.length}
                    color="secondary"
                    className="text-red-400"
                  >
                    <PortraitOutlined
                      onClick={() => {
                        setOwnGroupContainer(true);
                        setOwnGroupList(true);
                        setAddAndRemoveContainer(false);
                      }}
                      onMouseLeave={() => setManageGroupText(false)}
                      onMouseOver={() => setManageGroupText(true)}
                      sx={{ width: 28, height: 28 }}
                      className="cursor-pointer text-gray-500 hover:text-black"
                    />
                  </Badge>
                  {manageGroupText && (
                    <div className="">
                      <p className="absolute z-10 top-10 text-xs -right-9 w-24 px-[6px] py-2 bg-white border border-gray-300 shadow-lg shadow-black">
                        Manage Group
                      </p>
                    </div>
                  )}
                </div>
              )}
              {ownGroupContainer && (
                <div className="absolute rounded-sm z-10 w-[35%] h-[65%] flex flex-col justify-center items-center bg-white shadow-xl shadow-black border border-gray-300 right-[1%] top-[4%] gap-1">
                  <Close
                    className="absolute right-1 text-gray-500 top-1 cursor-pointer hover:bg-gray-300 hover:text-red-500"
                    fontSize="small"
                    onClick={() => {
                      setOwnGroupContainer(false);
                      setOwnGroupList(false);
                      setUsersToBeAddedContainer(false);
                      setNewRequestContainer(false);
                    }}
                  />

                  <div className="flex flex-col my-2 text-gray-500">
                    {ownGroupList && (
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-lg my-1 text-gray-600 underline font-bold">
                          {currentGroup.groupName}
                        </p>
                        <img
                          src={require(`./../../iotUploads/${currentGroup.groupPro[0].path}`)}
                          alt="jdjdj"
                          className="h-52 w-[250px] rounded-sm mt-1"
                        />
                        {/* <input
                          //onChange={(e) => setProfile(e.target.files[0])}
                          type="file"
                          name="profilePic"
                          id=""
                          className="w-[250px] bg-blue-400 text-sm h-6  absolute bottom-[202px] opacity-0"
                        />
                        <p className="w-[250px] py-[2px] mt-1 h-6 text-gray-500 text-xs rounded-sm pl-1 focus:outline-none bg-gray-100 border border-gray-300">
                          <span>
                            <PortraitOutlined className="" />
                          </span>
                          <span className="ml-2">
                            select new profile picture{" "}
                          </span>
                        </p>
                        <button className="text-xs text-white px-[84px] py-1 mt-2 bg-emerald-300 hover:bg-emerald-200">
                          Change picture
                        </button>

                        <p className="text-sm mt-3 text-gray-600 underline font-semibold">
                          change your group name
                        </p>

                        <p className="text-xs font-bold w-[250px] text-gray-400">
                          current group name:{" "}
                          <span className="text-gray-500 font-bold">
                            {currentGroup.groupName}
                          </span>
                        </p>
                        <input
                          type="text"
                          className="w-[250px] h-6 text-xs mt-1 focus:outline-none bg-white border border-gray-300 pl-2"
                          placeholder="enter new group name"
                        />
                        <button className="text-xs text-white px-[87px] py-1 mt-2 bg-emerald-300 hover:bg-emerald-200">
                          Change Name
                        </button> */}
                        <button
                          onClick={() => {
                            groupMemberAddAndRemoveHandler();
                            newRequestDataSetHandler(ownGroupData);
                            setOnlyAddAndRemoveContainer(true);
                            afterCancel();
                          }}
                          className="text-sm mt-4 hover:bg-emerald-300 font-bold text-white bg-emerald-400 px-[79px] py-1"
                        >
                          More Options
                        </button>
                      </div>
                    )}

                    {addAndRemoveContainer && (
                      <div className="flex flex-col items-center justify-center">
                        {back && (
                          <Back
                            id="back"
                            fontSize="small"
                            onClick={() => {
                              setAddAndRemoveContainer(false);
                              setNewRequestContainer(false);
                              setOwnGroupList(true);
                              afterCancel();
                            }}
                            className="absolute hover:bg-gray-300 left-0 top-1"
                          />
                        )}

                        <div className="flex gap-8 absolute top-6">
                          <p
                            id="total"
                            onClick={() => {
                              const ids = document.getElementById("request");
                              ids.classList.remove(
                                "border-b-[3px]",
                                "border-emerald-400"
                              );
                              const idd = document.getElementById("total");
                              idd.classList.add(
                                "border-b-[3px]",
                                "border-emerald-400"
                              );
                              setOnlyAddAndRemoveContainer(true);
                              setNewRequestContainer(false);
                            }}
                            className="text-sm border-b-[3px] border-emerald-400 h-7 cursor-pointer font-bold my-2"
                          >
                            Total Members
                          </p>
                          <p
                            id="request"
                            onClick={() => {
                              const ids = document.getElementById("total");
                              ids.classList.remove(
                                "border-b-[3px]",
                                "border-emerald-400"
                              );
                              const idd = document.getElementById("request");
                              idd.classList.add(
                                "border-b-[3px]",
                                "border-emerald-400"
                              );
                              setOnlyAddAndRemoveContainer(false);
                              setNewRequestContainer(true);
                            }}
                            className="text-sm h-7 cursor-pointer font-bold my-2"
                          >
                            New Request{" "}
                            <span className="">
                              <Badge
                                badgeContent={newRequestData.length}
                                color="secondary"
                                className="text-red-400"
                              >
                                <QuestionMark className="" fontSize="small" />
                              </Badge>
                            </span>
                          </p>
                        </div>

                        {onlyAddAndRemoveContainer && (
                          <div className="">
                            <p className="mx-5 text-xs">
                              to remove members press{" "}
                              <span className="text-red-600 font-bold">x</span>
                            </p>
                            <div className="h-[175px] overflow-y-scroll ml-2">
                              {addAndRemove &&
                                addAndRemove.map((el, i) => {
                                  return (
                                    <div
                                      key={el._id}
                                      className="flex mr-2 justify-center items-center gap-2 mt-1  cursor-default hover:bg-gray-200 px-2 py-1"
                                    >
                                      <img
                                        src={require(`./../../iotUploads/${el.profilePic[0].path}`)}
                                        alt="jdjdj"
                                        className="h-10 w-10 rounded-sm"
                                      />
                                      <div className="flex">
                                        <div className="ml-2">
                                          <p className="text-xs text-gray-600 font-bold w-44">
                                            full name:{" "}
                                            <span className="text-gray-500 font-normal">
                                              {el.fullName}
                                            </span>
                                          </p>
                                          <p className="text-xs text-gray-600 font-bold w-44">
                                            user name:{" "}
                                            <span className="text-gray-500 font-normal">
                                              {el.userName}
                                            </span>
                                          </p>
                                          <p className="text-xs text-gray-600 font-bold w-44">
                                            email:{" "}
                                            <span className="text-gray-500 font-normal">
                                              {el.email}
                                            </span>
                                          </p>
                                        </div>
                                        <Close
                                          onClick={() =>
                                            deleteUserFromGroupHandler(el._id)
                                          }
                                          fontSize="small"
                                          className="mt-3 hover:bg-gray-400 text-red-600 w-4 cursor-pointer"
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                            <button
                              onClick={() => {
                                setBack(false);
                                setUsersToBeAddedContainer(true);
                                addMembersHandler();
                              }}
                              className="bg-emerald-400 mt-4 hover:bg-emerald-300 ml-4 absolute text-white px-[88px] py-1 text-sm"
                            >
                              Add Member
                            </button>
                            {usersToBeAddedContainer && (
                              <div className="absolute pt-8 top-6 left-7 bg-white pl-2 h-72">
                                <input
                                  type="text"
                                  className="w-[265px] bg-gray-100 ml-2 text-xs pl-2 focus:outline-none border border-gray-300 h-8"
                                  placeholder="Search users"
                                />
                                <div className="bg-white overflow-y-scroll h-48 mt-1">
                                  {usersToBeAddedData &&
                                    usersToBeAddedData.map((el) => {
                                      return (
                                        <div
                                          key={el._id}
                                          className="flex bg-white mr-2 justify-center items-center gap-2 mt-1  cursor-default hover:bg-gray-200 px-2 py-1"
                                        >
                                          <img
                                            src={require(`./../../iotUploads/${el.profilePic[0].path}`)}
                                            alt="jdjdj"
                                            className="h-10 w-10 rounded-sm"
                                          />
                                          <div className="flex">
                                            <div className="ml-2">
                                              <p className="text-xs text-gray-600 font-bold w-44">
                                                full name:{" "}
                                                <span className="text-gray-500 font-normal">
                                                  {el.fullName}
                                                </span>
                                              </p>
                                              <p className="text-xs text-gray-600 font-bold w-44">
                                                user name:{" "}
                                                <span className="text-gray-500 font-normal">
                                                  {el.userName}
                                                </span>
                                              </p>
                                              <p className="text-xs text-gray-600 font-bold w-44">
                                                email:{" "}
                                                <span className="text-gray-500 font-normal">
                                                  {el.email}
                                                </span>
                                              </p>
                                            </div>
                                            <Add
                                              onClick={() =>
                                                addUsersToGroupHandler(el._id)
                                              }
                                              fontSize="small"
                                              className="mt-3 hover:bg-gray-400 text-emerald-500 w-4 cursor-pointer"
                                            />
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>

                                <button
                                  onClick={() => {
                                    setBack(true);
                                    setUsersToBeAddedContainer(false);
                                  }}
                                  className="bg-emerald-400 hover:bg-emerald-300 ml-2 absolute text-white px-[118px] py-1 text-sm mt-4"
                                >
                                  Back
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                        {newRequestContainer && (
                          <div className=" w-[300px] pr-1">
                            <p className="mx-5 text-xs absolute top-[70px]">
                              to remove members press{" "}
                              <span className="text-red-600 font-bold">
                                <Close fontSize="small" className="p-[3px]" />
                              </span>
                            </p>
                            <p className="absolute mx-5 text-xs top-[87px]">
                              to accept members press{" "}
                              <span className="text-emerald-400 font-bold">
                                <Done fontSize="small" className="p-[3px]" />
                              </span>
                            </p>
                            <div className="h-[175px] overflow-y-scroll mt-16 ml-2">
                              {newRequestData &&
                                newRequestData.map((el, i) => {
                                  return (
                                    <div
                                      key={el._id}
                                      className="flex bg-white px-5 justify-center items-center gap-2 cursor-default hover:bg-gray-200 py-1"
                                    >
                                      <img
                                        src={require(`./../../iotUploads/${el.profilePic[0].path}`)}
                                        alt="jdjdj"
                                        className="h-10 w-10 rounded-sm"
                                      />
                                      <div className="flex">
                                        <div className="ml-2">
                                          <p className="text-xs text-gray-600 font-bold w-44">
                                            full name:{" "}
                                            <span className="text-gray-500 font-normal">
                                              {el.fullName}
                                            </span>
                                          </p>
                                          <p className="text-xs text-gray-600 font-bold w-44">
                                            user name:{" "}
                                            <span className="text-gray-500 font-normal">
                                              {el.userName}
                                            </span>
                                          </p>
                                          <p className="text-xs text-gray-600 font-bold w-44">
                                            email:{" "}
                                            <span className="text-gray-500 font-normal">
                                              {el.email}
                                            </span>
                                          </p>
                                        </div>
                                        <Done
                                          onClick={() => {
                                            requestAcceptHandler(el._id);
                                            requestAcceptedHandler(el.userName);
                                          }}
                                          fontSize="small"
                                          className="hover:bg-gray-400 text-emerald-500 mt-3 w-4 cursor-pointer"
                                        />
                                        <Close
                                          onClick={() =>
                                            requestRejectHandler(el._id)
                                          }
                                          fontSize="small"
                                          className="hover:bg-gray-400 ml-2 mt-3 text-red-600 w-4 cursor-pointer"
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              {noRequest && (
                                <div className="absolute bottom-20 pt-6 left-10 pl-6 text-xl font-bold h-44 w-64 bg-white">
                                  There is no new request
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {groupForm && (
                <div className="absolute z-20 rounded-sm flex flex-col place-items-center border border-gray-300 w-64 h-32 bg-white shadow-lg shadow-black left-[55%] top-5">
                  <input
                    onChange={(e) => setGroupName(e.target.value)}
                    type="text"
                    className="text-xs bg-gray-200 border border-gray-300 rounded-sm focus:outline-none mt-2 h-8 w-56 pl-2 mx-2"
                    placeholder="Group name"
                  />
                  <input
                    onChange={(e) => setGroupProfile(e.target.files[0])}
                    type="file"
                    name="groupPro"
                    id=""
                    className="w-56 bg-blue-400 text-sm h-8 absolute bottom-[50px] opacity-0"
                  />
                  <p className="w-56 mt-1 h-8 pt-1 text-gray-500 text-xs rounded-sm pl-1 focus:outline-none bg-gray-200 border border-gray-300">
                    <span>
                      <PortraitOutlined className="" />
                    </span>
                    <span className="ml-2">Enter Groups profile picture </span>
                  </p>
                  <div className="flex gap-3 justify-between mx-2 items-center my-2">
                    <button
                      onClick={() => setGroupForm(false)}
                      className="text-sm px-8 py-1 cursor-pointer mt-1 bg-gray-300 hover:bg-gray-200 rounded-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={groupCreateHandler}
                      className="text-sm hover:bg-emerald-300 rounded-sm text-white px-8 mt-1 py-1 bg-emerald-400"
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="overflow-y-scroll pt-2 pb-6 text-sm bg-white border border-gray-300 border-t-0  h-[450px] w-[100%] ">
              {wellCome && (
                <div className="absolute z-10 flex flex-col items-center justify-center h-[450px] w-[44%] -mt-[6px]">
                  <p className="text-2xl font-extrabold text-gray-700">
                    DTU IOT-LAB CENTER
                  </p>
                  <p className="absolute text-5xl mt-8 px-2 py-2 left-24 text-black bg-white font-semibold">
                    DTU
                  </p>
                  <img
                    src="./img/bdu_iot_logo.png"
                    alt="iot"
                    className="h-40 w-72 rounded-sm mt-1"
                  />
                  <p className="text-lg font-extrabold text-gray-500 mt-1">
                    well come to our chat dashboard
                  </p>
                  <p className="text-lg font-semibold text-gray-500">
                    click eache users to chat with them
                  </p>
                </div>
              )}
              {sayHi && (
                <div className="absolute z-10 flex flex-col items-center justify-center h-[50px] w-[44%] mt-[190px]">
                  <p className="text-lg font-semibold text-gray-500">
                    say <span className="font-bold text-emerald-500">hi</span>{" "}
                    to your friends
                  </p>
                </div>
              )}
              {writeMessage && (
                <div className="absolute z-10 shadow-xl bg-white shadow-black  items-center justify-center border border-black px-2 py-2 bottom-12 ml-40">
                  <p className="text-xs font-semibold text-black bg-white">
                    please write a message
                  </p>
                  <div className="absolute z-20 ml-12 h-4 w-4 rotate-45 bg-white border border-black border-t-0 border-l-0"></div>
                </div>
              )}
              {texts &&
                texts.map((el, i) => {
                  return (
                    <div key={el.time}>
                      {el.content !== "" && el.messageType === "text" && (
                        <div key={el.time}>
                          {el.sender === currentUser[0].userName && (
                            <div className="ml-[220px]">
                              <div className="flex gap-x-2 w-64 mt-4">
                                <div className="">
                                  <img
                                    src={require(`./../../iotUploads/${el.image}`)}
                                    className="h-8 border border-gray-300 w-8 mt-[6px] object-cover rounded-full"
                                    alt="pro"
                                  />{" "}
                                </div>
                                <div className="">
                                  <p className="text-xs ml-1">you</p>
                                  <p className="max text-xs py-2 rounded-xl font-normal mt-1 text-gray-100 bg-emerald-500 px-2">
                                    {el.content}
                                  </p>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 font-semibold ml-10">
                                {format(el.time)}
                              </p>
                            </div>
                          )}

                          {el.sender !== currentUser[0].userName && (
                            <div className="">
                              <div className="flex mt-4 w-64">
                                <div className="">
                                  <img
                                    src={require(`./../../iotUploads/${el.image}`)}
                                    className="h-8 w-8 mt-[6px] border border-gray-300 mx-1 object-cover rounded-full"
                                    alt="pro"
                                  />{" "}
                                </div>
                                <div className="">
                                  <p className="text-xs ml-1">{el.sender}</p>
                                  <p className="max text-xs rounded-xl py-2 font-normal mt-1 text-black bg-gray-200 px-2">
                                    {el.content}
                                  </p>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 font-semibold ml-10">
                                {format(el.time)}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      <div ref={refer} />
                      {el.messageType === "file" &&
                        el.sender === currentUser[0].userName && (
                          <div className="ml-[165px] relative">
                            <div className="flex mt-4">
                              <div className="">
                                <img
                                  src={require(`./../../iotUploads/${el.image}`)}
                                  className="h-8 border border-gray-300 w-8 mt-[6px] mx-1 object-cover rounded-full"
                                  alt="pro"
                                />{" "}
                              </div>
                              <div className="">
                                <p className="text-xs ml-1 my-[3px]">you</p>
                                {/* ################################### audio ############################# */}
                                {el.type === "audio" && (
                                  <div
                                    className="w-[216px] h-auto bg-emerald-500 flex flex-col text-white rounded-md "
                                    key={el.time}
                                  >
                                    <audio
                                      controls
                                      src={
                                        require(`./../../iotUploads/${el.path}`)
                                          .default
                                      }
                                      className="w-[200px] mx-2 h-10 mt-1"
                                    ></audio>
                                    <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                                      <p className="text-xs font-bold w-auto maxs ">
                                        name:{" "}
                                        <span className="font-normal">
                                          {el.fileName}
                                        </span>
                                      </p>
                                      <p className="text-xs font-bold w-auto maxs">
                                        size:{" "}
                                        <span className="font-normal">
                                          {el.size}
                                        </span>
                                      </p>
                                      <p className="text-xs w-auto maxs mb-2">
                                        # {el.fileDescription}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {/* ################################### video ############################### */}
                                {el.type === "video" && (
                                  <div
                                    className="w-[216px] h-auto bg-emerald-500 flex flex-col text-white rounded-md "
                                    key={el.time}
                                  >
                                    <video
                                      controls
                                      src={
                                        require(`./../../iotUploads/${el.path}`)
                                          .default
                                      }
                                      className="w-[212px] object-cover mt-[2px] mx-[2px] h-28"
                                    ></video>
                                    <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                                      <p className="text-xs w-auto maxs font-bold">
                                        name:{" "}
                                        <span className="font-normal">
                                          {el.fileName}
                                        </span>
                                      </p>
                                      <p className="text-xs font-bold w-auto maxs">
                                        size:{" "}
                                        <span className="font-normal">
                                          {el.size}
                                        </span>
                                      </p>
                                      <p className="text-xs w-auto maxs mb-2">
                                        # {el.fileDescription}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {/* ################################## image ################################# */}
                                {el.type === "image" && (
                                  <div
                                    className="w-auto h-auto bg-gray-200 flex flex-col text-black rounded-md "
                                    key={el.time}
                                  >
                                    <img
                                      src={require(`./../../iotUploads/${el.path}`)}
                                      alt="dkd"
                                      className="w-[212px] h-32 mx-[2px] my-[2px]"
                                    />
                                    <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                                      <p className="text-xs w-auto font-bold maxs ">
                                        name:{" "}
                                        <span className="font-normal">
                                          {el.fileName}
                                        </span>
                                      </p>
                                      <p className="text-xs w-auto font-bold maxs">
                                        size:{" "}
                                        <span className="font-normal">
                                          {el.size}
                                        </span>
                                      </p>
                                      <p className="text-xs w-auto maxs mb-2">
                                        # {el.fileDescription}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {/* ################################### other file type ######################## */}

                                {el.type === "application" && (
                                  <div
                                    className="w-[216px] flex flex-col items-center h-auto bg-emerald-500  text-white rounded-md"
                                    key={el.time}
                                  >
                                    <FilePresent
                                      className="text-white"
                                      sx={{ width: 44, height: 44 }}
                                    />
                                    <div className="flex flex-col gap-1 mx-1 items-center max justify-between ">
                                      <p className="text-xs font-bold w-auto maxs ">
                                        name:{" "}
                                        <span className="font-normal">
                                          {el.fileName}
                                        </span>
                                      </p>
                                      <p className="text-xs font-bold w-auto maxs">
                                        size:{" "}
                                        <span className="font-normal">
                                          {el.size}
                                        </span>
                                      </p>
                                      <p className="text-xs w-auto maxs mb-2">
                                        # {el.fileDescription}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 font-semibold ml-10">
                              {format(el.time)}
                            </p>
                          </div>
                          //##############
                        )}
                      {/* ###################################### for other user ############################### */}
                      {el.messageType === "file" &&
                        el.sender !== currentUser[0].userName && (
                          <div className="relative">
                            <div className="flex mt-4">
                              <div className="">
                                <img
                                  src={require(`./../../iotUploads/${el.image}`)}
                                  className="h-8 w-8 border border-gray-300 mt-[6px] mx-1 object-cover rounded-full"
                                  alt="pro"
                                />{" "}
                              </div>
                              <div className="">
                                <p className="text-xs ml-1 my-[3px]">
                                  {el.sender}
                                </p>
                                {/* ################################### audio ############################# */}
                                {el.type === "audio" && (
                                  <div
                                    className="w-[216px] h-auto bg-gray-200 flex flex-col text-black rounded-md "
                                    key={el.time}
                                  >
                                    <audio
                                      controls
                                      src={require(`./../../iotUploads/${el.path}`)}
                                      className="w-[200px] mx-2 h-10 mt-1"
                                    ></audio>
                                    <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                                      <p className="text-xs font-bold w-auto maxs ">
                                        name:{" "}
                                        <span className="font-normal">
                                          {el.fileName}
                                        </span>
                                      </p>
                                      <p className="text-xs font-bold w-auto maxs">
                                        size:{" "}
                                        <span className="font-normal">
                                          {el.size}
                                        </span>
                                      </p>
                                      <p className="text-xs w-auto maxs mb-2">
                                        # {el.fileDescription}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {/* ################################### video ############################### */}
                                {el.type === "video" && (
                                  <div
                                    className="w-auto h-auto bg-gray-200 flex flex-col text-black rounded-md "
                                    key={el.time}
                                  >
                                    <video
                                      controls
                                      src={require(`./../../iotUploads/${el.path}`)}
                                      className="w-[212px] object-cover mt-[2px] mx-[2px] h-28 hover:h-80 hover:w-[370px]"
                                    ></video>
                                    <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                                      <p className="text-xs w-auto maxs font-bold">
                                        name:{" "}
                                        <span className="font-normal">
                                          {el.fileName}
                                        </span>
                                      </p>
                                      <p className="text-xs font-bold w-auto maxs">
                                        size:{" "}
                                        <span className="font-normal">
                                          {el.size}
                                        </span>
                                      </p>
                                      <p className="text-xs w-auto maxs mb-2">
                                        # {el.fileDescription}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {/* ################################## image ################################# */}
                                {el.type === "image" && (
                                  <div
                                    className="w-auto h-auto bg-gray-200 flex flex-col text-black rounded-md "
                                    key={el.time}
                                  >
                                    <img
                                      src={require(`./../../iotUploads/${el.path}`)}
                                      alt="dkd"
                                      className="w-[212px] mx-[2px] my-[2px] h-32 hover:h-80 hover:w-[370px]"
                                    />
                                    <div className="flex flex-col gap-1 items-center max justify-between mx-1">
                                      <p className="text-xs w-auto font-bold maxs ">
                                        name:{" "}
                                        <span className="font-normal">
                                          {el.fileName}
                                        </span>
                                      </p>
                                      <p className="text-xs w-auto font-bold maxs">
                                        size:{" "}
                                        <span className="font-normal">
                                          {el.size}
                                        </span>
                                      </p>
                                      <p className="text-xs w-auto maxs mb-2">
                                        # {el.fileDescription}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {/* ################################### other file type ######################## */}

                                {el.type === "application" && (
                                  <div
                                    className="w-[216px] flex flex-col items-center h-auto bg-gray-200  text-black rounded-md"
                                    key={el.time}
                                  >
                                    <FilePresent
                                      className="text-gray-500"
                                      sx={{ width: 44, height: 44 }}
                                    />
                                    <div className="flex flex-col gap-1 mx-1 items-center max justify-between ">
                                      <p className="text-xs font-bold w-auto maxs ">
                                        name:{" "}
                                        <span className="font-normal">
                                          {el.fileName}
                                        </span>
                                      </p>
                                      <p className="text-xs font-bold w-auto maxs">
                                        size:{" "}
                                        <span className="font-normal">
                                          {el.size}
                                        </span>
                                      </p>
                                      <p className="text-xs w-auto maxs mb-2">
                                        # {el.fileDescription}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 font-semibold ml-10">
                              {format(el.time)}
                            </p>
                          </div>
                        )}
                    </div>
                  );
                })}
              {typing && (
                <p className="text-sm text-emerald-400 ml-2 mt-1">typing...</p>
              )}
              {/* <div ref={refer} /> */}
            </div>
            <div className="bg-white border border-gray-200 flex gap-x-2 py-1 absolute bottom-1 w-[48%]">
              {/* {!wellCome && (
                <Folder
                  onClick={() => setFileSendFlag(true)}
                  className="text-emerald-400 ml-1 my-2 cursor-pointer hover:text-emerald-500"
                  sx={{ width: 20, height: 20 }}
                />
              )} */}
              {/* {wellCome && (
                <Folder
                  onClick={() => setPlease(true)}
                  className="text-emerald-400 ml-1 my-2 cursor-default"
                  sx={{ width: 20, height: 20 }}
                />
              )} */}
              {please && (
                <p className="absolute text-xs text-black -mt-10 ml-[12%] bg-white border border-black rounded-lg py-2 px-2">
                  please first select a user or group that you want to chat with
                </p>
              )}
              {fileSendFlag && (
                <div className="absolute w-52 shadow-lg shadow-black rounded-sm bg-gray-200 border border-gray-400 h-28 bottom-1 text-xs">
                  <Close
                    onClick={() => setFileSendFlag(false)}
                    fontSize="small"
                    className="text-xs text-gray-600 ml-[184px] mt-1 cursor-pointer hover:bg-gray-200 hover:text-black"
                  />
                  <input
                    onChange={(e) => setFileDescription(e.target.value)}
                    type="text"
                    className="w-48 h-7 focus:outline-none border border-gray-300 mx-2 pl-1 mt-1"
                    placeholder="Description"
                  />
                  <div className="flex gap-x-1 mx-2 justify-between mt-5">
                    <input
                      type="file"
                      onChange={(e) => setFiles(e.target.files[0])}
                      name="fileUpload"
                      className="w-20 text-xs"
                    />
                    <button
                      onClick={fileHandler}
                      className="px-6 text-xs font-bold bg-emerald-400 text-white hover:bg-emerald-500"
                    >
                      send
                    </button>
                  </div>
                </div>
              )}
              <input
                id="inp"
                onChange={(e) => {
                  const ids = document.getElementById("inp");
                  if (ids?.value.length > 0) {
                    setWriteMessage(false);
                  }
                  setMessage(e.target.value);
                  typingHandler(e);
                }}
                type="text"
                className="h-9  text-xs focus:outline-none w-[400px] px-2"
                placeholder="write your message here"
              />
              {/* <Emoji
                className="text-yellow-400 my-2"
                sx={{ width: 20, height: 20 }}
              /> */}
              {!wellCome && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSayHi(false);
                    const ids = document.getElementById("inp");
                    if (ids.value.length === 0) {
                      setWriteMessage(true);
                      return;
                    } else {
                      setWriteMessage(false);
                      messageSendHandler();
                      ids.value = "";
                    }
                  }}
                  className="bg-emerald-400  h-7 mx-[5px] my-[4px] text-white px-[17px] hover:bg-emerald-500"
                >
                  Send
                </button>
              )}

              {wellCome && (
                <button
                  onClick={() => {
                    setPlease(true);
                  }}
                  className="bg-emerald-400  h-7 mx-[5px] my-[4px] cursor-default text-white px-[13px]"
                >
                  Send
                </button>
              )}
            </div>
          </div>
          {/* ##################################################################################### */}
          <div className="mt-10">
            <input
              onChange={(e) => searchGroupHandler(e.target.value)}
              type="text"
              className="w-[270px] rounded-sm  h-8 border-b pr-14 border-gray-400 focus:outline-none bg-gray-100 text-xs pl-4"
              placeholder="search groups"
            />
            <Search
              fontSize="small"
              className="absolute right-10 text-gray-400 mt-1"
            />
            <div className="overflow-y-scroll mt-2 ml-2 w-64 h-[70vh]">
              {groupsData &&
                groupsData.map((group) => {
                  return (
                    <div
                      id={group._id}
                      onClick={() => {
                        setCurrentGroup(group);
                        underlineHandler(group._id);
                        //setGroupMembers(group.members.length);
                        setGroupIds(group._id);
                        //setCurrentGroupName(group.groupName);
                        groupJoinHandler(group._id, group.groupName, "groups");
                        setWellCome(false);
                        setPlease(false);
                        setWriteMessage(false);
                      }}
                      className="flex gap-2 mt-[6px] hover:bg-gray-300 cursor-pointer "
                      key={group._id}
                    >
                      <img
                        src={require(`./../../iotUploads/${group?.groupPro[0].path}`)}
                        className="h-8 w-8 mt-[6px] object-cover rounded-full "
                        alt="pro"
                      />{" "}
                      <div className="text-xs mt-[5px]">
                        <p className="">{group.groupName}</p>
                        <p className="font-semibold text-emerald-400 text-xs">
                          {group.members.length} members
                        </p>
                      </div>
                    </div>
                  );
                })}
              {isFetchingGroup && (
                <p className="text-sm mt-10 ml-4 font-bold text-gray-500">
                  Loading...
                </p>
              )}
              {isErrorGroup && (
                <p className="text-sm mt-10 ml-4 font-bold text-red-500">
                  something went wrong!
                </p>
              )}
              {groupsData && groupsData.length === 0 && (
                <p className="text-sm mt-10 ml-4 font-bold text-red-400">
                  Groups Not Found!
                </p>
              )}
              {joinFlag && (
                <div className="absolute top-[10.5%] right-[27.5%] border border-gray-300 flex flex-col bg-white r h-[82%] place-items-center justify-center w-[45%]">
                  {singleGroupData &&
                    singleGroupData.map((el, i) => {
                      return (
                        <div
                          className="flex flex-col place-items-center text-gray-500"
                          key={el.members[i]}
                        >
                          <img
                            src={require(`./../../iotUploads/${el.groupPro[0].path}`)}
                            className="h-32 w-44 mt-[6px] object-cover rounded-sm "
                            alt="pro"
                          />
                          <p className="text-sm font-bold mx-2">
                            Group Name:{" "}
                            <span className="text-emerald-400 font-extrabold">
                              {el.groupName}
                            </span>
                          </p>
                          <p className="text-sm font-bold mt-2">
                            Members:{" "}
                            <span className="text-emerald-400 font-extrabold">
                              {el.members.length}
                            </span>
                          </p>
                          <p className="text-sm font-bold">
                            Admin:{" "}
                            <span className="text-emerald-400 font-extrabold">
                              {el.ownersName}
                            </span>
                          </p>
                          <div className="flex mx-2 my-2 gap-2 mt-4">
                            <button
                              onClick={joinHandler}
                              className="px-[76px] bg-emerald-400 rounded-sm hover:bg-emerald-300 text-white font-bold"
                            >
                              Join
                            </button>
                          </div>
                          {joinHope && (
                            <div className="absolute bottom-[88px] bg-white py-1 w-60 flex items-center text-gray-500 font-bold mt-2">
                              You will join the chat one's the admin aproves you
                              thanks.
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {login && <Login />}
    </div>
  );
};

export default Cha;
