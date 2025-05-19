import React, { useState } from "react";
import "./Header.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Header() {
  const [input, setInput] = useState("");

  const handleAddIdea = async () => {
    if (!input.trim()) return;
    try {
      const response = await fetch(`${API_URL}/add_idea`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea_name: input }),
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <h1>Głosowanie na Pomysły Aplikacji</h1>
      <input
        type="text"
        placeholder="Wyszukaj pomysł lub dodaj nowy..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAddIdea}>Dodaj Pomysł</button>
    </header>
  );
}

export default Header;
