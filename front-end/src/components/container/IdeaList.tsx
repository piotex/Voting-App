import { ReactNode, useEffect, useState } from "react";
import { IdeaModel } from "../../models/IdeaModel";
import IdeaElement from "./IdeaElement";
import "./css/IdeaList.css";
import IdeaDescription from "./IdeaDescription";
import { GET_IDEA_LIST_API, SET_VOTE_API } from "../../constants/api";

interface IdeaListProps {
  children?: React.ReactNode;
}

export default function IdeaList({ children }: IdeaListProps) {
  const [ideaList, setIdeaList] = useState<IdeaModel[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [itemDescriptionToShow, setItemDescriptionToShow] =
    useState<IdeaModel | null>(null);

  const voteOnIdea = async (option: number) => {
    setIsFetching(true);
    await fetch(SET_VOTE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vote: option,
      }),
    });
    setItemDescriptionToShow(null);
    getIdeas();
    setIsFetching(false);
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
  if (isFetching) {
    content = (
      <div className="loadingDivMain">
        <div className="loadingDiv">Loading... </div>
      </div>
    );
  }

  return <div>{content}</div>;
}
