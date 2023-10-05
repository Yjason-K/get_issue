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

  return (
    <div className="issues">
      {issues.map((issue: any, index) => (
        <div
          ref={issues.length === index + 1 ? lastIssueElementRef : null}
          key={issue.number}
          className="issue"
        >
          <p>Issue Number: {issue.number}</p>
          <p>Title: {issue.title}</p>
          <p>Author: {issue.user.login}</p>
          <p>Date: {issue.created_at}</p>
          <p>Comments: {issue.comments}</p>
        </div>
      ))}
      {loading && <h3>Loading...</h3>}
      {error && <h3>Error! Console을 확인해 주세요</h3>}
    </div>
  );
});
