"use client";

import { useState } from "react";
import BlacklistRemoveBtn from "./BlacklistRemoveBtn";

interface IBlacklistProps {
  blacklist: {
    uid: string;
    user: string;
  }[];
}

const Blacklist = ({ blacklist }: IBlacklistProps) => {
  const [showBlacklist, setShowBlacklist] = useState(false);
  return (
    <div>
      <div className="flex flex-row items-center mb-[25px]">
        <h3 className="text-2xl text-white font-bold">Blacklist</h3>
        <button
          className="bg-[#ec8d9a] text-black p-2 mx-4 mt-4 rounded shadow-sm hover:bg-slate-300"
          onClick={() => setShowBlacklist(!showBlacklist)}
        >
          {showBlacklist ? "Hide" : "Show"} Blacklist
        </button>
      </div>

      {showBlacklist ? (
        <>
          {blacklist.map((blacklisteduser) => (
            <div
              key={blacklisteduser.uid}
              className="flex flex-row bg-[#2d2d4f] text-white m-5 p-2 rounded-lg items-center justify-evenly"
            >
              <div className="text-2xl">{blacklisteduser.user}</div>
              <BlacklistRemoveBtn
                userName={blacklisteduser.user}
                userId={blacklisteduser.uid}
              />
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default Blacklist;
