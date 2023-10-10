# 원하는 User의 Repo의 IssueList 불러오기

원하는 유저의 저장소의 이슈들을 불러올 수 있는 프로젝트 입니다. <br/>
배포링크: https://graceful-sunburst-ef9ec3.netlify.app/main

https://github.com/Yjason-K/get_issues/assets/81736873/b811b76d-2645-4002-a052-e21d510e3521





## 기술스택
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white"/><img src="https://img.shields.io/badge/recoil-f26b00?style=flat-square&logo=styled-components&logoColor=white"/><img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/><img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=&logoColor=black"/>


## 목표
특정 깃헙 레파지토리의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축

1. 이슈 목록 화면
    - 이슈 목록 가져오기 API 활용
    - open 상태의 이슈 중 코멘트가 많은 순으로 정렬
    - 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
    - 다섯번째 셀마다 광고 이미지 출력
        - 이미지
            https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100
            
        - 광고 이미지 클릭 시 https://www.wanted.co.kr/ 로 이동
    - 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩(인피니티 스크롤)

1. 이슈 상세 화면
    - 이슈의 상세 내용 표시
    - ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시

## 커스텀 훅을 만들어 데이터 불러오기
```typescript
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
      // const octokit = new Octokit({
      //   auth: `${process.env.REACT_APP_GIT_API}`,
      // });

      const octokit = new Octokit();

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
```

GitHub 토큰을 사용하지 않으면 시간당 60개 호출만 가능하기 때문에 최상위 경로에 .env파일에 토큰을 발급받아 프로젝트에 사용하면
제한 없이 사용할 수 있습니다.


## Commit convetnion

| Type       | 설명                                                         |
|------------|------------------------------------------------------------|
| feat       | 새로운 기능 추가                                             |
| fix        | 버그 수정 또는 오타                                          |
| refactor   | 코드 리팩토링                                                 |
| design     | 사용자 UI 디자인 변경 (CSS 등)                               |
| comment    | 필요한 주석 추가 및 변경                                      |
| style      | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우              |
| test       | 테스트 코드 추가, 수정, 삭제, 비즈니스 로직 변경이 없는 경우 |
| chore      | 위에 해당되지 않는 기타 변경사항 (빌드 스크립트, 패키지 등) |
| init       | 프로젝트 초기 생성                                            |
| rename     | 파일 또는 폴더명 수정 또는 이동                                |
| remove     | 파일을 삭제하는 작업만 수행하는 경우                          |
