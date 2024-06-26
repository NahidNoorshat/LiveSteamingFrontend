"use client";

import Filter from "@/components/Filter/Filter";
import Image from "next/image";
import Star from "../../public/FilterIcons/StarIcon.svg";
import Filterfill from "../../public/FilterIcons/filterfill.svg";
import Addbannder1 from "../../public/Addbanner/Addbanner1.png";
import Ellipse1 from "../../public/Addbanner/Ellipse1.svg";
import Ellipse2 from "../../public/Addbanner/Ellipse2.png";
import livetv from "../../public/Addbanner/livetv.svg";
import { useRouter } from "next/navigation";
import SrcIcon from "../../public/FilterIcons/srceicon.svg";
import LatestNews from "@/components/LatestNews/LatestNews";
import HotLive from "@/components/HotLive/HotLive";
import MatchLive from "@/components/MatchLive/MatchLive";
import MatchSchedule from "@/components/MatchSchedule/MatchSchedule";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const handleclick = () => {
    console.log("|Cliked....");
    router.push("/LiveStreaming");
  };
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          "https://mcdonalds.yourlile.tech/api/matches/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMatches(data.filter((match) => match.sport_type === "Other Sports"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMatches();
  }, []);
  return (
    <>
      <div className=" w-full h-full flex justify-center my-3  ">
        <div className=" w-full max-w-7xl flex flex-col md:flex-row h-full gap-y-3  ">
          <div className=" w-full md:w-2/3  flex flex-col gap-2 px-3  ">
            <div className=" flex justify-around ">
              <Filter title={"All"} />
              <Filter title={"Live"} />
              <Filter Icons={Star} />
              <Filter Icons={Filterfill} />
              <Filter />
            </div>
            <div className=" w-full rounded-md my-2  relative  ">
              <Image src={Addbannder1} className=" w-[835px] " />
              <div className=" absolute top-2 left-3 bg-white rounded-md flex items-center justify-center text-black px-2  ">
                <h1>ad</h1>
              </div>
            </div>
            <div className=" w-full bg-secondary-color px-2 flex items-center gap-3 rounded-md py-1  ">
              <Image src={Ellipse1} />
              <h1 className=" text-base  ">Live Match Today</h1>
            </div>
            <div className=" w-full bg-secondary-color px-2 flex items-center gap-3 rounded-md py-1  ">
              <Image src={Star} className=" w-[24px] h-[24px] " />
              <h1 className=" text-base  ">Badminton</h1>
            </div>
            <div className=" w-full bg-secondary-color px-2 flex items-center gap-3 rounded-md py-1  ">
              <h1 className=" text-base  ">T1 League</h1>
            </div>
            {/* starting compy */}
            {matches.map((match) => (
              <MatchLive
                key={match.id}
                vedioSrc={match.m3u8_link}
                team1Name={match.team1_name}
                team1Image={match.team1_image}
                team2Name={match.team2_name}
                team2Image={match.team2_image}
              />
            ))}
          </div>
          <div className=" w-full md:w-1/3 flex flex-col gap-y-4 px-2 ">
            <div className=" w-full rounded-md bg-primary-color p-2   ">
              <div className=" flex w-full bg-secondary-color rounded-md p-1 ">
                <Image src={SrcIcon} />
                <input className=" w-full bg-secondary-color outline-none   " />
              </div>
            </div>
            <div className=" w-full rounded-md bg-primary-color p-2 flex flex-col gap-3 ">
              <div className=" flex  ">
                <div className=" w-[17px] border-l-4 border-[#00FFCE]   "></div>
                <h1>Latest News</h1>
              </div>
              <div className=" bg-secondary-color p-2 rounded-md  ">
                <div className=" flex flex-col gap-y-3 ">
                  <LatestNews />
                  <LatestNews />
                </div>
              </div>
            </div>
            <div className=" w-full rounded-md bg-primary-color p-2 flex flex-col gap-3 ">
              <div className=" flex  ">
                <div className=" w-[17px] border-l-4 border-[#00FFCE]   "></div>
                <h1>Hot Live Sports</h1>
              </div>
              <div className=" bg-secondary-color p-2 rounded-md ">
                <div className=" flex flex-col gap-y-3 ">
                  <HotLive />
                  <HotLive />
                  <HotLive />
                  <HotLive />
                  <HotLive />
                </div>
              </div>
            </div>
            <div className="">
              <MatchSchedule />
              <MatchSchedule />
              <MatchSchedule />
              <MatchSchedule />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
