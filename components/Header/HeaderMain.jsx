"use client";

import React from "react";
import Link from "next/link";
import { FiAlignJustify, FiSettings } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const HeaderMain = () => {
  return (
    <div className="bg-primary-color w-full flex justify-center pt-3 pb-1 items-center">
      <div className="flex w-full max-w-7xl justify-between">
        <div className="">Logo</div>
        <div className="font-latoFont italic flex justify-evenly gap-3">
          <Link href="/LiveSchedule">
            <h1>Live Schedule</h1>
          </Link>
          <Link href="/LiveStream">
            <h1>Live Stream</h1>
          </Link>
          <Link href="/Football">
            <h1>Football</h1>
          </Link>
          <Link href="/Basketball">
            <h1>Basketball</h1>
          </Link>
          <Link href="/OtherSports">
            <h1>Other Sports</h1>
          </Link>
        </div>
        <div className="flex justify-evenly gap-3 items-center">
          <FiAlignJustify className="w-7 h-7" />
          <FiSettings className="w-[24px] h-[24px]" />
          <FaUser className="w-[24px] h-[24px]" />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
