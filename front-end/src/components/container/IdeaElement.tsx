import React from "react";
import { IdeaModel } from "../../models/IdeaModel";
import "./css/IdeaElement.css";

interface IdeaElementProps {
  handleVote: (option: number) => void;
  ideaModel: IdeaModel;
}

const vodeOnIdea = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Kliknięto w przycisk Opis");
  event.stopPropagation();
};

export default function IdeaElement({
  ideaModel,
  handleVote,
}: IdeaElementProps) {
  return (
    <div
      className="idea-element"
      style={{ backgroundColor: ideaModel.idea_background }}
      onClick={(event) => handleVote(ideaModel.idea_id)}
    >
      <div>
        <div className="idea-title">{ideaModel.idea_name}</div>
        <div className="idea-short-description">
          {ideaModel.idea_description}
        </div>
      </div>
      <div className="idea-actions">
        <button className="idea-button idea-button-desc" onClick={vodeOnIdea}>
          Opis
        </button>
        <button className="idea-button idea-button-count">
          {ideaModel.idea_count}
        </button>
      </div>
    </div>
  );
}
