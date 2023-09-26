import { useState } from "react";

export const GETISSUE = () => {
  const [repoInfo, setRepoInfo] = useState({
    user: "",
    repo: "",
  });

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setRepoInfo({ ...repoInfo, [id]: value });
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
    </div>
  );
};
