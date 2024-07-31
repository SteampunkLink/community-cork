"use client";

import { useState, useEffect } from "react";
import { FaCheck, FaRegTimesCircle, FaSpinner } from "react-icons/fa";
import isNameAvailable from "@/config/queries/isNameAvailable";
import updateDisplayName from "@/config/actions/updateDisplayName";

interface IChangeDisplayNameInputProps {
  existingName: string;
}

const ChangeDisplayNameInput = ({
  existingName,
}: IChangeDisplayNameInputProps) => {
  const [updatedDisplayName, setUpdatedDisplayName] = useState("");
  const [isDisplayNameAvailable, setIsDisplayNameAvailable] = useState(false);
  const [isNameCheckLoading, setIsNameCheckLoading] = useState(false);

  useEffect(() => {
    if (existingName) {
      setUpdatedDisplayName(existingName);
    }
  }, []);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNameCheckLoading(true);
    setUpdatedDisplayName(e.target.value);
    const isValueAvailable = await isNameAvailable(e.target.value);
    setIsDisplayNameAvailable(isValueAvailable);
    setIsNameCheckLoading(false);
  };
  const handleSubmit = async () => {
    await updateDisplayName(updatedDisplayName);
    window.location.reload();
  };
  return (
    <div className="flex flex-row">
      <input
        className="color-slate-200 border-2 border-black shadow-sm"
        type="text"
        aria-label="update display name (must be unique)"
        value={updatedDisplayName}
        onChange={(e) => handleChange(e)}
      />
      <button
        disabled={!isDisplayNameAvailable}
        onClick={handleSubmit}
        className="flex flex-row items-center justify-center shadow-sm w-10 bg-slate-200"
      >
        {isNameCheckLoading ? (
          <FaSpinner />
        ) : isDisplayNameAvailable ? (
          <FaCheck className="text-green-600" />
        ) : (
          <FaRegTimesCircle className="text-red-600" />
        )}
      </button>
    </div>
  );
};

export default ChangeDisplayNameInput;
