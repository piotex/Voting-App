import React from "react";
import { IdeaModel } from "../../models/IdeaModel";
import "./IdeaElement.css";

interface IdeaElementProps {
  ideaModel: IdeaModel;
}

export default function IdeaElement({ ideaModel }: IdeaElementProps) {
  const shortDescription = "RenovaAI to innowacy...";

  const getBackgroundColor = (ideaName: string): string => {
    if (ideaName.includes("RenovaAI: Twój Inteligentny Remont"))
      return "#D6F6D6";
    if (ideaName.includes("Od Sadu do Stołu")) return "#FFEFCD";
    if (ideaName.includes("Klucz do Przyszłości")) return "#D6E8FF";
    if (ideaName.includes("Poznaj Niezwykły Świat Mruczących Przyjaciół"))
      return "#DCDCF6";
    if (ideaName.includes("Naucz Się Cieszyć Chwilą")) return "#FDF6D6";
    if (ideaName.includes("RenovaAI: Kompleksowa Platforma AI"))
      return "#F8A1A1";
    return "#f0f0f0";
  };

  const backgroundColor = getBackgroundColor(ideaModel.idea_name);

  return (
    <div className="idea-element" style={{ backgroundColor: backgroundColor }}>
      <div className="idea-title">{ideaModel.idea_name}</div>
      <div className="idea-short-description">{shortDescription}</div>
      <div className="idea-actions">
        <button className="idea-button idea-button-desc">Opis</button>
        <button
          className="idea-button idea-button-count"
          style={{
            backgroundColor: ideaModel.idea_count > 500 ? "#4CAF50" : "#d0d0d0",
            color: ideaModel.idea_count > 500 ? "white" : "#333",
          }}
        >
          {ideaModel.idea_count}
        </button>
      </div>
    </div>
  );
}
