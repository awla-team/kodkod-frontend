import http from "global/api";

export const getAdventures = () =>
  http.get("adventures?_embed=adventureSkills");
export const getAdventure = (adventureId: number | string) =>
  http.get(`adventures/${adventureId}?_embed=stages&_embed=adventureSkills`);
