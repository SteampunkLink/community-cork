import React from "react";

const Modal = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black/50 z-20 overflow-auto flex justify-center items-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        {children}
      </div>
    </div>
  );
};

export default Modal;
