import { atom } from "recoil";

interface LoginModalState {
  isOpen: boolean;
}

const defaultModalState: LoginModalState = {
  isOpen: false,
};

export const loginModalState = atom<LoginModalState>({
  key: "loginModalState",
  default: defaultModalState,
});
