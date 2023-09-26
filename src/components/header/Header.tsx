import { useRecoilState } from "recoil";
import { issueState } from "../../libs/recoil/Issue"; // <-- Import the issueState from issue.ts
import { GETISSUE } from "./GetIssue";

export const HEADER = () => {
  const [showInput, setShowInput] = useRecoilState(issueState);
  return (
    <h1>
      원하는 User의 Repo Issue 가져오기!!
      <GETISSUE />
    </h1>
  );
};
