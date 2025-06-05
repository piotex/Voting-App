import { ReactNode, useEffect, useState } from "react";
import { IdeaModel } from "../../models/IdeaModel";
import IdeaElement from "./IdeaElement";
import "./css/IdeaList.css";
import IdeaDescription from "./IdeaDescription";

// const API_URL = "http://127.0.0.1:5000";
const GET_IDEA_LIST_API =
  "https://0aucwc87u2.execute-api.eu-central-1.amazonaws.com/default/get_idea_list";
const SET_VOTE_API =
  "https://0aucwc87u2.execute-api.eu-central-1.amazonaws.com/default/get_idea_list";

interface IdeaListProps {
  children?: React.ReactNode;
}

export default function IdeaList({ children }: IdeaListProps) {
  const [ideaList, setIdeaList] = useState<IdeaModel[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [itemDescriptionToShow, setItemDescriptionToShow] =
    useState<IdeaModel | null>(null);

  const voteOnIdea = async (option: number) => {
    await fetch(SET_VOTE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setItemDescriptionToShow(null);
    getIdeas();
  };

  const showIdeaDescription = (item: IdeaModel) => {
    setItemDescriptionToShow(item);
  };

  const getIdeas = async () => {
    setIsFetching(true);
    const response = await fetch(GET_IDEA_LIST_API);
    const data = (await response.json()) as IdeaModel[];
    setIdeaList(data);
    setIsFetching(false);
  };
  useEffect(() => {
    getIdeas();
  }, []);

  let content: ReactNode;
  if (isFetching) {
    content = <p>Loading... </p>;
  }
  if (ideaList) {
    const arrayOne = ideaList.filter((idea) => idea.idea_is_selected);
    const arrayTwo: IdeaModel[] = [];

    ideaList
      .filter((idea) => !idea.idea_is_selected)
      .sort((a, b) => b.idea_count - a.idea_count)
      .forEach((idea, index) => {
        if (index % 2 === 0) {
          arrayTwo.push(idea);
        } else {
          arrayOne.push(idea);
        }
      });

    content = (
      <div className="ideaList">
        <div className="ideaListColumn">
          {arrayOne.map((model, index) => (
            <IdeaElement
              key={index}
              ideaModel={model}
              handleVote={voteOnIdea}
              handleDescription={showIdeaDescription}
            />
          ))}
        </div>
        <div className="ideaListColumn">
          {arrayTwo.map((model, index) => (
            <IdeaElement
              key={index}
              ideaModel={model}
              handleVote={voteOnIdea}
              handleDescription={showIdeaDescription}
            />
          ))}
        </div>
        {children}
      </div>
    );
  }
  if (itemDescriptionToShow) {
    content = (
      <IdeaDescription
        ideaModel={itemDescriptionToShow}
        handleVote={voteOnIdea}
        handleClose={() => setItemDescriptionToShow(null)}
      />
    );
  }

  return <div>{content}</div>;
}
