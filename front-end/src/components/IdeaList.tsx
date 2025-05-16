import { Idea } from "./Idea";
import "./IdeaList.css";
import { InsertIdea } from "./InsertIdea";

export const IdeaList = (props: any) => {
  return (
    <>
      <InsertIdea></InsertIdea>
      {props.ideaList.map((idea: any) => (
        <>
          <Idea idea={idea} key={crypto.randomUUID} />
          <hr />
        </>
      ))}
    </>
  );
};
