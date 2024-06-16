"use client";

import HlsPlayer from "@/components/Players/HlsPlayer";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LiveStreaming = () => {
  const searchParams = useSearchParams();
  const [vedioSrc, setVedioSrc] = useState("");

  useEffect(() => {
    const vedioSrcParam = searchParams.get("vedioSrc");
    if (vedioSrcParam) {
      console.log("Video Source:", vedioSrcParam);
      setVedioSrc(decodeURIComponent(vedioSrcParam));
    } else {
      console.error("No vedioSrc parameter found in the URL.");
    }
  }, [searchParams]);

  if (!vedioSrc) {
    return <div>Loading...</div>;
  }

  return <HlsPlayer src={vedioSrc} />;
};

export default LiveStreaming;
