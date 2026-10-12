export interface WordleState {
  solution: string;
  guesses: string[];
  maxGuesses: number;
}

export interface ConnectionCategory {
  category: string;
  items: string[];
  level: 1 | 2 | 3 | 4; // 1 = Yellow (Easiest), 2 = Green, 3 = Blue, 4 = Purple (Tricky)
  color: string;
}

export interface MiniCrosswordCell {
  row: number;
  col: number;
  letter: string;
  number?: number;
  isBlack?: boolean;
}

export interface MiniCrosswordClue {
  number: number;
  direction: 'across' | 'down';
  text: string;
  answer: string;
}

export const DAILY_WORDLE = {
  solution: 'PAPER',
  hint: 'A fundamental medium for broadsheet journalism and printing.'
};

export const DAILY_CONNECTIONS: ConnectionCategory[] = [
  {
    category: 'NEWSPAPER SECTIONS',
    items: ['OPINION', 'METRO', 'SPORTS', 'BUSINESS'],
    level: 1,
    color: '#F9DF6D'
  },
  {
    category: 'THINGS THAT ARE PRINTED',
    items: ['BROADSHEET', 'POSTER', 'CURRENCY', 'RECEIPT'],
    level: 2,
    color: '#A0C35A'
  },
  {
    category: 'SYNONYMS FOR SCOOP / EXCLUSIVE',
    items: ['BEAT', 'LEAD', 'BREAK', 'REVEAL'],
    level: 3,
    color: '#B0C4EF'
  },
  {
    category: 'WORDS BEFORE "LINE"',
    items: ['DATE', 'HEAD', 'DEAD', 'BY'],
    level: 4,
    color: '#BA81C5'
  }
];

export const DAILY_MINI_GRID: MiniCrosswordCell[][] = [
  [
    { row: 0, col: 0, letter: 'P', number: 1 },
    { row: 0, col: 1, letter: 'R', number: 2 },
    { row: 0, col: 2, letter: 'E', number: 3 },
    { row: 0, col: 3, letter: 'S', number: 4 },
    { row: 0, col: 4, letter: 'S', number: 5 }
  ],
  [
    { row: 1, col: 0, letter: 'R', number: 6 },
    { row: 1, col: 1, letter: 'A', letter_correct: 'A' },
    { row: 1, col: 2, letter: 'D', letter_correct: 'D' },
    { row: 1, col: 3, letter: 'A', letter_correct: 'A' },
    { row: 1, col: 4, letter: 'R', letter_correct: 'R' }
  ],
  [
    { row: 2, col: 0, letter: 'I', number: 7 },
    { row: 2, col: 1, letter: 'N', letter_correct: 'N' },
    { row: 2, col: 2, letter: 'I', letter_correct: 'I' },
    { row: 2, col: 3, letter: 'T', letter_correct: 'T' },
    { row: 2, col: 4, letter: 'S', letter_correct: 'S' }
  ],
  [
    { row: 3, col: 0, letter: 'N', number: 8 },
    { row: 3, col: 1, letter: 'G', letter_correct: 'G' },
    { row: 3, col: 2, letter: 'T', letter_correct: 'T' },
    { row: 3, col: 3, letter: 'E', letter_correct: 'E' },
    { row: 3, col: 4, letter: 'E', letter_correct: 'E' }
  ],
  [
    { row: 4, col: 0, letter: 'T', number: 9 },
    { row: 4, col: 1, letter: 'E', letter_correct: 'E' },
    { row: 4, col: 2, letter: 'S', letter_correct: 'S' },
    { row: 4, col: 3, letter: 'T', letter_correct: 'T' },
    { row: 4, col: 4, letter: 'S', letter_correct: 'S' }
  ]
].map((row, rIdx) =>
  row.map((cell, cIdx) => ({
    row: rIdx,
    col: cIdx,
    letter: cell.letter,
    number: cell.number,
    isBlack: false
  }))
);

export const DAILY_MINI_CLUES: MiniCrosswordClue[] = [
  { number: 1, direction: 'across', text: 'Newspaper printing machine or media members', answer: 'PRESS' },
  { number: 6, direction: 'across', text: 'Airport detection equipment', answer: 'RADAR' },
  { number: 7, direction: 'across', text: 'Spells in full', answer: 'INITS' },
  { number: 8, direction: 'across', text: 'Night, in text abbreviations', answer: 'NGTEE' },
  { number: 9, direction: 'across', text: 'Scientific trial runs', answer: 'TESTS' },
  { number: 1, direction: 'down', text: 'Inks onto paper', answer: 'PRINT' },
  { number: 2, direction: 'down', text: 'Area of influence or expertise', answer: 'RANGE' },
  { number: 3, direction: 'down', text: 'Editorial changes', answer: 'EDITS' },
  { number: 4, direction: 'down', text: 'Current condition or standing', answer: 'STATE' },
  { number: 5, direction: 'down', text: 'Dispatches or telegraph wires', answer: 'SRSES' }
];
