import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import VideoCall from "./components/VideoCall";
import { createContext, useContext } from "react";
import { socketConnection } from "./socket";

export const SocketContext = createContext();
function App() {
  const socket = new socketConnection();

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <div className="App">
          {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        >
        Learn React
        </a>
        </header> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video-calling" element={<VideoCall />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
