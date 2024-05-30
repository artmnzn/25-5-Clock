import { useState, useEffect } from "react";
import React from "react";
import beepSound from "../sounds/game-start-6104.mp3";

export default function SessionLength() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [labelColor, setLabelColor] = useState("white");
  const [timeLeftColor, setTimeLeftColor] = useState("white");

  useEffect(() => {
    if (timerLabel === "Session") {
      setTimeLeft(sessionLength * 60);
    } else {
      setTimeLeft(breakLength * 60);
    }
  }, [sessionLength, breakLength, timerLabel]);

  useEffect(() => {
    if (timeLeft <= 60) {
      setLabelColor("red");
      setTimeLeftColor("red");
    } else {
      setLabelColor("white");
      setTimeLeftColor("white");
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      playSound();
      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel("Session");
        ("");
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const playSound = () => {
    const audio = new Audio(beepSound);
    audio.play();
  };

  const toggleTimer = () => {
    if (timerRunning) {
      clearInterval(intervalId);
      setTimerRunning(false);
    } else {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(id);
      setTimerRunning(true);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setTimerRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setLabelColor("white");
    setTimeLeftColor("white");
  };

  const incrementSessionLength = () => {
    setSessionLength((prevSessionLength) => prevSessionLength + 1);
  };

  const decrementSessionLength = () => {
    if (sessionLength > 1) {
      setSessionLength((prevSessionLength) => prevSessionLength - 1);
    }
  };

  const incrementBreakLength = () => {
    setBreakLength((prevBreakLength) => prevBreakLength + 1);
  };

  const decrementBreakLength = () => {
    if (breakLength > 1) {
      setBreakLength((prevBreakLength) => prevBreakLength - 1);
    }
  };

  return (
    <div className="h-screen justify-center flex">
      <div className="w-[450px] rounded-full text-center h-1/2 m-auto space-y-5 drop-shadow-lg border pt-5 sessionBox shadow-xl overflow-hidden">
        <h1 className="font-bold text-[30px] text-white">25 + 5 Clock</h1>
        <div id="break-label" className="font-bold text-lg text-white">
          Break Length
        </div>
        <button onClick={decrementBreakLength}>-</button>
        <span id="break-length" className="text-[20px] text-white">
          {breakLength}
        </span>
        <button onClick={incrementBreakLength}>+</button>
        <div id="session-label" className="font-bold text-lg text-white">
          Session Length
        </div>
        <button onClick={decrementSessionLength}>-</button>
        <span id="session-length" className="text-[20px] text-white">
          {sessionLength}
        </span>
        <button onClick={incrementSessionLength}>+</button>

        <div className="w-full">
          <div className="border-2 border-white rounded-md text-[30px] w-[150px] m-auto font-semibold">
            <div id="timer-label" className={labelColor}>
              {timerLabel}
            </div>
            <div id="time-left" className={labelColor}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <button id="start_stop" onClick={toggleTimer}>
          {timerRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}
