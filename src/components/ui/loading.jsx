import { DotLoader } from "react-spinners";

const Loading = () => {
  const theme = JSON.parse(localStorage.getItem("dark"));
  const bgColor = theme ? "bg-[#1d232a]" : "bg-base-100";
  const textColor = theme ? "text-gray-200" : "text-black";
  const loaderColor = theme ? "#ffffff" : "#000000";

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${bgColor} `}
    >
      <DotLoader color={loaderColor} />
      <span
        className={`mt-6 ${textColor} text-xl font-semibold tracking-wide animate-pulse`}
      >
        Loading<span className="animate-bounce">...</span>
      </span>
    </div>
  );
};

export default Loading;
