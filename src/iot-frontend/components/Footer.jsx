import React from "react";
import Copy from "@mui/icons-material/Copyright";
import Phone from "@mui/icons-material/Phone";
import Twitter from "@mui/icons-material/Twitter";
import Facebook from "@mui/icons-material/Facebook";
import Telegram from "@mui/icons-material/Telegram";

const Footer = () => {
  return (
    <div className="relative top-1">
      <div className="flex justify-between bg-black text-white h-32 w-[100%] px-16">
        <div className="font-bold m-2">
          <div className=" cursor-pointer hover:underline">
            <p className="text-2xl shadow-2xl">DTU IOT</p>
            <p>Lab Center</p>
          </div>

          <div className="mt-2 flex flex-col">
            <div className="flex cursor-pointer hover:underline">
              <Copy className="p-1" />
              <span className="text-xs font-light mt-1">
                All Rights Reserved 2022
              </span>
            </div>
            <p className="text-xs font-medium ml-1 cursor-pointer hover:underline">
              Debre Tabour IOT Lab Center
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col place-items-center">
          <p className="font-bold cursor-pointer hover:underline">Location</p>
          <p className="text-xs mt-2 cursor-pointer hover:underline">
            Debre Tabour University
          </p>
          <p className="text-xs mr-7 mt-2 hover:underline cursor-pointer">
            block 32 2 <sup>nd</sup> floor
          </p>
          <p className="text-xs font-bold mt-2 cursor-pointer hover:underline">
            Debre Tabour, DT2354
          </p>
        </div>
        <div className="mt-4 flex flex-col place-items-center pr-10">
          <p className="font-bold cursor-pointer hover:underline">Contact</p>
          <div className="flex mt-2 cursor-pointer hover:underline">
            <Phone className="p-1 mr-2" />
            <p className="text-xs mt-1">+2510584410043</p>
          </div>
          <div className="flex cursor-pointer hover:underline">
            <Phone className="p-1 mr-2" />
            <p className="text-xs mt-1">+2510584410043</p>
          </div>
          <p className="text-xs pl-4  cursor-pointer hover:underline">
            dtuiotcenter@gmail.com
          </p>
        </div>
        <div className="mt-4 flex flex-col place-items-center">
          <p className="font-bold cursor-pointer hover:underline">Legal</p>
          <p className="text-xs mt-3 cursor-pointer hover:underline">
            Terms of Use
          </p>
          <p className="text-xs mt-1 cursor-pointer hover:underline">
            Help Center
          </p>
          <p className="text-xs mt-1 pl-1 cursor-pointer hover:underline">
            Privacy Policy
          </p>
        </div>
        <div className="mt-4 flex flex-col place-items-center mr-32">
          <p className="font-bold  cursor-pointer hover:underline">Social</p>
          <div className="flex mt-3 cursor-pointer hover:underline">
            <Facebook className="p-1" />
            <p className="text-xs mt-[2px] ">facebook</p>
          </div>
          <div className="flex cursor-pointer hover:underline mr-4">
            <Twitter className="p-1" />
            <p className="text-xs mt-[2px]">twitter</p>
          </div>
          <div className="flex cursor-pointer hover:underline hover:animate-bounce">
            <Telegram className="p-1" />
            <p className="text-xs mt-[2px]">telegram</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
