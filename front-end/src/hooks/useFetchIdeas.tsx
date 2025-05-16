import { useState, useEffect } from "react";
import { IdeaData, BackendIdea } from "../types/idea";
import { getIdeaList } from "../api/ideas";

interface UseFetchIdeasResult {
  ideaList: IdeaData[];
  loading: boolean;
  error: Error | null;
}

const useFetchIdeas = (): UseFetchIdeasResult => {
  const [ideaList, setIdeaList] = useState<IdeaData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await getIdeaList();
        const ideas: IdeaData[] = (data as BackendIdea[]).map((item) => ({
          ideaName: item.idea_name,
          ideaCount: item.idea_count,
        }));
        setIdeaList(ideas);
        setLoading(false);
      } catch (err: any) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err))); // Konwertuj na Error, jeśli to nie był Error
        }
        setLoading(false);
        console.error("Error fetching ideas:", err);
      }
    };

    fetchIdeas();
  }, []);

  return { ideaList, loading, error };
};

export default useFetchIdeas;
