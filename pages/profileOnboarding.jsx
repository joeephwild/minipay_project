import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { logo } from "../assets/images";
import { languages } from "../utils";
import { useUser } from "../context/ProfileContext";

const ProfileOnboarding = () => {
  const [selectedSpeakLanguage, setSelectedSpeakLanguage] = useState("");
  const [selectedLearnLanguage, setSelectedLearnLanguage] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const filterForLanguageImage = () => {
      const languageFilter = languages.filter(
        (item) => item.name === selectedLearnLanguage
      );
      const imageResult = languageFilter.map((item) => item.image);
      setImage(imageResult[0]);
    };
    filterForLanguageImage();
  }, [selectedLearnLanguage]);

  const { createProfile } = useUser();

  const handleLanguageSelect = async (image) => {
    if (step === 1) {
      setSelectedSpeakLanguage(image);
    } else {
      setSelectedLearnLanguage(image);
    }
  };

  const handleSubmit = async () => {
    await createProfile(selectedSpeakLanguage, selectedLearnLanguage, userName, image);
  };

  return (
    <div className="mx-4 md:mx-[120px] my-4 md:my-[70px] overflow-y-scroll">
      <div className="flex items-center">
        <Image src={logo} alt="logo" className="w-12 h-12 md:w-[58px] md:h-[58px] object-contain" />
        <span className="text-Black text-lg md:text-[32px] font-bold">Lancent</span>
      </div>

      {step === 1 && (
        <span className="flex items-center justify-center text-lg md:text-[28px] text-Black">
          What language do you speak?
        </span>
      )}
      {step === 2 && (
        <span className="flex items-center justify-center text-lg md:text-[28px] text-Black">
          What language do you want to learn?
        </span>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 mt-4 md:mt-[115px] items-center justify-center gap-4 md:gap-[40px]">
        {languages.map((item, i) => (
          <div
            onClick={() => handleLanguageSelect(item.name)}
            key={i}
            className={`${
              (step === 1 && selectedSpeakLanguage === item.name) ||
              (step === 2 && selectedLearnLanguage === item.name)
                ? "bg-Accent"
                : "bg-white"
            }  px-2 md:px-[77px] py-2 md:py-[20px] flex flex-col items-center space-y-2 md:space-y-[36px]`}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={72}
              height={72}
              className="w-8 h-8 md:w-[116px] md:h-[80px] object-contain"
            />
            <span className="text-Black text-xs md:text-base">{item.name}</span>
          </div>
        ))}
      </div>

      {step === 2 && (
        <form action="" className="flex items-center justify-center w-full mt-4">
          <label className="flex flex-col items-start space-y-2 md:space-y-8">
            <span className="text-Black text-xs md:text-[16px] font-normal">UserName</span>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="bg-Grey/50 text-Black outline-none focus:outline-none border-Grey border w-full h-[45px]"
            />
          </label>
        </form>
      )}

      <div className="flex items-center justify-center w-full mt-4">
        {step === 1 && (
          <button
            className="bg-Accent px-4 py-2 md:px-[145px] md:py-[15px] text-Black"
            onClick={() => setStep(2)}
          >
            Next
          </button>
        )}
        {step === 2 && (
          <button
            className="bg-Accent px-4 py-2 md:px-[145px] md:py-[15px] text-Black"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileOnboarding;
