import React from "react";
import "./App.css";
import Header from "./components/Header";
import IdeaList from "./components/IdeaList";
import { useIdeas } from "./hooks/useIdeas";

function App() {
  const { ideas, voteForIdea, userVote } = useIdeas();

  return (
    <div className="App">
      <Header />
      <IdeaList ideas={ideas} voteForIdea={voteForIdea} userVote={userVote} />
    </div>
  );
}

export default App;
