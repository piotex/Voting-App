import React, { useState } from "react";
import "./App.css";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
import { Card, CardContent } from "./components/ui/Card";

interface Idea {
  id: number;
  title: string;
  votes: number;
  hasVoted?: boolean;
}

function AppIdeas() {
  const [newIdea, setNewIdea] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([
    { id: 1, title: "Aplikacja do trackowania nauki słów", votes: 12 },
    { id: 2, title: "Wirtualny towarzysz do nauki języków", votes: 8 },
    { id: 3, title: "Todo z AI coachowaniem", votes: 5 },
  ]);
  const [selectedIdeaId, setSelectedIdeaId] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIdea(event.target.value);
  };

  const handleAddIdea = () => {
    if (newIdea.trim()) {
      setIdeas([...ideas, { id: Date.now(), title: newIdea, votes: 0 }]);
      setNewIdea("");
    }
  };

  const handleVote = (id: number) => {
    if (selectedIdeaId === id) return; // already selected
    setIdeas(
      ideas.map((idea) =>
        idea.id === id
          ? { ...idea, votes: idea.votes + 1, hasVoted: true }
          : { ...idea, hasVoted: false }
      )
    );
    setSelectedIdeaId(id);
  };

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
            <Card
              className={`idea-card ${idea.hasVoted ? "voted" : ""}`}
              onClick={() => handleVote(idea.id)}
            >
              <CardContent>
                <h2 className="idea-title">
                  {idea.title}
                  {idea.hasVoted && <span className="checkmark"> ✅</span>}
                </h2>
                <div className="idea-votes">
                  Głosy: <span className="vote-count">{idea.votes}</span>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppIdeas;
