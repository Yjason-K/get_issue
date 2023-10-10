import React, { useEffect, useState, useRef, useCallback } from "react";
import useGithubIssues, { Repo } from "../hooks/useGithubIssue";
import { useRecoilValue } from "recoil";
import { repoInfoState } from "../libs/recoil/Issue";
import { Link } from "react-router-dom";

export const ISSUE = React.memo(() => {
  const [page, setPage] = useState(1);
  const curRepoinfo = useRecoilValue(repoInfoState);
  const { issues, loading, error } = useGithubIssues(curRepoinfo, page);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastIssueElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  }

  console.log(curRepoinfo);

  return (
    <div className="issues">
      {issues.map((issue: any, index) => (
        <div className="repoiissue">
          <Link
            to={`/issue/${issue.number}`}
            state={{ repoinfo: curRepoinfo }}
            // target="_blank"
            rel="noopener noreferrer"
          >
            <div
              ref={issues.length === index + 1 ? lastIssueElementRef : null}
              key={issue.number}
              className="issue"
            >
              <div className="left">
                <div className="issuetitle">
                  <p>
                    # {issue.number} {issue.title}
                  </p>
                </div>
                <div className="issueinfo">
                  <p>
                    작성자: {issue.user.login}, 작성일:{" "}
                    {formatDate(issue.created_at)}
                  </p>
                </div>
              </div>
              <div className="right">
                <p>Comments: {issue.comments}</p>
              </div>
            </div>
          </Link>
          {/* 5번재 셀마다 원티드 광과 삽입 */}
          {(index + 1) % 5 === 0 && (
            <div className="towanted">
              {" "}
              <a href="https://www.wanted.co.kr/">
                <img
                  src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
                  alt="Description"
                />
              </a>
            </div>
          )}
        </div>
      ))}
      {loading && <h3 style={{ fontSize: "2rem" }}>Loading...</h3>}
      {error && <h3>Error! Console을 확인해 주세요</h3>}
    </div>
  );
});
