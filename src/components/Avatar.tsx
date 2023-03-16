import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, hasBorder, isLarge }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback(
    (evt: any) => {
      evt.stopPropagation();
      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-10"}
        ${isLarge ? "w-32" : "w-10"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
        aspect-square
        `}>
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
