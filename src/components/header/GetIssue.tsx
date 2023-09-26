import { Octokit } from "@octokit/rest";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { issueLIST } from "../../libs/recoil/Issue";

export const GETISSUE = () => {
  const [repoInfo, setRepoInfo] = useState({
    user: "",
    repo: "",
  });

  //  input Change Handler
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setRepoInfo({ ...repoInfo, [id]: value });
  };

  const setIssues = useSetRecoilState(issueLIST);

  //  버튼 클릭시 정보 생성
  const findIssues = async () => {
    const octokit = new Octokit({
      auth: `${process.env.REACT_APP_GIT_API}`,
    });

    try {
      // Fetch the list of issues for the provided user and repository
      const response = await octokit.issues.listForRepo({
        owner: repoInfo.user,
        repo: repoInfo.repo,
        state: "open",
      });

      // Handle the response
      const issues = response.data;
      setIssues(issues);
      setRepoInfo({ user: "", repo: "" });
      console.log(issues);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  return (
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
      <button type="button" className="find_issues" onClick={findIssues}>
        Issue불러오기
      </button>
    </div>
  );
};
