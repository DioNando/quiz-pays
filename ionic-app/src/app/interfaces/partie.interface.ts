export interface PartieInterface {
  id: number;
  pseudo: string;
  score: number;
  created_at: string;
  time?: string;
}

export const examplePartie: PartieInterface = {
  id: 1,
  pseudo: 'User1',
  score: 200,
  created_at: '2023-12-22T15:50:30.000000Z',
  time: '',
};
