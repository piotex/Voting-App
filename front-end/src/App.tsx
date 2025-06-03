import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Logo from "./components/header/Logo";
import Menu from "./components/header/Menu";
import Container from "./components/container/Container";
import IdeaList from "./components/container/IdeaList";
import ContainerAddIdea from "./components/container/ContainerAddIdea";

function App() {
  return (
    <div className="App">
      <Header>
        <Logo />
        <Menu />
      </Header>
      <IdeaList />
      <ContainerAddIdea />
    </div>
  );
}

export default App;
