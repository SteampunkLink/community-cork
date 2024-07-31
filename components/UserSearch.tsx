"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchTerm("");
      router.push(`/connections/search?searchTerm=${searchTerm}`);
    } else {
      router.push("/connections");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-row w-full">
      <div className="w-full">
        <label htmlFor="searchTerm" className="sr-only">
          Search for Users
        </label>
        <input
          type="text"
          id="searchTerm"
          placeholder="User Search"
          className="w-full px-3 py-2 rounded-l-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="p-3 bg-[#1fd1f5] rounded-r-lg hover:bg-white focus:outline-none focus:ring focus:ring-blue-500"
      >
        <FaSearch />
      </button>
    </form>
  );
};
export default UserSearch;
