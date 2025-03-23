import "./App.scss";
import Main from "./Pages/Main/Main";
import LINEBOTTOM from "./assets/images/pattern-squiggly-line-bottom-desktop.svg";
import LINETOP from "./assets/images/pattern-squiggly-line-top.svg";


function App() {
  return (
    <div className="app">
      {/* <img src={LINEBOTTOM} alt="lineBottom" className="bottomLeft" />
      <img src={LINETOP} alt="lineTop" className="topRight" /> */}
      <Main />
    </div>
  );
}

export default App;
