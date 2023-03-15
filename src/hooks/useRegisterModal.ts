import { atom } from "recoil";

interface RegisterModalState {
  isOpen: boolean;
}

const defaultModalState: RegisterModalState = {
  isOpen: false,
};

export const registerModalState = atom<RegisterModalState>({
  key: "registerModalState",
  default: defaultModalState,
});
