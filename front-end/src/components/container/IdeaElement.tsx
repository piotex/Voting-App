import React from "react";
import { IdeaModel } from "../../models/IdeaModel";
import "./css/IdeaElement.css";

interface IdeaElementProps {
  ideaModel: IdeaModel;
  isActive?: boolean;
  handleVote: (option: number) => void;
  handleDescription: (item: IdeaModel) => void;
}

export default function IdeaElement({
  ideaModel,
  handleVote,
  handleDescription,
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
        <div
          className="idea-button idea-button-desc"
          onClick={(event) => {
            handleDescription(ideaModel);
            event.stopPropagation();
          }}
        >
          Opis
        </div>
        <div
          className={`idea-button idea-button-count idea-button${
            ideaModel.idea_is_selected ? "-active" : ""
          }`}
        >
          {ideaModel.idea_count}
        </div>
      </div>
    </div>
  );
}
