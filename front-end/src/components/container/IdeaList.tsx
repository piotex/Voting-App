import { ReactNode, useEffect, useState } from "react";
import { IdeaModel } from "../../models/IdeaModel";
import IdeaElement from "./IdeaElement";
import "./css/IdeaList.css";

const API_BASE_URL = "http://127.0.0.1:5000";

interface IdeaListProps {
  children?: React.ReactNode;
}

export default function IdeaList({ children }: IdeaListProps) {
  const [ideaList, setIdeaList] = useState<IdeaModel[]>();
  const [isFetching, setIsFetching] = useState(false);

  const voteOnIdea = async (option: number) => {
    await fetch(`${API_BASE_URL}/vote/${option}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getIdeas();
  };

  const showIdeaDescription = (option: number) => {
    console.log(`Show description for idea with ID: ${option}`);
  };

  const getIdeas = async () => {
    setIsFetching(true);
    const response = await fetch(`${API_BASE_URL}/get_idea_list`);
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

  return <div>{content}</div>;
}
