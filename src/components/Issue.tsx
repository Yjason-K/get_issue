import React, { useEffect, useState, useRef, useCallback } from "react";
import useGithubIssues, { Repo } from "../hooks/useGithubIssue";

export const ISSUE = React.memo((curRepoInfo: Repo) => {
  const [page, setPage] = useState(1);
  const { issues, loading, error } = useGithubIssues(curRepoInfo, page);

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

  console.log(issues);

  return (
    <div className="issues">
      {issues.map((issue: any, index) => (
        <div className="repoiissue">
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
                  작성자: {issue.user.login}, 작성일: {issue.created_at}
                </p>
              </div>
            </div>
            <div className="right">
              <p>Comments: {issue.comments}</p>
            </div>
          </div>
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
      {loading && <h3>Loading...</h3>}
      {error && <h3>Error! Console을 확인해 주세요</h3>}
    </div>
  );
});
