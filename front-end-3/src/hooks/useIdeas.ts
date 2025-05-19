import { useEffect, useState } from "react";
import { IdeaProps } from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export function useIdeas() {
  const [ideas, setIdeas] = useState<IdeaProps[]>([]);
  const [userVote, setUserVote] = useState<string | null>(null);

  const fetchIdeas = async () => {
    try {
      const response = await fetch(`${API_URL}/get_idea_list`);
      const data = await response.json();
      setIdeas(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserVote = async () => {
    try {
      const response = await fetch(`${API_URL}/get_idea_selected`);
      const data = await response.json();
      setUserVote(data.vote);
    } catch (err) {
      console.error(err);
    }
  };

  const voteForIdea = async (ideaName: string) => {
    try {
      const response = await fetch(
        `${API_URL}/vote/${encodeURIComponent(ideaName)}`,
        { method: "POST" }
      );
      await response.json();
      await fetchIdeas();
      await fetchUserVote();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIdeas();
    fetchUserVote();
  }, []);

  return { ideas, voteForIdea, userVote };
}
