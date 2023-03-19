import { toast } from "react-hot-toast";
import { useCallback, useMemo } from "react";
import { loginModalState } from "./useLoginModal";
import { useSetRecoilState } from "recoil";
import useCurrentUser from "./userCurrentUser";
import useUser from "./useUser";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const setLoginState = useSetRecoilState(loginModalState);

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser)
      return setLoginState((prev) => ({ ...prev, isOpen: true }));

    try {
      let request;

      if (isFollowing) {
        request = () =>
          axios.delete("/api/follow", {
            data: {
              userId,
            },
          });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();
      toast.success("Success!");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    setLoginState,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};
export default useFollow;
