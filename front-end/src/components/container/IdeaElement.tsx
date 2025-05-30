import React from "react";
import { IdeaModel } from "../../models/IdeaModel";
import "./IdeaElement.css";

interface IdeaElementProps {
  ideaModel: IdeaModel;
}

export default function IdeaElement({ ideaModel }: IdeaElementProps) {
  return (
    <div
      className="idea-element"
      style={{ backgroundColor: ideaModel.idea_background }}
    >
      <div>
        <div className="idea-title">{ideaModel.idea_name}</div>
        <div className="idea-short-description">
          {ideaModel.idea_description}
        </div>
      </div>
      <div className="idea-actions">
        <button className="idea-button idea-button-desc">Opis</button>
        <button className="idea-button idea-button-count">
          {ideaModel.idea_count}
        </button>
      </div>
    </div>
  );
}
