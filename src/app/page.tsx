"use client"

import { useEffect, useState } from "react"
import Game from "./components/Game"
import GameCours from "./components/GameCours"
import GameOver from "./components/GameOver"
import GameStart from "./components/GameStart"
import GameTop from "./components/GameTop"

const page = () => {

  const [flag, setFlag] = useState<number>(0)
  const [ncourse, setNcourse] = useState<number>(0)
  const [typedLettersCount, setTypedLettersCount] = useState<number>(0)
  const [typingErrorsCount, setTypingErrorsCount] = useState<number>(0)
  const [completedWordsCount, setCompletedWordsCount] = useState<number>(0)
  const [wordList, setWordList] = useState<string[]>(['']);
  //過去の設定があるか確認し、なければtrueとする。
  const savedTypingSound = localStorage.getItem('typingSound');
  const [isTypingSound, setIsTypingSound] = useState<boolean>(savedTypingSound ? JSON.parse(savedTypingSound) : true)
  const savedBGM = localStorage.getItem('isBGM');
  const [isBGM, setIsBGM] = useState<boolean>(savedBGM ? JSON.parse(savedBGM) : false);

  useEffect(() => {
    if (isBGM) {
      const themeSong = new Audio('/themeSong.mp3');
      themeSong.loop = true;

      const playThemeSong = async () => {
        try {
          await themeSong.play();
        } catch (err) {
          console.error("Audio playback failed", err);
        }
      };

      playThemeSong();

      return () => {
        themeSong.pause();
      };
    }
  }, [isBGM]);

  return (
    <div className="container h-screen flex justify-center flex-col mx-auto">
      <div className="grid grid-cols-10">
        <div className="col-start-3 col-span-6">
          {flag === 0 && <GameTop
            flag={flag} setFlag={setFlag}
            isTypingSound={isTypingSound}
            setIsTypingSound={setIsTypingSound}
            isBGM={isBGM}
            setIsBGM={setIsBGM}
          />}
          {flag === 1 && <GameCours setFlag={setFlag} ncourse={ncourse} setNcourse={setNcourse} />}
          {flag === 2 && <GameStart setFlag={setFlag} setWordList={setWordList} ncourse={ncourse} />}
          {flag === 3 && <Game
            wordList={wordList}
            ncourse={ncourse} setFlag={setFlag}
            typedLettersCount={typedLettersCount}
            setTypedLettersCount={setTypedLettersCount}
            typingErrorsCount={typingErrorsCount}
            setTypingErrorsCount={setTypingErrorsCount}
            completedWordsCount={completedWordsCount}
            setCompletedWordsCount={setCompletedWordsCount}
            isTypingSound={isTypingSound}
          />}
          {flag === 4 && <GameOver
            setFlag={setFlag}
            typedLettersCount={typedLettersCount}
            typingErrorsCount={typingErrorsCount}
            completedWordsCount={completedWordsCount}
            setTypedLettersCount={setTypedLettersCount}
            setTypingErrorsCount={setTypingErrorsCount}
            setCompletedWordsCount={setCompletedWordsCount}
          />}
        </div>
      </div>
    </div>
  )
}

export default page