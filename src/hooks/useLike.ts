import { useCallback, useMemo } from "react";
import { loginModalState } from "./useLoginModal";
import { useSetRecoilState } from "recoil";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useCurrentUser from "./userCurrentUser";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const setLoginState = useSetRecoilState(loginModalState);

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser)
      return setLoginState((prev) => ({ ...prev, isOpen: true }));

    try {
      let request;
      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }
      await request();
      mutateFetchedPost();
      mutateFetchedPosts();
      toast.success("Success!");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModalState,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};
export default useLike;
