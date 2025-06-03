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

  const voteOnIdeaApi = async (option: number) => {
    await fetch(`${API_BASE_URL}/vote/${option}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getIdeas();
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

  // const getSelectedIdea = () => {}

  let content: ReactNode;
  if (isFetching) {
    content = <p>Loading... </p>;
  }
  if (ideaList) {
    const arrayOne: IdeaModel[] = [];
    const arrayTwo: IdeaModel[] = [];
    ideaList.forEach((idea, index) => {
      if (index % 2 === 0) {
        arrayOne.push(idea);
      } else {
        arrayTwo.push(idea);
      }
    });

    content = (
      <div className="ideaList">
        <div className="ideaListColumn">
          {arrayOne.map((model, index) => (
            <IdeaElement
              key={index}
              ideaModel={model}
              handleVote={voteOnIdeaApi}
            />
          ))}
        </div>
        <div className="ideaListColumn">
          {arrayTwo.map((model, index) => (
            <IdeaElement
              key={index}
              ideaModel={model}
              handleVote={voteOnIdeaApi}
            />
          ))}
        </div>
        {children}
      </div>
    );
  }

  return <div>{content}</div>;
}
