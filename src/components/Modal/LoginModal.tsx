import { loginModalState } from "@/hooks/useLoginModal";
import { registerModalState } from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Input from "../Input";
import Modal from "./Modal";

const LoginModal = () => {
  const [loginState, setLoginState] = useRecoilState(loginModalState);
  const setRegisterState = useSetRecoilState(registerModalState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password,
      });

      setLoginState((prev) => ({
        ...prev,
        isOpen: false,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModalState, email, password]);

  const onToggle = useCallback(() => {
    if (isLoading) return;
    setLoginState((prev) => ({
      ...prev,
      isOpen: false,
    }));

    setRegisterState((prev) => ({
      ...prev,
      isOpen: true,
    }));
  }, [isLoading, registerModalState, loginModalState, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(evt) => setEmail(evt.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(evt) => setPassword(evt.target.value)}
        value={password}
        type="password"
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <p>
        First time using Twitter?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline">
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginState.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={() =>
        setLoginState((prev) => ({
          ...prev,
          isOpen: false,
        }))
      }
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
