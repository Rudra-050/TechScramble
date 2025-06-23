import React, { useState, useEffect } from 'react';
import './App.css';
import { words } from './words';

function App() {
  const [scrambledWord, setScrambledWord] = useState("");
  const [hint, setHint] = useState("");
  const [correctWord, setCorrectWord] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [userInput, setUserInput] = useState("");
  const [maxLength, setMaxLength] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const initGame = () => {
    setTimeLeft(30);
    const randomObj = words[Math.floor(Math.random() * words.length)];
    const wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    setScrambledWord(wordArray.join(""));
    setHint(randomObj.hint);
    setCorrectWord(randomObj.word.toLowerCase());
    setUserInput("");
    setMaxLength(randomObj.word.length);
  };

  useEffect(() => {
    if (!gameStarted) return;
    initGame();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
          initGame();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [correctWord, gameStarted]);

  const checkWord = () => {
    const userWord = userInput.toLowerCase();
    if (!userWord) {
      alert("Please enter the word to check!");
      return;
    }
    if (userWord !== correctWord) {
      alert(`Oops! ${userWord} is not a correct word`);
      return;
    }
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleStart = () => {
    setGameStarted(true);
  };

  return (
    <div className="container">
      <h2>TechScramble</h2>
      {!gameStarted ? (
        <div className="content" style={{ justifyContent: 'center', minHeight: 200 }}>
          <button className="start-btn" onClick={handleStart} style={{ fontSize: '1.3rem', padding: '18px 0', width: '100%', borderRadius: 10, background: 'linear-gradient(90deg, #5372f0 0%, #66a6ff 100%)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #e3eaff' }}>
            Start Game
          </button>
        </div>
      ) : (
        <div className="content">
          <p className="word">{scrambledWord}</p>
          <div className="details">
            <p className="hint">Hint: <span>{hint}</span></p>
            <p className="time">Time Left: <span>{timeLeft}s</span></p>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            ></div>
          </div>
          <input
            type="text"
            spellCheck="false"
            placeholder="Enter a valid word"
            value={userInput}
            onChange={handleInputChange}
            maxLength={maxLength}
          />
          <div className="buttons">
            <button onClick={initGame}>Refresh Word</button>
            <button onClick={checkWord}>Check Word</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;