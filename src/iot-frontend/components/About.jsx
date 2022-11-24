import React from "react";

const About = () => {
  return (
    <div className="flex pb-20  flex-col items-center justify-center mt-40">
      <p className="text-lg font-bold -mt-20">about our teams</p>
      <p className="text-sm w-96">
        We have made this website for DTU IoT lab center after joining them as
        interns for four months. This is our first complete project. we want to
        thank the center for giving us a chnace to build this website. this
        website will be updated frequently to keep it up to date.
      </p>
      <p className="text-xl font-extrabold text-gray-600 px-2 py-2">
        here we are
      </p>
      <div className="flex gap-10">
        <div className="flex flex-col gap-2 w-64 bg-red-300 items-center justify-center mt-2">
          <img
            src="./img/gedi.jpg"
            alt=""
            className="h-40 w-40 object-fill rounded-full mt-2"
          />
          <p className="text-sm font-bold text-gray-500 w-44  mt-2">
            my name is Gedeon Agmas students @ bahirdar university and i am a
            backend web developer
          </p>
        </div>
        <div className="flex flex-col gap-2 w-64 bg-green-300 items-center justify-center mt-2">
          <img
            src="./img/paul.jpg"
            alt=""
            className="h-44 w-44 rounded-full mt-2"
          />
          <p className="text-sm font-bold text-gray-500 w-44 mt-2">
            my name is Paulos Desalegn students @ bahirdar university and i am a
            web designer
          </p>
        </div>
        <div className="flex flex-col gap-2 w-64 bg-yellow-300 items-center justify-center mt-2">
          <img
            src="./img/kibre.jpg"
            alt=""
            className="h-44 w-44 rounded-full mt-2"
          />
          <p className="text-sm font-bold text-gray-500 w-44">
            my name is Kibrebel Wondmu students @ bahirdar university and i am a
            front end web developer
          </p>
        </div>
      </div>
      <p className="text-sm font-bold mt-5">contact us</p>
      <div className="flex gap-20 mt-2">
        <div className="">
          <p className="text-sm font-bold text-gray-500">email</p>
          <p className="text-xs text-gray-500">gedeonagmas2580@gmail.com</p>
          <p className="text-xs text-gray-500">paulosdesalegn@gmail.com</p>
          <p className="text-xs text-gray-500">wKibrebal2426@gmail.com</p>
        </div>
        <div className="">
          <p className="text-sm font-bold text-gray-500">phone</p>
          <p className="text-xs text-gray-500">+251 954104637</p>
          <p className="text-xs text-gray-500">+251 930960037</p>
          <p className="text-xs text-gray-500">+251 924268310</p>
        </div>
        <div className="">
          <p className="text-sm font-bold text-gray-500">social</p>
          <p className="text-xs text-gray-500">facebook</p>
          <p className="text-xs text-gray-500">telegram</p>
          <p className="text-xs text-gray-500">twitter</p>
        </div>
      </div>
    </div>
  );
};

export default About;
