import { GETISSUE } from "./GetIssue";
import "../header/GetIssue.css";
import { useEffect } from "react";

export const HEADER = () => {
  useEffect(() => {
    console.log("Component mounted!");
    return () => {
      console.log("Component unmounted!");
    };
  }, []);

  return (
    <div className="getrepouissue">
      <h1>원하는 User의 Repo Issue 가져오기!!</h1>
      <GETISSUE />
    </div>
  );
};
