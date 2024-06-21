"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { FaTelegram, FaSquareWhatsapp } from "react-icons/fa6";

const HlsPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      let hls;

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
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
  }, [src]);

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
