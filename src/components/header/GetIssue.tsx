import { Octokit } from "@octokit/rest";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ISSUE } from "../Issue";
import { issueLIST } from "../../libs/recoil/Issue";
import useGithubIssues from "../../hooks/useGithubIssue";

export const GETISSUE = () => {
  // 검색 시 사용될 변수
  const [repoInfo, setRepoInfo] = useState({ user: "", repo: "" });

  // //  input Change Handler
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setRepoInfo({ ...repoInfo, [id]: value });
  };

  // 검색 버튼 누르면 input은 ""으로 변경
  const [curRepoInfo, setCurRepoInfo] = useState({
    user: "",
    repo: "",
  });

  //  버튼 클릭시 정보 생성
  const findIssues = () => {
    setCurRepoInfo({ user: repoInfo.user, repo: repoInfo.repo });
  };

  return (
    <div className="contenet">
      <div className="get_repo">
        <input
          type="text"
          placeholder="User"
          id="user"
          value={repoInfo.user}
          onChange={inputChange}
        />
        <input
          type="text"
          placeholder="Repo"
          id="repo"
          value={repoInfo.repo}
          onChange={inputChange}
        />
        <button
          type="button"
          className="find_issues"
          onClick={() => {
            findIssues();
          }}
        >
          Issue불러오기
        </button>
      </div>
      <ISSUE {...curRepoInfo} />
    </div>
  );
};
