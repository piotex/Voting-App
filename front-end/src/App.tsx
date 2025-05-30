import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Logo from "./components/header/Logo";
import Menu from "./components/header/Menu";
import Container from "./components/container/Container";
import IdeaList from "./components/container/IdeaList";

function App() {
  return (
    <div className="App">
      <Header>
        <Logo />
        <Menu />
      </Header>
      <Container>
        <IdeaList />
      </Container>
    </div>
  );
}

export default App;
