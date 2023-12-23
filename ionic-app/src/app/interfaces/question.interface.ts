export interface QuestionInterface {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  mergedAnswers?: string[];
}

export const exampleQuestion: QuestionInterface[] = [
  {
    type: 'boolean',
    difficulty: 'easy',
    category: 'Entertainment: Video Games',
    question:
      'In &quot;Sonic Adventure&quot;, you are able to transform into Super Sonic at will after completing the main story.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Entertainment: Books',
    question: 'The book &quot;Fahrenheit 451&quot; was written by whom?',
    correct_answer: 'Ray Bradbury',
    incorrect_answers: [
      'R. L. Stine',
      'Wolfgang Amadeus Mozart',
      'Stephen King',
    ],
  },
];

// Code 0: Success Returned results successfully.
// Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
// Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
// Code 3: Token Not Found Session Token does not exist.
// Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.
// Code 5: Rate Limit Too many requests have occurred. Each IP can only access the API once every 5 seconds.
