import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center justify-center p-4 transition rounded-full w-14 h-14 hover:bg-blue-300hover:bg-opacity-10cursor-pointer">
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;
