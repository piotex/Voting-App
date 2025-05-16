import React from "react";
import styles from "./styles/App.module.css";
import { IdeaList } from "./components/IdeaList";
import useFetchIdeas from "./hooks/useFetchIdeas";

function App() {
  const { ideaList, loading, error } = useFetchIdeas();

  if (loading) {
    return <div>Ładowanie pomysłów...</div>;
  }

  if (error) {
    return <div>Wystąpił błąd podczas ładowania pomysłów.</div>;
  }

  return (
    <div className={styles.app}>
      <h1>Lista Pomysłów</h1>
      <IdeaList ideaList={ideaList} />
    </div>
  );
}

export default App;
