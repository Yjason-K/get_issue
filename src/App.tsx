import { RecoilRoot } from "recoil";
import "./App.css";
import { HEADER } from "./components/header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { REPOISSUE } from "./components/repoIssue/RepoIssue";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            {/* / 으로 접근하든 /main 으로 접근하든 홈으로 이동할 수 있게 설정 */}
            <Route path="/" element={<Navigate to="/main" replace />} />
            <Route path="/main" element={<HEADER />} />
            <Route path="/issue/:id" element={<REPOISSUE />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
