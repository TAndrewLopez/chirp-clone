import { atom } from "recoil";

interface EditModalState {
  isOpen: boolean;
}

const defaultModalState: EditModalState = {
  isOpen: false,
};

export const editModalState = atom<EditModalState>({
  key: "editModalState",
  default: defaultModalState,
});
