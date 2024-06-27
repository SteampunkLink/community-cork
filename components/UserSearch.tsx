"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <form
      onSubmit={submitHandler}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="searchTerm" className="sr-only">
          Search for Users
        </label>
        <input
          type="text"
          id="searchTerm"
          placeholder="Enter SearchTerm"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};
export default UserSearch;
