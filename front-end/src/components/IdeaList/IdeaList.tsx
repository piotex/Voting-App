import React from "react";
import styles from "./IdeaList.module.css";
import { InsertIdea } from "../InsertIdea";
import { Idea } from "../Idea";
import { IdeaListProps } from "./IdeaList.types";

export const IdeaList = ({ ideaList }: IdeaListProps) => {
  return (
    <div className={styles.ideaList}>
      <InsertIdea />
      {ideaList.map((idea) => (
        <React.Fragment key={idea.ideaName}>
          <Idea ideaName={idea.ideaName} ideaCount={idea.ideaCount} />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};
