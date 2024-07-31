import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#04049e] border-t border-[#1fd1f5] text-white h-[5vh] flex flex-row gap-[8px] pl-[25px]">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </div>
  );
};

export default Footer;
