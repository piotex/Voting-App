import React from "react";
import { IdeaModel } from "../../models/IdeaModel";
import "./css/IdeaDescription.css";

interface IdeaDescriptionProps {
  ideaModel: IdeaModel;
  handleVote: (item: number) => void;
}

export default function IdeaDescription({
  ideaModel,
  handleVote,
}: IdeaDescriptionProps) {
  const onClose = () => {
    window.location.href = "/";
  };

  return (
    <div className="idea-description-overlay">
      <div className="idea-description-modal">
        <button className="idea-description-close-button">&times;</button>
        <h2 className="idea-description-name">{ideaModel.idea_name}</h2>
        <p className="idea-description-text">{ideaModel.idea_description}</p>
        <p
          className="idea-count-text"
          onClick={(event) => handleVote(ideaModel.idea_id)}
        >
          Oddane głosy: {ideaModel.idea_count}
        </p>
      </div>
    </div>
  );
}
