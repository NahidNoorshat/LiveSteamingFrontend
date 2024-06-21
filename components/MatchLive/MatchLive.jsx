import React from "react";
import Star from "../../public/FilterIcons/StarIcon.svg";
import livetv from "../../public/Addbanner/livetv.svg";
import Ellipse2 from "../../public/Addbanner/Ellipse2.png";
import { useRouter } from "next/navigation";

import Image from "next/image";

const MatchLive = ({
  vedioSrc,
  team1Name,
  team1Image,
  team2Name,
  team2Image,
}) => {
  console.log(vedioSrc, "this is steam list");
  const router = useRouter();
  const handleclick = () => {
    console.log("|Cliked....");
    router.push(`/LiveStreaming?vedioSrc=${encodeURIComponent(vedioSrc)}`);
  };
  return (
    <>
      <div
        onClick={handleclick}
        className=" bg-primary-color w-full flex items-center justify-between rounded-md px-2 cursor-pointer "
      >
        <div className=" flex items-center gap-3  p-2">
          <Image src={Star} />
          <div className=" flex flex-col items-center gap-3 ">
            <div className=" flex items-center gap-2 ">
              <div className=" w-[22px] h-[22px] rounded-full flex items-center   ">
                <Image src={team1Image} width={22} height={22} />
              </div>
              <h1 className=" text-sm">{team1Name}</h1>
            </div>
            <div className=" flex items-center gap-2 ">
              <div className=" w-[22px] h-[22px] rounded-full flex items-center   ">
                <Image src={team2Image} width={22} height={22} />
              </div>
              <h1 className=" text-sm  ">{team2Name}</h1>
            </div>
          </div>
        </div>
        <div className=" flex gap-4 items-center  ">
          <h1> Live</h1>
          <div className="">
            <Image src={livetv} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchLive;
