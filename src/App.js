import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timingType, setTimingType] = useState("SESSION");
  const [play, setPlay] = useState(false);
  const [timerZero, setTimerZero] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timeLeft > 0 && play) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0) {
        setTimerZero(true);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [play, timeLeft]);

  useEffect(() => {
    if (timerZero) {
      resetTimer();
      setTimerZero(false);
    }
  }, [timerZero]);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const handleReset = () => {
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (timingType === "SESSION") {
      setTimeLeft(breakLength * 60);
      setTimingType("BREAK");
    } else {
      setTimeLeft(sessionLength * 60);
      setTimingType("SESSION");
    }
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
    audio.play();
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const timerTitle = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div className="App">
      <header>
        <h1>Pomodoro</h1>
      </header>
      <main>
        <section className="length-controls">
          <div>
            <p id="break-label">Break Length</p>
            <button
              disabled={play}
              onClick={handleBreakIncrease}
              id="break-increment"
            >
              <i className="fa-solid fa-chevron-up"></i>
            </button>
            <p id="break-length">{breakLength}</p>
            <button
              disabled={play}
              onClick={handleBreakDecrease}
              id="break-decrement"
            >
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>
          <div>
            <p id="session-label">Session Length</p>
            <button
              disabled={play}
              onClick={handleSessionIncrease}
              id="session-increment"
            >
              <i className="fa-solid fa-chevron-up"></i>
            </button>
            <p id="session-length">{sessionLength}</p>
            <button
              disabled={play}
              onClick={handleSessionDecrease}
              id="session-decrement"
            >
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </section>
        <section className="timer">
          <p id="timer-label">{timerTitle}</p>
          <p id="time-left">{timeFormatter()}</p>
        </section>
        <section className="timer-controls">
          <button onClick={handlePlay} id="start_stop">
            <i className={`fa-solid fa-${play ? "pause" : "play"}`}></i>
          </button>
          <button onClick={handleReset} id="reset">
            <i className="fa-solid fa-rotate"></i>
          </button>
        </section>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Pomodoro. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
