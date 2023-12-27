import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="w-screen h-screen p-8 flex justify-center items-center bg-primary flex-col gap-[50px]">
      <h2 className="text-5xl text-white font-bold">Learning Body Language</h2>
      <div className="text-xl text-white font-medium">
        Free Body Language education for the world.
      </div>
      <Link
        to="/goal"
        className="text-xl text-primary text-center font-bold px-6 py-3 bg-white w-1/2 rounded-3xl cursor-pointer"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
