import React, { useState } from "react";
import "./css/ContainerAddIdea.css";
import { ADD_IDEA_API } from "../../constants/api";

export default function ContainerAddIdea() {
  const [ideaName, setIdeaName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsFetching(true);
    event.preventDefault();

    if (!ideaName.trim() || !ideaDescription.trim()) {
      alert("Nazwa i opis pomysłu są wymagane.");
      return;
    }

    await fetch(ADD_IDEA_API, {
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
    setIsFetching(false);
    window.location.href = "/";
  };

  let content = (
    <>
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
    </>
  );
  if (isFetching) {
    content = <div className="container-add-idea-description">Wysyłam... </div>;
  }
  return (
    <div className="container-add-idea-outer">
      <div className="container-add-idea">{content}</div>
    </div>
  );
}
