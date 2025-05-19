// AppIdeas.tsx
import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
import { useFetchIdeas } from "./hooks/useFetchIdeas";
import { useIdeaVoting } from "./hooks/useIdeaVoting";
import { useAddNewIdea } from "./hooks/useAddNewIdea";
import { IdeaCard } from "./components/ui/IdeaCard";
import { useSubmitIdea } from "./hooks/useSubmitIdea";

interface Idea {
  id: number;
  title: string;
  votes: number;
  hasVoted?: boolean;
}

function AppIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdea, setNewIdea] = useState("");
  const resetNewIdea = useCallback(() => setNewIdea(""), [setNewIdea]);
  const { handleInputChange } = useAddNewIdea(ideas, setIdeas, resetNewIdea);
  const {
    ideas: fetchedIdeas,
    loading,
    error,
    refetch: refetchIdeas,
  } = useFetchIdeas("http://127.0.0.1:5000/get_idea_list");
  const { handleVote } = useIdeaVoting(setIdeas);
  const { isSubmitting, submitError, submitIdea } = useSubmitIdea();

  useEffect(() => {
    if (fetchedIdeas) {
      setIdeas(fetchedIdeas);
    }
  }, [fetchedIdeas, setIdeas]);

  const handleAddIdeaToServer = useCallback(async () => {
    await submitIdea(newIdea, (newIdeaData) => {
      // Po pomyślnym dodaniu, odśwież listę pomysłów
      refetchIdeas();
      resetNewIdea();
    });
  }, [newIdea, submitIdea, resetNewIdea, refetchIdeas]);

  if (loading) {
    return <div>Ładowanie pomysłów...</div>;
  }

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  return (
    <div className="app-ideas-container">
      <h1 className="app-ideas-heading">Głosowanie na Pomysły Aplikacji</h1>
      <div className="app-ideas-input-area">
        <Input
          value={newIdea}
          onChange={handleInputChange}
          placeholder="Wprowadź nowy pomysł"
        />
        <Button
          onClick={handleAddIdeaToServer}
          className="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Dodawanie..." : "Dodaj"}
        </Button>
        {submitError && <div className="error-message">{submitError}</div>}
      </div>
      <ul className="app-ideas-list">
        {ideas.map((idea) => (
          <li key={idea.id} className="app-ideas-list-item">
            <IdeaCard idea={idea} onVote={handleVote} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppIdeas;
