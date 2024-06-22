"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { FaTelegram, FaSquareWhatsapp } from "react-icons/fa6";

const HlsPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const fetchVideoSrc = () => {
      var request = new XMLHttpRequest();
      request.open(
        "GET",
        "https://thunderbolt-40gbps.com/play/PnQ3VmHsRVzM_QWgtl7rxhFtj8cY6EgYT5e3b_XXu60ml9ERyMtLp_YVbls3o-57",
        true
      );
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          setVideoSrc(request.responseURL);
        }
      };
      request.send();
    };

    fetchVideoSrc();
  }, []);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      const video = videoRef.current;
      let hls;

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
  }, [videoSrc]);

  return (
    <>
      <div className=" w-full items-center justify-center flex my-7 ">
        <div className=" w-full max-w-5xl p-2 bg-slate-400 ">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            quod!
          </h1>
        </div>
      </div>
      <div className="  w-full flex items-center justify-center mt-9  ">
        <video ref={videoRef} controls className=" w-full h-full max-w-5xl " />
      </div>
      <div className=" flex w-full justify-center gap-7 items-center mt-6">
        <div className=" bg-primary-color p-2  overflow-hidden rounded-md ">
          <FaTelegram className=" w-16 h-16  " />
        </div>
        <div className=" bg-primary-color p-2  overflow-hidden rounded-md ">
          <FaSquareWhatsapp className=" w-16 h-16  " />
        </div>
      </div>
    </>
  );
};

export default HlsPlayer;
