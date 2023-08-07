import {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainPage from "./components/mainPage/MainPage";
import UploadList from "./components/uploadList/uploadList";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/uploaded" element={<UploadList />} />
      </Routes>
    </Router>
  );
}

export default App;
