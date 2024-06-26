"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { FaTelegram, FaSquareWhatsapp } from "react-icons/fa6";
import "./hlsstyle.css";

import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";

const HlsPlayer = ({ src, startTime }) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [streams, setStreams] = useState([]);
  // const [currentStream, setCurrentStream] = useState("");
  const [fixtures, setFixtures] = useState({ today: [], nextDay: [] });
  const [currentStream, setCurrentStream] = useState("");
  const [matchDetails, setMatchDetails] = useState(null); // State to hold match details

  useEffect(() => {
    if (videoRef.current && src) {
      const video = videoRef.current;
      let hls;

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            setHasError(true);
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
        video.addEventListener("error", () => {
          setHasError(true);
        });
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [src]);

  useEffect(() => {
    if (hasError) {
      const updateRemainingTime = () => {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp (seconds)
        const timeDifference = startTime - currentTime;

        if (timeDifference <= 0) {
          setRemainingTime("The match has started!");
        } else {
          const days = Math.floor(timeDifference / (3600 * 24));
          const hours = Math.floor((timeDifference % (3600 * 24)) / 3600);
          const minutes = Math.floor((timeDifference % 3600) / 60);
          const seconds = timeDifference % 60;

          setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      };

      updateRemainingTime();
      const interval = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [hasError, startTime]);

  useEffect(() => {
    const fetchFixtures = async () => {
      const apiKey = "7e9555999cmsh27c7d1203fc284bp113fe6jsn6971223d989e";
      const apiHost = "api-football-v1.p.rapidapi.com";

      const todayDate = dayjs().format("YYYY-MM-DD");
      const nextDayDate = dayjs().add(1, "day").format("YYYY-MM-DD");

      try {
        const responseToday = await axios.get(
          `https://${apiHost}/v3/fixtures`,
          {
            headers: {
              "x-rapidapi-key": apiKey,
              "x-rapidapi-host": apiHost,
            },
            params: {
              date: todayDate,
            },
          }
        );
        const copaAmericaMatchesToday = responseToday.data.response.filter(
          (fixture) => fixture.league.name === "J1 League"
        );

        const responseNextDay = await axios.get(
          `https://${apiHost}/v3/fixtures`,
          {
            headers: {
              "x-rapidapi-key": apiKey,
              "x-rapidapi-host": apiHost,
            },
            params: {
              date: nextDayDate,
            },
          }
        );
        const matchIdToFind = 1166323; // Example match ID to filter by
        const todayMatchesFiltered = responseToday.data.response.filter(
          (fixture) => fixture.fixture.id === matchIdToFind
        );

        if (todayMatchesFiltered.length > 0) {
          setMatchDetails(todayMatchesFiltered[0]); // Set the first match found as matchDetails
        } else {
          console.log("Match not found.");
        }

        if (todayMatchesFiltered.length > 0) {
          setMatchDetails(todayMatchesFiltered[0]); // Set the first match found as matchDetails
        } else {
          console.log("Match not found.");
        }
        // const copaAmericaMatches = responseNextDay.data.response.filter(
        //   (fixture) => fixture.league.name === "Copa America"
        // );

        // setFixtures({
        //   today: copaAmericaMatchesToday,
        //   nextDay: copaAmericaMatches,
        // });

        // console.log(responseToday.data.response, "todays all match...");
        // console.log("Today's Fixtures:", copaAmericaMatchesToday);
        // console.log("Next Day's Fixtures:", copaAmericaMatches);
        console.log(todayMatchesFiltered, "todays next match..");
      } catch (error) {
        console.error("Error fetching fixtures:", error);
      }
    };

    fetchFixtures();
  }, []);

  return (
    <>
      <div className="w-full items-center justify-center flex my-7">
        <div className="w-full max-w-5xl p-2 bg-slate-400">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            quod!
          </h1>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-9">
        {hasError ? (
          <div className="w-full max-w-5xl p-4 bg-red-500 text-white text-center">
            {remainingTime ? (
              <>
                The video feed is currently unavailable. Time remaining until
                the feed starts: {remainingTime}
              </>
            ) : (
              <>
                The video feed is currently unavailable. Please try again later.
              </>
            )}
          </div>
        ) : (
          <video ref={videoRef} controls className="w-full h-full max-w-5xl" />
        )}
      </div>
      <div className="flex w-full justify-center gap-7 items-center mt-6">
        <div className="bg-primary-color p-2 overflow-hidden rounded-md">
          <FaTelegram className="w-16 h-16" />
        </div>
        <div className="bg-primary-color p-2 overflow-hidden rounded-md">
          <FaSquareWhatsapp className="w-16 h-16" />
        </div>
      </div>
      {matchDetails && (
        <div className="flex flex-col items-center justify-center w-full my-7 text-black ">
          <h1 className="text-[#294CA6] font-bold text-2xl">Match Details </h1>
          <div className="flex items-center justify-center">
            <div className="p-4 bg-gray-200 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">
                Match ID: {matchDetails.fixture.id}
              </h2>
              <div className="flex items-center mt-2">
                <Image
                  src={matchDetails.teams.home.logo}
                  alt={matchDetails.teams.home.name}
                  width={50}
                  height={50}
                />
                <span className="mx-2">{matchDetails.teams.home.name}</span>
                <span className="mx-2">
                  {matchDetails.score.fulltime.home} -{" "}
                  {matchDetails.score.fulltime.away}
                </span>
                <span className="mx-2">{matchDetails.teams.away.name}</span>
                <Image
                  src={matchDetails.teams.away.logo}
                  alt={matchDetails.teams.away.name}
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HlsPlayer;
