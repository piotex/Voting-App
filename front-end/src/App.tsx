import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { IdeaList } from "./components/IdeaList";
import { Idea } from "./components/Idea";

function App() {
  const [ideaList, setIdeaList] = useState([
    { ideaName: "pomysł za 1.000.000", ideaCount: 13 },
    { ideaName: "pomysł za 1.000", ideaCount: 7 },
    { ideaName: "pomysł za 5.000", ideaCount: 23 },
  ]);

  return (
    <>
      <IdeaList ideaList={ideaList}></IdeaList>
    </>
  );
}

export default App;
