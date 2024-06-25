import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Connections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="flex flex-row justify-center bg-emerald-200">
        <Link
          className="bg-emerald-500 m-5 p-2 drop-shadow-md"
          href="/connections/friends"
        >
          Friends
        </Link>
        <Link
          className="bg-emerald-500 m-5 p-2 drop-shadow-md"
          href="/connections/followers"
        >
          Followers
        </Link>
        <Link
          className="bg-emerald-500 m-5 p-2 drop-shadow-md"
          href="/connections/following"
        >
          Following
        </Link>
      </nav>
      <div className="bg-emerald-700/70">{children}</div>
    </div>
  );
}
