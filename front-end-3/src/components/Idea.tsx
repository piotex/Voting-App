import React from "react";
import { IdeaProps } from "../types";
import "./Idea.css";

type Props = IdeaProps & {
  voteForIdea: (ideaName: string) => void;
  isVoted: boolean;
};

function Idea({ idea_name, idea_count, voteForIdea, isVoted }: Props) {
  const handleVote = () => {
    voteForIdea(idea_name);
  };

  return (
    <div
      className={`idea-container${isVoted ? " voted" : ""}`}
      onClick={handleVote}
      style={{ cursor: "pointer" }}
    >
      <span className="idea-name">
        {idea_name} {isVoted && "✅"}
      </span>
      <span className="idea-votes">{idea_count}</span>
    </div>
  );
}

export default Idea;
