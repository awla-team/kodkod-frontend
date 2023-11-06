import http from 'global/api';

export const getAdventures = () =>
  http.get('adventures?_embed=adventureSkills');
export const getAdventure = (adventureId: number | string) =>
  http.get(`adventures/${adventureId}?_embed=stages&_embed=adventureSkills`);

export const getClassCurrentAdventure = (classId: number | string) =>
  http.get(
    `classes/${classId}/classHasAdventures?current_adventure=true&_embed=adventures`
  );

export const getClassHasAdventure = (classHasAdventureId: number | string) =>
  http.get(`classhasadventure/${classHasAdventureId}`);

export const getCompletedClassHasAdventuresByClass = (
  classId: number | string
) => http.get(`class/${classId}/class_has_adventures?complete=true`);

export const getAdventuresByGoal = (goalId: number | string) =>
  http.get(`/adventure-by-goal-id/${goalId}?goal=true`);

export const getClassHasAdventureProgress = (
  classHasAdventureId: number | string
) => {
  return http.get(`classhasadventure/${classHasAdventureId}/progress`);
};

export const setCurrentAdventure = (body: {
  id_class: number | string;
  id_adventure: number | string;
}) => {
  return http.post('adventure/set-adventure', body);
};

export const cancelAdventureFromClass = (id: string | number) => {
  return http.delete('/delete_adventure_from_class/' + id);
};

export const endClassHasAdventure = (
  id: string | number,
  body: { date_stop: string }
) => {
  return http.put(`/classhasadventure/${id}`, body);
};
