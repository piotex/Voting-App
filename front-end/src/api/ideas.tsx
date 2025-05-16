const API_URL = "http://127.0.0.1:5000";

export const getIdeaList = async () => {
  const response = await fetch(`${API_URL}/get_idea_list`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

// Możesz dodać inne funkcje API tutaj, np. do dodawania pomysłów
