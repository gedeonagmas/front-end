import React, { useState } from "react";
import File from "@mui/icons-material/Image";
//import Footer from "./Footer";
import { useApplyPostMutation } from "./../../features/api/apiSlice";

const Apply = () => {
  const [wrongData,setWrongData]=useState(false);
  const [succ, setSuc] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [campusName, setCampusName] = useState("");
  const [department, setDepartement] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [letter, setLetter] = useState("");
  const [applyData] = useApplyPostMutation();
  const applyHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("firstName", firstName);
    fd.append("lastName", lastName);
    fd.append("email", email);
    fd.append("campusName", campusName);
    fd.append("department", department);
    fd.append("year", year);
    fd.append("description", description);
    fd.append("gender", gender);
    fd.append("apply", letter);
    fd.append("accept", false);
    if(firstName.length!==0 && lastName.length!==0 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)&& campusName.length!==0 
      &&department.length!==0 && description.length!==0 && letter.length!==0){
        applyData(fd);
        setSuc(true);
        setTimeout(() => {
          setSuc(false);
        }, 6000);
    }else{
        setWrongData(true);
        setTimeout(()=>{
          setWrongData(false);
        },6000);
      }
    
  };
  return (
    <div className="h-[100vh] w-[90%] overflow-scroll pt-14 flex items-center justify-center">
      <div className="w-[550px] h-[450px] mr-10 -mt-20">
        <p className="text-lg font-extrabold text-gray-500 my-1">What is the internet of things (IoT)?</p>
        <img alt='iot lab center'  src='./img/iot.png' className="w-full h-[420] object-cover bg-black" />
        <p className="text-sm my-3 text-gray-500">The internet of things, or IoT, is a system of interrelated 
         computing devices, mechanical and digital machines, objects, animals or people that are provided with 
         unique identifiers (UIDs) and the ability to transfer data over a network without requiring human-to-human 
         or human-to-computer interaction.A thing in the internet of things can be a person with a heart monitor 
         implant, a farm animal with a biochip transponder, an automobile that has built-in sensors to alert the 
         driver when tire pressure is low or any other natural or man-made object that can be assigned an 
         Internet Protocol (IP) address and is able to transfer data over a network.</p>
      </div>
      <div className="flex flex-col gap-y-4 items-center justify-center mt-3 mr-44">
        <p className="text-sm font-bold w-[300px]">
          Well Come To Debre Tabour IOT Lab Center
        </p>
        {succ && (
          <div className="absolute bg-white right-4 top-14 bg-white z-10 items-center py-2 px-2 flex flex-col border-2 border-emerald-400">
            <p className="text-lg font-bold text-emerald-500">
              {" "}
              Successfull!! you will join DTU-IOT ones the admin approves your request.
            </p>
          </div>
        )}
        {wrongData && (
          <div className="absolute bg-white right-4 top-14 bg-white z-10 items-center py-2 px-2 flex flex-col border-2 border-red-400">
            <p className="text-lg font-bold text-red-500">
              {" "}
              all fields are required please fill out correctly.
            </p>
          </div>
        )}
        <div className="flex gap-x-2 w-[300px] h-12 mx-10 -mt-2">
          <img
            src="./img/dtu.png"
            alt="kdd"
            className="my-1 h-[42px] w-15"
          />
          <p className="text-xs text-gray-500">
            Debretabor University Has a Historical Duty to Answer Tewodrose's Quest for Knowledges
            {" "}
          </p>
        </div>
        <div className="flex flex-col text-xs -mt-2">
          <input
            required
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className="h-8 w-[300px] px-2 focus:outline-none mt-2 border border-dotted border-emerald-400"
            placeholder="first name"
          />{" "}
          <input
            required
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="h-8 px-2 w-[300px] focus:outline-none mt-2 border border-dotted border-emerald-400"
            placeholder="last name"
          />{" "}
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="h-8 px-2 w-[300px] focus:outline-none mt-2 border border-dotted border-emerald-400"
            placeholder="Email address"
          />{" "}
          <input
            required
            onChange={(e) => setCampusName(e.target.value)}
            type="text"
            className="h-8 w-[300px] px-2 focus:outline-none mt-2 border border-dotted border-emerald-400"
            placeholder="your current campus name"
          />
          <input
            required
            onChange={(e) => setDepartement(e.target.value)}
            type="text"
            className="h-8 w-[300px] px-2 focus:outline-none mt-2 border border-dotted border-emerald-400"
            placeholder="your department"
          />
          <div className="flex justify-between mt-2 w-[300px] border border-dotted border-emerald-400">
            <p className="text-xs py-2 w-44 px-2 text-gray-500">
              select your department year
            </p>
            <select
              required
              onChange={(e) => setYear(e.target.value)}
              name=""
              id=""
              className="h-8 w-32  focus:outline-none bg-emerald-300"
            >
              <option value="2" defaultValue={2}>
                2
              </option>
              <option value="3" className="">
                3
              </option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex gap-x-2 text-gray-500 justify-between mt-2 border border-dotted w-[300px] h-8 border-emerald-400">
            <p className="text-sm text-gray-500 my-1 px-2">Gender</p>
            <div className="flex gap-3">
              <label htmlFor="male" className="my-[5px]">
                male
              </label>
              <input
                onChange={(e) => setGender(e.target.value)}
                type="radio"
                name="gender"
                id=""
                value="male"
                className="mt-2"
              />
              <label htmlFor="female" className="my-[5px]">
                female
              </label>
              <input
                onChange={(e) => setGender(e.target.value)}
                type="radio"
                name="gender"
                id=""
                value="female"
                className="mr-1 mt-2"
              />
            </div>
          </div>
          <textarea
            required
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id=""
            cols="30"
            rows="4"
            placeholder="Little description about you"
            className="mt-2 px-2 py-1 focus:outline-none border border-dotted border-emerald-400"
          ></textarea>
          <div className="flex gap-4 bg-emerald-400 text-white mt-3 w-[300px] h-8">
            <input
              required
              onChange={(e) => setLetter(e.target.files[0])}
              type="file"
              name="apply"
              id=""
              className="absolute h-8 opacity-0 w-[300px]"
            />
            <File className="my-1 mx-2" />
            <p className="my-2">add your apparent letter</p>
          </div>
          <button
            onClick={applyHandler}
            className="bg-emerald-400 text-white mt-3 w-[300px] h-8"
          >
            apply
          </button>
        </div>
      </div>
      <div className="h-[90vh] w-80 overflow-y-scroll absolute right-0 top-16 shadow-lg shadow-emerald-300">
        <div className="mx-4">
          <p className="text-sm font-bold my-4">
            Debre Tabour University
          </p>
          <p className="text-xs text-gray-500">
          Debre Tabor University was established in 2008. It is a non-profit public university, 
          officially recognised by the Ministry of Education of Ethiopia.As its name suggests, 
          the university is located in Debre Tabor, a town and woreda (district) in north-central Ethiopia.
          The university offers a range of degree programmes within the fields of technology, agriculture, 
          medicine and health sciences, business and economics, social science and humanities, natural and 
          computational sciences, law, information communication technology, and biotechnology. 
          There are both undergraduate and graduate courses available for students to study.
          </p>
          <img
            src="./img/background-.png"
            alt="alt"
            className="my-2 h-44 w-72"
          />
          <p className="text-sm font-bold my-4">Debretabor University Iot Lab Center</p>
          <p className="text-xs text-gray-500">
          IoT, known as the (Internet of Things) is there for the last 20 years or so. 
          But, today, the demand for IoT and related services is in great demand and is 
          about to reach 581 billion dollars globally. With enhanced technology dependency 
          in our day-to-day lives, it is critical to tap into IoT technology for businesses
         through connected smart devices.Businesses are introducing IoT technology in the 
         form of smart devices, which use embedded technology to collect and store data from 
         their surrounding environment. The use of RFID tech comes in the form of sensors, 
         processors, and communication hardware. Hence IoT certification training courses are 
         in great demand by enterprises globally, and certified professionals stand a chance to 
         quickly move ahead in their careers. Check out the list of popular Internet of Things 
         certification courses below to enrol today.
          </p>
          <img
            src="./img/ardunio-pins-cable.jpg"
            alt="alt"
            className="my-2 h-44 w-72"
          />
        </div>
      </div>
    </div>
  );
};

export default Apply;
