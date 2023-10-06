import { useRecoilState } from "recoil";
import { issueState } from "../../libs/recoil/Issue"; // <-- Import the issueState from issue.ts
import { GETISSUE } from "./GetIssue";
import "../header/GetIssue.css";

export const HEADER = () => {
  const [showInput, setShowInput] = useRecoilState(issueState);
  return (
    <div className="getrepouissue">
      <h1>원하는 User의 Repo Issue 가져오기!!</h1>
      {showInput ? <GETISSUE /> : <></>}
    </div>
  );
};
