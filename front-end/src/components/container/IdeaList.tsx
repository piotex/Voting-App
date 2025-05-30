import { ReactNode, useEffect, useState } from "react";
import "./IdeaList.css";
import { IdeaModel } from "../../models/IdeaModel";
import IdeaElement from "./IdeaElement";

const API_URL = "http://127.0.0.1:5000/get_idea_list";

interface IdeaListProps {
  children?: React.ReactNode;
}

export default function IdeaList({ children }: IdeaListProps) {
  const [ideaList, setIdeaList] = useState<IdeaModel[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json()) as IdeaModel[];
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
    content = (
      <ul>
        {ideaList?.map((model, index) => (
          <IdeaElement key={index} ideaModel={model} />
        ))}
      </ul>
    );
  }

  return <div className="ideaList">{content}</div>;
}
