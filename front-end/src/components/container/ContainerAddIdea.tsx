import React, { useState } from "react";
import "./css/ContainerAddIdea.css";

const API_BASE_URL = "http://127.0.0.1:5000";

export default function ContainerAddIdea() {
  const [ideaName, setIdeaName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ideaName.trim() || !ideaDescription.trim()) {
      alert("Nazwa i opis pomysłu są wymagane.");
      return;
    }

    await fetch(`${API_BASE_URL}/add_idea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idea_name: ideaName,
        idea_description: ideaDescription,
      }),
    });

    setIdeaName("");
    setIdeaDescription("");
    window.location.href = "/";
  };

  return (
    <div className="container-add-idea-outer">
      <div className="container-add-idea">
        <div className="container-add-idea-title">Dodaj pomysł</div>
        <div className="container-add-idea-description">
          Opisz swój pomysł i dodaj go do listy.
        </div>
        <form className="container-add-idea-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nazwa pomysłu"
            className="container-add-idea-input"
            value={ideaName}
            onChange={(e) => setIdeaName(e.target.value)}
          />
          <textarea
            placeholder="Opis pomysłu"
            className="container-add-idea-textarea"
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="container-add-idea-button">
            Dodaj
          </button>
        </form>
      </div>
    </div>
  );
}
