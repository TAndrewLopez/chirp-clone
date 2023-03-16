import { loginModalState } from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useCurrentUser from "@/hooks/userCurrentUser";
import { registerModalState } from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import Avatar from "./Avatar";
import Button from "./Button";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const [registerState, setRegisterState] = useRecoilState(registerModalState);
  const [loginState, setLoginState] = useRecoilState(loginModalState);
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/posts", { body });
      toast.success("Tweet Created!");
      setBody("");
      mutatePosts();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              className="disabled:opacity-90 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
              placeholder={placeholder}
              disabled={isLoading}
              onChange={(evt) => setBody(evt.target.value)}
              value={body}></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="flex justify-end mt-4">
              <Button
                label="Tweet"
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="mb-4 text-2xl font-bold text-center text-white">
            Welcome to Twitter
          </h1>
          <div className="flex items-center justify-center gap-4">
            <Button
              label="Login"
              onClick={() =>
                setLoginState((prev) => ({ ...prev, isOpen: true }))
              }
            />
            <Button
              label="Register"
              secondary
              onClick={() =>
                setRegisterState((prev) => ({ ...prev, isOpen: true }))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
