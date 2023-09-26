import { RecoilRoot } from "recoil";
import "./App.css";
import { HEADER } from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <HEADER />
      </RecoilRoot>
    </div>
  );
}

export default App;
