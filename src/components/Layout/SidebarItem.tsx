import { loginModalState } from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/userCurrentUser";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { useSetRecoilState } from "recoil";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  href?: string;
  label: string;
  icon: IconType;
  auth?: boolean;
  alert?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon: Icon,
  label,
  auth,
  alert,
  onClick,
}) => {
  const setLoginState = useSetRecoilState(loginModalState);
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();

    if (auth && !currentUser) {
      setLoginState((prev) => ({
        ...prev,
        isOpen: true,
      }));
    } else if (href) router.push(href);
  }, [router, onClick, href, currentUser, auth, setLoginState]);

  return (
    <div onClick={handleClick} className="flex items-center">
      <div className="relative flex items-center justify-center p-4 rounded-full cursor-pointer h-14 w-14 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="absolute left-0 text-sky-500 -top-4" size={70} />
        ) : null}
      </div>
      <div className="relative items-center hidden gap-4 p-4 rounded-full cursor-pointer lg:flex hover:bg-slate-300 hover:bg-opacity-10">
        <Icon size={24} color="white" />
        <p className="hidden text-xl text-white lg:block">{label}</p>
        {alert ? (
          <BsDot className="absolute left-0 text-sky-500 -top-4" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
