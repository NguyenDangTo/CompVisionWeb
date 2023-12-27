import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";

const Goal = () => {
  const [lesson, setLesson] = useState(null);

  const navigate = useNavigate();

  const handleContinue = () => {
    if (!lesson) return alert("Please select a lesson");

    navigate(`/goal/${lesson}/question`);
  };
  const handleLessonSelect = (selectedLesson) => {
    setLesson(selectedLesson);
    console.log(selectedLesson);
  };
  return (
    <div className="w-screen h-screen p-8 flex items-center bg-primary flex-col gap-[50px]">
      <h2 className="text-2xl text-white font-bold">Pick a lesson</h2>
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        {/* Option 1 */}
        <div className={`w-1/2`}>
          <div
            className={` flex items-center gap-4 w-full bg-white p-5 border-2 border-black rounded-lg cursor-pointer relative`}
            onClick={() => handleLessonSelect("1")}
          >
            <RiNumber1 />
            <div className="flex flex-col">
              <div className="w-full text-lg font-semibold">Number</div>
              <div className="w-full text-sm">
                You will learn about numbers.
              </div>
            </div>

            {lesson === "1" && (
              <div className="absolute top-[50%] translate-y-[-50%] right-10 bg-green p-2 rounded-full">
                <FaCheck className="text-2xl text-white" />
              </div>
            )}
          </div>
        </div>
        {/* Option 2 */}
        <div className={`w-1/2`}>
          <div
            className={`flex items-center gap-4 w-full bg-white p-5 border-2 border-black rounded-lg cursor-pointer relative`}
            onClick={() => handleLessonSelect("2")}
          >
            <RiNumber2 />
            <div className="flex flex-col">
              <div className="w-full text-lg font-semibold">Letter</div>
              <div className="w-full text-sm">
                You will learn about the alphabet.
              </div>
            </div>

            {lesson === "2" && (
              <div className="absolute top-[50%] translate-y-[-50%] right-10 bg-green p-2 rounded-full">
                <FaCheck className="text-2xl text-white" />
              </div>
            )}
          </div>
        </div>
        {/* Option 3 */}
        <div className={`w-1/2`}>
          <div
            className={`flex items-center gap-4 w-full bg-white p-5 border-2 border-black rounded-lg cursor-pointer relative`}
            onClick={() => handleLessonSelect("3")}
          >
            <RiNumber3 />
            <div className="flex flex-col">
              <div className="w-full text-lg font-semibold">Sentences</div>
              <div className="w-full text-sm">
                You will learn about the sentences used in the daily life.
              </div>
            </div>

            {lesson === "3" && (
              <div className="absolute top-[50%] translate-y-[-50%] right-10 bg-green p-2 rounded-full">
                <FaCheck className="text-2xl text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        to="/goal"
        className="text-xl text-primary text-center font-bold px-6 py-3 bg-white w-1/2 rounded-3xl cursor-pointer"
        onClick={handleContinue}
      >
        Continue
      </div>
    </div>
  );
};

export default Goal;
