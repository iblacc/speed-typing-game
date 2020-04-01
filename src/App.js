import React, {useState, useEffect, useRef} from 'react';

function App() {
    const [gameInput, setGameInput] = useState({startTime: '', completedTime: 0, text: ''});
    const [wordCount, setWordCount] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const textFieldRef = useRef(null);
    
    function handleChange(e) {
        const {name, value} = e.target;
        setGameInput(prevGameInput => ({...prevGameInput, [name]: value}));
    }
    
    function wordLength(text) {
        const wordList = text.trim().split(" ");
        return wordList.filter(word => word.length).length;
    }
    
    function startGame() {
      setTimeRemaining(gameInput.startTime);
      setGameInput(prevGameInput => ({...prevGameInput, text: '', completedTime: prevGameInput.startTime}));
      setWordCount(0);
      setIsTimeRunning(true);
      textFieldRef.current.disabled = false;
      textFieldRef.current.focus();
    }
    
    function endGame() {
      setIsTimeRunning(false);
      setWordCount(wordLength(gameInput.text));   
    }
    
    useEffect(() => {
        if(timeRemaining && isTimeRunning) {
            setTimeout(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
        } else if(!timeRemaining) {
            endGame();
        }
    }, [timeRemaining, isTimeRunning])
    
    return (
        <div>
          <h1>How long do you want to type? (in seconds)</h1>
          <input
            type={"number"}
            name={"startTime"}
            value={gameInput.startTime}
            onChange={handleChange}
            disabled={isTimeRunning}
          />
          <h1>How fast do you type?</h1>
          <textarea
              ref={textFieldRef}
              name={"text"}
              value={gameInput.text}
              onChange={handleChange}
              disabled={!isTimeRunning}
          />
          <h4>Time remaining: {timeRemaining}</h4>
          <button
              onClick={startGame}
              disabled={isTimeRunning}
          >
              Start
          </button>
          { 
            !isTimeRunning && gameInput.completedTime ?
              <h1>Word count: {Math.round((wordCount / gameInput.completedTime) * 60)}WPM</h1>
            :
              null
          }
          
        </div>
    )
}

export default App
