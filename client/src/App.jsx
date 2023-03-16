import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainComponent from "./Components/MainComponent";

function App() {
  return (
    <Router>
      <div className="App">
        <MainComponent />
      </div>
    </Router>
  );
}
export default App;