import http from 'api/config';

export const getAdventures = async () =>
  await http.get('adventures?_embed=adventureSkills');
export const getAdventure = async (adventureId: number | string) =>
  await http.get(
    `adventures/${adventureId}?_embed=stages&_embed=adventureSkills`
  );

export const getClassCurrentAdventure = async (classId: number | string) =>
  await http.get(
    `classes/${classId}/classHasAdventures?current_adventure=true&_embed=adventures`
  );

export const getClassHasAdventure = async (
  classHasAdventureId: number | string
) => await http.get(`classhasadventure/${classHasAdventureId}`);

export const getCompletedClassHasAdventuresByClass = async (
  classId: number | string
) => await http.get(`class/${classId}/class_has_adventures?complete=true`);

export const getAdventuresByGoal = async (goalId: number | string) =>
  await http.get(`/adventure-by-goal-id/${goalId}?goal=true`);

export const getClassHasAdventureProgress = async (
  classHasAdventureId: number | string
) => {
  return await http.get(`classhasadventure/${classHasAdventureId}/progress`);
};

export const setCurrentAdventure = async (body: {
  id_class: number | string;
  id_adventure: number | string;
}) => {
  return await http.post('adventure/set-adventure', body);
};

export const cancelAdventureFromClass = async (id: string | number) => {
  return await http.delete('/delete_adventure_from_class/' + id);
};

export const endClassHasAdventure = async (
  id: string | number,
  body: { date_stop: string }
) => {
  return await http.put(`/classhasadventure/${id}`, body);
};
