import http from "global/api";

export const getAdventures = () =>
  http.get("adventures?_embed=adventureSkills");
export const getAdventure = (adventureId: number | string) =>
  http.get(`adventures/${adventureId}?_embed=stages&_embed=adventureSkills`);

export const getClassCurrentAdventure = (classId: number | string) =>
  http.get(
    `classes/${classId}/classHasAdventures?current_adventure=true&_embed=adventures`
  );

export const getAdventuresByGoal = (goalId: number | string) =>
  http.get(`/adventure-by-goal-id/${goalId}?goal=true`);

export const setCurrentAdventure = (body: {
  id_class: number | string;
  id_adventure: number | string;
}) => {
  return http.post("/set-adventure", body);
};
