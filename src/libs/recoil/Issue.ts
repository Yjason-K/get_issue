import { atom } from "recoil";

export const issueState = atom({
  key: "issueinput",
  default: true,
});

export const issueLIST = atom({
  key: "issueLists",
  default: <any>[],
});
