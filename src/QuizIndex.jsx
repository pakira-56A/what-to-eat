"use client"

import { useState, useEffect } from "react"
import { TopPage } from "./components/TopPage"
import { QuizSelectionPage } from "./components/QuizSelectionPage"
import { AnsweredPage } from "./components/AnsweredPage"
import { FinishedPage } from "./components/FinishedPage"

const quizData = [
  {
    image: "/images/おはよう.png",
    justAnswer: "おはよう",
    fakeAnswer: ["ありがとう", "おめでとう"],
  },
  {
    image: "/images/おやすみ.png",
    justAnswer: "おやすみ",
    fakeAnswer: ["おみやげ", "おくやみ"],
  },
  {
    image: "/images/ごちそうさま.png",
    justAnswer: "ごちそうさまでした",
    fakeAnswer: ["ごろつきそうでした", "ごまきがすきでした"],
  },
  {
    image: "/images/夜露死苦.png",
    justAnswer: "夜露死苦",
    fakeAnswer: ["液露ﾀﾋ若", "夜露死若"],
  },
  {
    image: "/images/迷子の外国人.png",
    justAnswer: "Excuse me",
    fakeAnswer: ["Export me", "Ecstasy me"],
  },
  {
    image: "/images/マサイ族.png",
    justAnswer: "éro",
    fakeAnswer: ["nabô", "aré"],
  },
  {
    image: "/images/沖縄.png",
    justAnswer: "くゎっちーさびたん",
    fakeAnswer: ["ちゅーをぅがなびら", "ひんぎれ"],
  },

]

const QuizApp = () => {
  const [justQuestion, setJustQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState("start")     // start, playing, answered, finished
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [timeCount, setTimeCount] = useState(3)           // 出題タイマー
  const [isTimeUp, setIsTimeUp] = useState(false)         // タイムアップフラグ
  const [nextTimeCount, setNextTimeCount] = useState(2)   // 結果表示の2秒カウントダウン

  useEffect(() => {
    if (justQuestion < quizData.length) {
      shuffleAnswers()
    }
  }, [justQuestion])

  useEffect(() => {
    let timer
    if (gameState === "playing") {
      setTimeCount(3)             // 出題タイマー
      setIsTimeUp(false)

      timer = setInterval(() => {
        setTimeCount((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            // タイムアップ処理
            setIsTimeUp(true)
            setGameState("answered")
            setNextTimeCount(2)   // 結果表示の2秒カウントダウンをセット

            // 結果表示用のカウントダウンタイマーを開始
            const nextTimer = setInterval(() => {
              setNextTimeCount((prevTime) => {
                if (prevTime <= 1) {
                  clearInterval(nextTimer)
                  nextQuestion()
                  return 0
                }
                return prevTime - 1
              })
            }, 1000)

            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [gameState, justQuestion])

  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer)
    const correct = selectedAnswer === quizData[justQuestion].justAnswer
    setIsSuccess(correct)
    if (correct) {
      setScore(score + 1)
    }
    setGameState("answered")
    setIsTimeUp(false)       // タイムアップをリセット
    setNextTimeCount(2)      // 結果表示の2秒カウントダウンをセット

    // 結果表示用のカウントダウンタイマーを開始
    const nextTimer = setInterval(() => {
      setNextTimeCount((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(nextTimer)
          nextQuestion()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }

  const shuffleAnswers = () => {   // 正解と間違いを
    const currentQuizData = quizData[justQuestion]
    const allAnswers = [currentQuizData.justAnswer, ...currentQuizData.fakeAnswer]
    setShuffledAnswers(allAnswers.sort(() => Math.random() - 0.5))
  }

  const nextQuestion = () => {
    if (justQuestion + 1 < quizData.length) {
      setJustQuestion(justQuestion + 1)
      setSelectedAnswer(null)
      setGameState("playing")
      setIsTimeUp(false)      // タイムアップをリセット
    } else {
      setGameState("finished")
    }
  }

  const restartQuiz = () => {
    setJustQuestion(0)
    setScore(0)
    setGameState("playing")
    setSelectedAnswer(null)
    setIsTimeUp(false)        // タイムアップをリセット
  }

  const startGame = () => {
    setJustQuestion(0)
    setScore(0)
    setGameState("playing")
    setSelectedAnswer(null)
    setIsTimeUp(false)
  }

  // 統一されたボタンスタイル
  const commonButtonStyle = {
    padding: "10px 25px",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s, box-shadow 0.3s",
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "red", backgroundColor: "lightyellow", marginBottom: "15px" }}>高速ご挨拶クイズ</h1>

      {gameState === "start" && (
        <TopPage
          // 名前 = {親コンポーネントで定義した関数・変数（バリュー)}
          // 名前 = "親コンポーネントで文字列を渡す"
          handleClick={startGame}
        />
      )}

      {gameState === "playing" && (
        <QuizSelectionPage
          selectedAnswer={handleAnswer}
          timeCount={timeCount}
          quizData={quizData}
          justQuestion={justQuestion}
          shuffledAnswers={shuffledAnswers}
        />
      )}

      {gameState === "answered" && (
        <AnsweredPage
        nextTimeCount={nextTimeCount}
        quizData={quizData}
        justQuestion={justQuestion}
        isTimeUp={isTimeUp}
        isSuccess={isSuccess}
        shuffledAnswers={shuffledAnswers}
        selectedAnswer={selectedAnswer}
        />
      )}

      {gameState === "finished" && (
        <FinishedPage
          restartQuiz={restartQuiz}
          quizData={quizData}
          score={score}
        />
      )}
    </div>
  )
}

export default QuizApp