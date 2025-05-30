import { IdeaModel } from "../models/IdeaModel";

const API_BASE_URL = "http://127.0.0.1:5000";

export const getIdeas = async (): Promise<IdeaModel[]> => {
  const response = await fetch(`${API_BASE_URL}/get_idea_list`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return (await response.json()) as IdeaModel[];
};
