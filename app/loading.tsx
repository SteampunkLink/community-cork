import { FaSpinner } from "react-icons/fa";

const loading = () => {
  return (
    <div className="vw-100 flex flex-row justify-center">
      <FaSpinner className="animate-spin text-8xl text-[#ecec8d] mt-[120px]" />
    </div>
  );
};

export default loading;
