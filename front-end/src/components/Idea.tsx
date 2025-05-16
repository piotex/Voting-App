import { useState } from "react";
import "./Idea.css";

export const Idea = (props: any) => {
  const [expand, setExpand] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Wartość inputa:", props.idea.ideaName);
    setExpand(!expand);
  };

  return (
    <div className="idea">
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className={expand ? "ideaButtonActive" : "ideaButton"}
        >
          Wyślij
        </button>
        <div className="ideaName">{props.idea.ideaName}</div>
        <div className="ideaCount">{props.idea.ideaCount}</div>
      </form>
    </div>
  );
};
