import React, { useState, FormEvent } from "react";
import styles from "./Idea.module.css";
import { IdeaProps } from "./Idea.types";

export const Idea = ({ ideaName, ideaCount }: IdeaProps) => {
  const [expand, setExpand] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Wartość inputa:", ideaName);
    setExpand(!expand);
  };

  return (
    <div className={styles.idea}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <button
          type="submit"
          className={expand ? styles.ideaButtonActive : styles.ideaButton}
        >
          Wyślij
        </button>
        <div className={styles.ideaName}>{ideaName}</div>
        <div className={styles.ideaCount}>{ideaCount}</div>
      </form>
    </div>
  );
};
