export interface PartieInterface {
  id?: number;
  pseudo: string;
  score: number;
  date?: string;
  time?: string;
}

export const examplePartie: PartieInterface = {
  id: 1,
  pseudo: 'User1',
  score: 200,
  date: '2023-12-22',
  time: '14:46',
};
