import { ReactNode, useEffect, useState } from "react";
import "./IdeaList.css";
import { IdeaModel } from "../../models/IdeaModel";
import IdeaElement from "./IdeaElement";
import { getIdeas } from "../../api/ideas";

const API_BASE_URL = "http://127.0.0.1:5000";

interface IdeaListProps {
  children?: React.ReactNode;
}

export default function IdeaList({ children }: IdeaListProps) {
  const [ideaList, setIdeaList] = useState<IdeaModel[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const voteOnIdeaApi = async (
    option: number
  ): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/vote/${option}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Błąd HTTP! Status: ${response.status}. Wiadomość: ${
          errorData.error || "Nieznany błąd."
        }`
      );
    }

    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = await getIdeas();
        setIdeaList(data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch ideas.");
      }
      setIsFetching(false);
    }
    fetchPosts();

    return await response.json();
  };

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = await getIdeas();
        setIdeaList(data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch ideas.");
      }
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  let content: ReactNode;
  if (error) {
    content = <p className="error">{error}</p>;
  }
  if (isFetching) {
    content = (
      <>
        <p>Loading... </p>
      </>
    );
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
