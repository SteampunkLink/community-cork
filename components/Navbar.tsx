"use client";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

import { FaGoogle } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import defaultProfileImage from "@/assets/images/profile.png";

import checkUserStatus from "@/config/actions/checkUserStatus";
import FirstTimeModal from "./FirstTimeModal";
import UserSearch from "./UserSearch";

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user.image || defaultProfileImage;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDisplayNameModalOpen, setIsDisplayNameModalOpen] = useState(false);

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const pathName = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();

    const checkForDisplayName = async () => {
      const displayNameIsDefault = await checkUserStatus();
      if (displayNameIsDefault) {
        setIsDisplayNameModalOpen(true);
      } else {
        setIsDisplayNameModalOpen(false);
      }
    };
    checkForDisplayName();
  }, []);

  return (
    <nav className="bg-[#04049e] border-b border-[#1fd1f5] h-[10vh]">
      {isDisplayNameModalOpen ? <FirstTimeModal /> : null}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          {/* Desktop Menu */}
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link
              className={`flex flex-shrink-0 items-center rounded-md px-3 ${
                pathName === "/"
                  ? "text-blue-300"
                  : "text-white hover:underline hover:text-gray-300"
              }`}
              href="/"
            >
              <FaStickyNote className="h-10 w-auto" />
              <span className="hidden md:block text-2xl ml-2">
                CommunityCork
              </span>
            </Link>
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                {!!session ? (
                  <>
                    <Link
                      href="/connections"
                      className={`rounded-md items-center px-3 py-2 ${
                        pathName?.split("/")[1] === "connections"
                          ? "text-[#1fd1f5]"
                          : "text-white hover:underline hover:text-gray-300"
                      }`}
                    >
                      My Connections
                    </Link>
                    <Link
                      href="/myposts"
                      className={`rounded-md items-center px-3 py-2 ${
                        pathName?.split("/")[1] === "myposts"
                          ? "text-blue-300"
                          : "text-white hover:underline hover:text-gray-300"
                      }`}
                    >
                      My Posts
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          {/* End Desktop Menu */}
          {!!session ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              {/* Right Menu Logged In */}
              <div className="hidden md:ml-6 md:block">
                <UserSearch />
              </div>
              {/* Profile Menu Button */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-10 w-10 rounded-full border-2 border-white"
                      src={profileImage}
                      alt="Profile Image"
                      height={40}
                      width={40}
                    />
                  </button>
                </div>
                {/* End Profile Menu Button */}
                {isProfileMenuOpen ? (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    {/* Profile Menu */}
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut();
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Sign Out
                    </button>
                    {/* End Profile Menu */}
                  </div>
                ) : null}
              </div>
              {/* End Right Menu Logged In */}
            </div>
          ) : (
            <div className="hidden md:block md:ml-6">
              {/* Right Menu Logged Out */}
              <div className="flex items-center">
                {providers
                  ? Object.values(providers).map((provider, idx) => (
                      <button
                        key={idx}
                        onClick={() => signIn(provider.id)}
                        className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                      >
                        <FaGoogle className="text-white mr-2" />
                        <span>Login or Register</span>
                      </button>
                    ))
                  : null}
              </div>
              {/* End Right Menu Logged Out */}
            </div>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen ? (
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <UserSearch />
            <Link
              href="/connections"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              My Connections
            </Link>
            <Link
              href="/myposts"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              My Posts
            </Link>
            {!session ? (
              <>
                {providers
                  ? Object.values(providers).map((provider, idx) => (
                      <button
                        key={idx}
                        onClick={() => signIn(provider.id)}
                        className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4"
                      >
                        <FaGoogle className="mr-2" />
                        <span>Login or Register</span>
                      </button>
                    ))
                  : null}
              </>
            ) : null}
          </div>
        </div>
      ) : null}
      {/* End Mobile Menu */}
    </nav>
  );
};

export default Navbar;
