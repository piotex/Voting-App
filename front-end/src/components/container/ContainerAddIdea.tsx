import "./css/ContainerAddIdea.css";

export default function ContainerAddIdea() {
  return (
    <div className="container-add-idea-outer">
      <div className="container-add-idea">
        <div className="container-add-idea-title">Dodaj pomysł</div>
        <div className="container-add-idea-description">
          Opisz swój pomysł i dodaj go do listy.
        </div>
        <form className="container-add-idea-form">
          <input
            type="text"
            placeholder="Nazwa pomysłu"
            className="container-add-idea-input"
          />
          <textarea
            placeholder="Opis pomysłu"
            className="container-add-idea-textarea"
          ></textarea>
          <button type="submit" className="container-add-idea-button">
            Dodaj
          </button>
        </form>
      </div>
    </div>
  );
}
