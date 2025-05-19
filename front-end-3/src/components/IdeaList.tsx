import React from "react";
import Idea from "./Idea";
import { IdeaProps } from "../types";

type IdeaListProps = {
  ideas: IdeaProps[];
  voteForIdea: (ideaName: string) => void;
  userVote: string | null;
};

function IdeaList({ ideas, voteForIdea, userVote }: IdeaListProps) {
  return (
    <div>
      {ideas.map((item, index) => (
        <Idea
          key={index}
          idea_name={item.idea_name}
          idea_count={item.idea_count}
          voteForIdea={voteForIdea}
          isVoted={userVote === item.idea_name}
        />
      ))}
    </div>
  );
}

export default IdeaList;
