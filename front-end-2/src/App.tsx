// AppIdeas.tsx
import React, { useState, useEffect } from "react";
import "./App.css";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
import { IdeaCard } from "./components/ui/IdeaCard";

interface IdeaFromBackend {
  idea_name: string;
  idea_count: number;
}

interface Idea {
  id: number;
  title: string;
  votes: number;
  hasVoted?: boolean;
}

function AppIdeas() {
  const [newIdea, setNewIdea] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIdeaId, setSelectedIdeaId] = useState<number | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_idea_list");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: IdeaFromBackend[] = await response.json();
        // Przekształć dane z backendu do formatu używanego przez frontend
        const formattedIdeas = data.map((item, index) => ({
          id: index + 1, // Możesz potrzebować bardziej unikalnego ID z backendu
          title: item.idea_name,
          votes: item.idea_count,
        }));
        setIdeas(formattedIdeas);
      } catch (e: any) {
        setError("Wystąpił problem podczas pobierania danych.");
        console.error("Błąd pobierania danych:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []); // Pusta tablica zależności oznacza, że efekt uruchomi się tylko raz po pierwszym renderze

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIdea(event.target.value);
  };

  const handleAddIdea = () => {
    if (newIdea.trim()) {
      // Tutaj logika dodawania nowego pomysłu do backendu byłaby potrzebna
      // Na razie dodajemy tylko do stanu lokalnego (należy to zaktualizować)
      setIdeas([...ideas, { id: Date.now(), title: newIdea, votes: 0 }]);
      setNewIdea("");
    }
  };

  const handleVote = (id: number) => {
    if (selectedIdeaId === id) return;
    setIdeas(
      ideas.map((idea) =>
        idea.id === id
          ? { ...idea, votes: idea.votes + 1, hasVoted: true }
          : { ...idea, hasVoted: false }
      )
    );
    setSelectedIdeaId(id);
    // Tutaj logika wysyłania informacji o głosie do backendu byłaby potrzebna
  };

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
        <Button onClick={handleAddIdea} className="primary">
          Dodaj
        </Button>
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
