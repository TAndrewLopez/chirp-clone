import { loginModalState } from "@/hooks/useLoginModal";
import { registerModalState } from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import Input from "../Input";
import Modal from "./Modal";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const [loginState, setLoginState] = useRecoilState(loginModalState);
  const [registerState, setRegisterState] = useRecoilState(registerModalState);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/register", {
        email,
        name,
        username,
        password,
      });

      toast.success("Account created.");

      signIn("credentials", {
        email,
        password,
      });

      setRegisterState((prev) => ({
        ...prev,
        isOpen: false,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
    // FIXME: THE DEPENDENCY ARRAY IS POTENTIALLY DIFFERENT
  }, [registerModalState, email, name, username, password]);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    setRegisterState((prev) => ({
      ...prev,
      isOpen: false,
    }));

    setLoginState((prev) => ({
      ...prev,
      isOpen: true,
    }));
  }, [isLoading, registerModalState, loginModalState]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(evt) => setEmail(evt.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(evt) => setName(evt.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(evt) => setUsername(evt.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(evt) => setPassword(evt.target.value)}
        type="password"
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <p>
        Already have an account?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline">
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerState.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={() =>
        setRegisterState((prev) => ({
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

export default RegisterModal;
