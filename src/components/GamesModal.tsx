import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  DAILY_WORDLE,
  DAILY_CONNECTIONS,
  DAILY_MINI_GRID,
  DAILY_MINI_CLUES
} from '../data/games';

interface GamesModalProps {
  initialGame?: 'wordle' | 'connections' | 'spellingbee' | 'mini';
  onClose: () => void;
}

export const GamesModal: React.FC<GamesModalProps> = ({
  initialGame = 'wordle',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'wordle' | 'connections' | 'spellingbee' | 'mini'>(
    initialGame
  );

  // ==================== WORDLE STATE ====================
  const [wordleGuesses, setWordleGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [wordleMessage, setWordleMessage] = useState<string>('');
  const [wordleWon, setWordleWon] = useState<boolean>(false);
  const solution = DAILY_WORDLE.solution;

  const handleKeyInput = useCallback(
    (key: string) => {
      if (wordleWon || wordleGuesses.length >= 6) return;

      if (key === 'ENTER') {
        if (currentGuess.length !== 5) {
          setWordleMessage('Not enough letters');
          setTimeout(() => setWordleMessage(''), 1500);
          return;
        }
        const nextGuesses = [...wordleGuesses, currentGuess];
        setWordleGuesses(nextGuesses);
        if (currentGuess === solution) {
          setWordleWon(true);
          setWordleMessage('Genius! Splendid wordplay.');
          try {
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
          } catch {
            // ignore
          }
        } else if (nextGuesses.length >= 6) {
          setWordleMessage(`The word was ${solution}`);
        }
        setCurrentGuess('');
      } else if (key === 'BACKSPACE' || key === 'DEL') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + key);
        }
      }
    },
    [currentGuess, wordleGuesses, wordleWon, solution]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'wordle') return;
      if (e.key === 'Enter') handleKeyInput('ENTER');
      else if (e.key === 'Backspace') handleKeyInput('BACKSPACE');
      else if (/^[a-zA-Z]$/.test(e.key)) handleKeyInput(e.key.toUpperCase());
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, handleKeyInput]);

  const getTileStatus = (letter: string, index: number, guess: string) => {
    if (solution[index] === letter) return 'bg-[#6aaa64] text-white border-[#6aaa64]';
    if (solution.includes(letter)) return 'bg-[#c9b458] text-white border-[#c9b458]';
    return 'bg-[#787c7e] text-white border-[#787c7e]';
  };

  // ==================== CONNECTIONS STATE ====================
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedCategories, setSolvedCategories] = useState<string[]>([]);
  const [connectionsMistakes, setConnectionsMistakes] = useState(4);
  const [connectionsMsg, setConnectionsMsg] = useState('');
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);

  useEffect(() => {
    const all = DAILY_CONNECTIONS.flatMap((c) => c.items);
    setShuffledWords([...all].sort(() => Math.random() - 0.5));
  }, []);

  const toggleSelectWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      if (selectedWords.length < 4) {
        setSelectedWords([...selectedWords, word]);
      }
    }
  };

  const submitConnections = () => {
    if (selectedWords.length !== 4) return;
    const match = DAILY_CONNECTIONS.find(
      (cat) =>
        !solvedCategories.includes(cat.category) &&
        cat.items.every((it) => selectedWords.includes(it))
    );

    if (match) {
      setSolvedCategories([...solvedCategories, match.category]);
      setSelectedWords([]);
      setConnectionsMsg(`Found: ${match.category}!`);
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch {
        // ignore
      }
      setTimeout(() => setConnectionsMsg(''), 2000);
    } else {
      const nextMistakes = connectionsMistakes - 1;
      setConnectionsMistakes(nextMistakes);
      setConnectionsMsg(nextMistakes === 0 ? 'Game over! No more guesses.' : 'One away or incorrect grouping.');
      setTimeout(() => setConnectionsMsg(''), 2000);
    }
  };

  // ==================== THE MINI STATE ====================
  const [miniGrid, setMiniGrid] = useState(DAILY_MINI_GRID);
  const [miniUserAnswers, setMiniUserAnswers] = useState<Record<string, string>>({
    '0-0': 'P',
    '0-1': 'R',
    '0-2': 'E',
    '0-3': 'S',
    '0-4': 'S'
  });
  const [miniSelectedCell, setMiniSelectedCell] = useState<{ r: number; c: number }>({ r: 1, c: 0 });
  const [miniTimer, setMiniTimer] = useState(34);
  const [miniSolved, setMiniSolved] = useState(false);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (activeTab === 'mini' && !miniSolved) {
      t = setInterval(() => setMiniTimer((s) => s + 1), 1000);
    }
    return () => clearInterval(t);
  }, [activeTab, miniSolved]);

  const handleMiniCellInput = (r: number, c: number, char: string) => {
    if (miniSolved) return;
    const key = `${r}-${c}`;
    const newAnswers = { ...miniUserAnswers, [key]: char.toUpperCase() };
    setMiniUserAnswers(newAnswers);

    // Auto advance to next cell
    if (c < 4) setMiniSelectedCell({ r, c: c + 1 });
    else if (r < 4) setMiniSelectedCell({ r: r + 1, c: 0 });

    // Check if fully solved
    let allCorrect = true;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const expected = miniGrid[row][col].letter;
        if (newAnswers[`${row}-${col}`] !== expected) {
          allCorrect = false;
        }
      }
    }
    if (allCorrect) {
      setMiniSolved(true);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {
        // ignore
      }
    }
  };

  // ==================== SPELLING BEE STATE ====================
  const [beeInput, setBeeInput] = useState('');
  const [beeWords, setBeeWords] = useState<string[]>(['PLANET', 'PLANT', 'PLATE']);
  const [beeMsg, setBeeMsg] = useState('');
  const beeCenter = 'T';
  const beeLetters = ['P', 'L', 'A', 'N', 'E', 'R'];

  const submitBeeWord = () => {
    const word = beeInput.toUpperCase();
    if (word.length < 4) {
      setBeeMsg('Too short (min 4 letters)');
      setTimeout(() => setBeeMsg(''), 1500);
      return;
    }
    if (!word.includes(beeCenter)) {
      setBeeMsg('Missing center letter (T)');
      setTimeout(() => setBeeMsg(''), 1500);
      return;
    }
    if (beeWords.includes(word)) {
      setBeeMsg('Already found');
      setTimeout(() => setBeeMsg(''), 1500);
      return;
    }
    setBeeWords([word, ...beeWords]);
    setBeeInput('');
    setBeeMsg('Nice! +4 points');
    setTimeout(() => setBeeMsg(''), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border-2 border-black max-w-2xl w-full p-4 sm:p-6 space-y-4 my-auto relative shadow-2xl">
        {/* Header Tabs */}
        <div className="flex items-center justify-between border-b border-black pb-3">
          <div className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto text-xs font-sans font-bold">
            <span className="text-sm font-serif font-black mr-2 hidden sm:inline">LE MONDE JEUX</span>
            {(
              [
                { id: 'mini', label: 'Mots Croisés' },
                { id: 'wordle', label: 'Le Wordle' },
                { id: 'connections', label: 'Connections' },
                { id: 'spellingbee', label: 'La Ruche' }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 transition-colors cursor-pointer uppercase tracking-wider ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'bg-[#f0f0f0] text-black hover:bg-[#e0e0e0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="text-black hover:text-[#5A5A5A] text-xl font-bold p-1 cursor-pointer"
            aria-label="Close Games"
          >
            ✕
          </button>
        </div>

        {/* ================= WORDLE TAB ================= */}
        {activeTab === 'wordle' && (
          <div className="flex flex-col items-center space-y-3 font-sans">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-black">Wordle</h3>
              <p className="text-xs text-[#5A5A5A]">Get 6 chances to guess a 5-letter word.</p>
              {wordleMessage && (
                <div className="mt-1 px-3 py-1 bg-black text-white text-xs font-bold inline-block">
                  {wordleMessage}
                </div>
              )}
            </div>

            {/* 6x5 Grid */}
            <div className="grid grid-rows-6 gap-1.5 w-64 max-w-full">
              {Array.from({ length: 6 }).map((_, rowIndex) => {
                const guess = wordleGuesses[rowIndex] || '';
                const isCurrent = rowIndex === wordleGuesses.length;
                return (
                  <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                    {Array.from({ length: 5 }).map((_, colIndex) => {
                      let letter = '';
                      let tileClass = 'border-2 border-[#d3d6da] text-black bg-white';

                      if (rowIndex < wordleGuesses.length) {
                        letter = guess[colIndex] || '';
                        tileClass = getTileStatus(letter, colIndex, guess);
                      } else if (isCurrent) {
                        letter = currentGuess[colIndex] || '';
                        if (letter) tileClass = 'border-2 border-black text-black';
                      }

                      return (
                        <div
                          key={colIndex}
                          className={`aspect-square flex items-center justify-center font-bold text-lg sm:text-xl transition-all ${tileClass}`}
                        >
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Virtual Keyboard */}
            <div className="w-full max-w-md space-y-1 pt-2">
              {[
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
              ].map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center space-x-1">
                  {row.map((k) => (
                    <button
                      key={k}
                      onClick={() => handleKeyInput(k)}
                      className={`h-10 px-2 sm:px-2.5 rounded-xs font-bold text-xs bg-[#d3d6da] hover:bg-[#b0b3b7] text-black active:bg-[#999] cursor-pointer ${
                        k.length > 1 ? 'px-3 text-[0.625rem]' : ''
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {wordleWon && (
              <p className="text-xs font-serif italic text-[#2c638b]">
                Hint: {DAILY_WORDLE.hint}
              </p>
            )}
          </div>
        )}

        {/* ================= CONNECTIONS TAB ================= */}
        {activeTab === 'connections' && (
          <div className="flex flex-col items-center space-y-3 font-sans">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-black">Connections</h3>
              <p className="text-xs text-[#5A5A5A]">Group words that share a common thread.</p>
              {connectionsMsg && (
                <div className="mt-1 px-3 py-1 bg-black text-white text-xs font-bold inline-block">
                  {connectionsMsg}
                </div>
              )}
            </div>

            {/* Solved Categories Banners */}
            <div className="w-full space-y-1.5">
              {solvedCategories.map((catName) => {
                const cat = DAILY_CONNECTIONS.find((c) => c.category === catName);
                if (!cat) return null;
                return (
                  <div
                    key={catName}
                    style={{ backgroundColor: cat.color }}
                    className="p-3 text-center rounded-none font-bold text-black border border-black/20"
                  >
                    <span className="block text-xs uppercase tracking-wider">{cat.category}</span>
                    <span className="block text-sm font-normal">{cat.items.join(', ')}</span>
                  </div>
                );
              })}
            </div>

            {/* Unsolved Words Grid */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-lg">
              {shuffledWords
                .filter(
                  (word) =>
                    !solvedCategories.some((catName) => {
                      const cat = DAILY_CONNECTIONS.find((c) => c.category === catName);
                      return cat?.items.includes(word);
                    })
                )
                .map((word) => {
                  const isSelected = selectedWords.includes(word);
                  return (
                    <button
                      key={word}
                      onClick={() => toggleSelectWord(word)}
                      className={`h-16 p-1 text-center font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-black text-white border-black'
                          : 'bg-[#efeded] text-black border-[#d3d6da] hover:bg-[#e0dede]'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
            </div>

            {/* Mistakes & Actions */}
            <div className="flex items-center justify-between w-full max-w-lg pt-2 text-xs">
              <div className="flex items-center space-x-1">
                <span className="text-[#5A5A5A]">Mistakes remaining:</span>
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full inline-block ${
                      i < connectionsMistakes ? 'bg-black' : 'bg-[#d3d6da]'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedWords([])}
                  className="px-3 py-1.5 border border-black text-black font-bold uppercase tracking-wider hover:bg-[#f0f0f0] cursor-pointer"
                >
                  Deselect All
                </button>
                <button
                  onClick={submitConnections}
                  disabled={selectedWords.length !== 4}
                  className={`px-4 py-1.5 font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedWords.length === 4
                      ? 'bg-black text-white hover:bg-neutral-800'
                      : 'bg-[#d3d6da] text-[#777] cursor-not-allowed'
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= THE MINI TAB ================= */}
        {activeTab === 'mini' && (
          <div className="flex flex-col items-center space-y-3 font-sans">
            <div className="flex justify-between items-center w-full border-b border-[#E2E2E2] pb-2">
              <div>
                <h3 className="text-xl font-serif font-bold text-black">The Mini Crossword</h3>
                <p className="text-xs text-[#5A5A5A]">Solve today’s 5×5 daily puzzle.</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-black bg-[#f0f0f0] px-2 py-1">
                  ⏱ {Math.floor(miniTimer / 60)}:{(miniTimer % 60).toString().padStart(2, '0')}
                </span>
                {miniSolved && (
                  <span className="block text-xs font-bold text-[#6aaa64]">✓ SOLVED!</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* 5x5 Crossword Grid */}
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-5 gap-0.5 border-2 border-black bg-black p-0.5 w-60">
                  {miniGrid.map((row, rIdx) =>
                    row.map((cell, cIdx) => {
                      const isSelected =
                        miniSelectedCell.r === rIdx && miniSelectedCell.c === cIdx;
                      const val = miniUserAnswers[`${rIdx}-${cIdx}`] || '';
                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          onClick={() => setMiniSelectedCell({ r: rIdx, c: cIdx })}
                          className={`relative aspect-square flex items-center justify-center font-bold text-lg cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#9fd1ff]' : 'bg-white hover:bg-[#f9f9f9]'
                          }`}
                        >
                          {cell.number && (
                            <span className="absolute top-0.5 left-1 text-[0.625rem] text-[#5A5A5A] leading-none">
                              {cell.number}
                            </span>
                          )}
                          <input
                            type="text"
                            maxLength={1}
                            value={val}
                            onChange={(e) =>
                              handleMiniCellInput(rIdx, cIdx, e.target.value.slice(-1))
                            }
                            className="w-full h-full text-center font-bold uppercase bg-transparent outline-none cursor-pointer"
                          />
                        </div>
                      );
                    })
                  )}
                </div>
                <button
                  onClick={() => {
                    const complete: Record<string, string> = {};
                    miniGrid.forEach((row, r) =>
                      row.forEach((cell, c) => {
                        complete[`${r}-${c}`] = cell.letter;
                      })
                    );
                    setMiniUserAnswers(complete);
                    setMiniSolved(true);
                  }}
                  className="mt-2 text-[0.6875rem] text-[#2c638b] hover:underline font-bold cursor-pointer"
                >
                  Reveal Solution
                </button>
              </div>

              {/* Clues */}
              <div className="space-y-3 text-xs overflow-y-auto max-h-60 pr-1">
                <div>
                  <h4 className="font-bold text-black border-b border-[#E2E2E2] pb-1 uppercase tracking-wider text-[0.6875rem]">
                    Across
                  </h4>
                  <ul className="space-y-1 mt-1">
                    {DAILY_MINI_CLUES.filter((c) => c.direction === 'across').map((clue) => (
                      <li key={`a-${clue.number}`} className="flex space-x-1.5 text-black">
                        <span className="font-bold">{clue.number}.</span>
                        <span>{clue.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-black border-b border-[#E2E2E2] pb-1 uppercase tracking-wider text-[0.6875rem]">
                    Down
                  </h4>
                  <ul className="space-y-1 mt-1">
                    {DAILY_MINI_CLUES.filter((c) => c.direction === 'down').map((clue) => (
                      <li key={`d-${clue.number}`} className="flex space-x-1.5 text-black">
                        <span className="font-bold">{clue.number}.</span>
                        <span>{clue.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SPELLING BEE TAB ================= */}
        {activeTab === 'spellingbee' && (
          <div className="flex flex-col items-center space-y-3 font-sans">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-black">Spelling Bee</h3>
              <p className="text-xs text-[#5A5A5A]">
                Words must contain at least 4 letters and include the center letter ({beeCenter}).
              </p>
              {beeMsg && (
                <div className="mt-1 px-3 py-1 bg-black text-white text-xs font-bold inline-block">
                  {beeMsg}
                </div>
              )}
            </div>

            {/* Honeycomb Letter Selector */}
            <div className="flex items-center space-x-2 my-2">
              <button
                onClick={() => setBeeInput((prev) => prev + beeCenter)}
                className="w-12 h-12 bg-yellow-400 font-bold text-lg text-black rounded-none flex items-center justify-center border-2 border-black hover:bg-yellow-300 cursor-pointer shadow-sm"
              >
                {beeCenter}
              </button>
              {beeLetters.map((l) => (
                <button
                  key={l}
                  onClick={() => setBeeInput((prev) => prev + l)}
                  className="w-10 h-10 bg-[#e9e8e7] font-bold text-base text-black rounded-none flex items-center justify-center border border-[#d3d6da] hover:bg-[#dbdad9] cursor-pointer"
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 w-full max-w-xs">
              <input
                type="text"
                value={beeInput}
                onChange={(e) => setBeeInput(e.target.value.toUpperCase())}
                placeholder="Type or click letters..."
                className="border border-black px-3 py-1.5 text-sm font-bold flex-1 uppercase"
              />
              <button
                onClick={submitBeeWord}
                className="bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 cursor-pointer"
              >
                Enter
              </button>
            </div>

            {/* Found Words */}
            <div className="w-full bg-[#f8f8f8] p-3 border border-[#E2E2E2] text-xs">
              <span className="font-bold text-black block mb-1">
                Words Found ({beeWords.length}) — Rank: Solid
              </span>
              <div className="flex flex-wrap gap-2 text-black font-mono">
                {beeWords.map((w) => (
                  <span key={w} className="bg-white px-2 py-0.5 border border-[#ddd]">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
