import { atom } from "recoil";

export const repoInfoState = atom({
  key: "repoInfoState",
  default: {
    user: "",
    repo: "",
  },
});

export const issuesState = atom<any[]>({
  key: "issuesState",
  default: [],
});
