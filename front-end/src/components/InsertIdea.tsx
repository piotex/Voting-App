import { useState } from "react";
import "./InsertIdea.css";

export const InsertIdea = (props: any) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Wartość inputa:", name);
  };

  return (
    <div className="insertIdea">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Wpisz tutaj swój pomysł którego nie ma poniżej..."
          defaultValue={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
};
