import { useLocation, useParams } from "react-router-dom";
import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";

export const REPOISSUE = () => {
  const issueNumber = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const repoInfo = location.state ? location.state.repoinfo : null;
  const [issue, setIssue] = useState<any>();
  const [error, setError] = useState<Error | null>(null);

  console.log(repoInfo.user);
  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      // const octokit = new Octokit({
      //   auth: `${process.env.REACT_APP_GIT_API}`,
      // });

      const octokit = new Octokit();

      try {
        const response = await octokit.issues.get({
          owner: repoInfo.user,
          repo: repoInfo.repo,
          issue_number: parseInt(issueNumber.id as string),
        });

        const issueData = response.data;
        console.log(issueData);

        setIssue(issueData);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    if (repoInfo.user && repoInfo.repo) {
      fetchIssues();
    }
  }, [issueNumber]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  }

  return (
    <div className="targetissue">
      <div className="userrepo">
        <h2 className="fromissue">
          {repoInfo.user} / {repoInfo.repo}
        </h2>
      </div>
      {issue && (
        <div className="issuereport">
          <div className="userandtitle">
            {issue.user && (
              <div className="userthumbnail">
                <img src={issue.user.avatar_url} alt="user_thumbnail" />
              </div>
            )}
            <div className="titleandcomment">
              <div className="issuetitle">
                <p>
                  # {issue.number} {issue.title}
                </p>
                {issue.user && (
                  <p>
                    작성자: {issue.user.login}, 작성일:{" "}
                    {formatDate(issue.created_at)}
                  </p>
                )}
              </div>
              <div className="comments">
                <p>코멘트: {issue.comments}</p>
              </div>
            </div>
          </div>
          <div className="issuebody">{issue.body}</div>
        </div>
      )}
      {loading && <h3>Loading...</h3>}
    </div>
  );
};
