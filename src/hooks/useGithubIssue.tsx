import { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import { useRecoilState } from "recoil";
import { issuesState } from "../libs/recoil/Issue";

export type Repo = {
  user: string;
  repo: string;
};

function useGithubIssues(curRepoInfo: Repo, page: number) {
  const [issues, setIssues] = useRecoilState(issuesState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Repo정보가 변경되면 issue정보 초기화
  useEffect(() => {
    setIssues([]);
  }, [curRepoInfo]);

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      const octokit = new Octokit({
        auth: `${process.env.REACT_APP_GIT_API}`,
      });

      try {
        setLoading(true);
        const response = await octokit.issues.listForRepo({
          owner: curRepoInfo.user,
          repo: curRepoInfo.repo,
          state: "open",
          page: page,
          number: 30,
          sort: "comments",
        });

        const newIssues = response.data;

        setIssues((prev) => [...prev, ...newIssues]);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    if (curRepoInfo.user && curRepoInfo.repo) {
      fetchIssues();
    }
  }, [page, curRepoInfo]); // page나 curRepoInfo가 변경될 때만 실행

  return { issues, loading, error };
}

export default useGithubIssues;
