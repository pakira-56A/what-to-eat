"use client"

import { useState, useEffect } from "react"

const quizData = [
  {
    image: "/images/おはよう.png",
    correctAnswer: "おはようございます",
    incorrectAnswers: ["ありがとうございます", "おめでとうございます"],
  },
  {
    image: "/images/ごちそうさま.png",
    correctAnswer: "ごちそうさまでした",
    incorrectAnswers: ["ごろつきそうでした", "ごまきがすきでした"],
  },
  {
    image: "/images/夜露死苦.png",
    correctAnswer: "夜露死苦",
    incorrectAnswers: ["液露ﾀﾋ若", "夜露死若"],
  },
  {
    image: "/images/迷子の外国人.png",
    correctAnswer: "Excuse me",
    incorrectAnswers: ["Export me", "Ecstasy me"],
  },
  {
    image: "/images/マサイ族.png",
    correctAnswer: "éro",
    incorrectAnswers: ["nabô ", "aré"],
  },
  {
    image: "/images/沖縄.png",
    correctAnswer: "ぐぁっちーさびたん",
    incorrectAnswers: ["めーごさー", "ひんぎれ"],
  },

]

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState("playing") // playing, answered, finished
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    if (currentQuestion < quizData.length) {
      shuffleAnswers()
    }
  }, [currentQuestion])

  const shuffleAnswers = () => {
    const currentQuizData = quizData[currentQuestion]
    const allAnswers = [currentQuizData.correctAnswer, ...currentQuizData.incorrectAnswers]
    setShuffledAnswers(allAnswers.sort(() => Math.random() - 0.5))
  }

  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer)
    const correct = selectedAnswer === quizData[currentQuestion].correctAnswer
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setGameState("answered")
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setGameState("playing")
    } else {
      setGameState("finished")
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setGameState("playing")
    setSelectedAnswer(null)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {(gameState === "playing" || gameState === "answered") && (
        <>
          <h1 style={{ marginBottom: "5px" }}>
            高速ご挨拶クイズ
          </h1>
          <h2 style={{ marginBottom: "5px", color: "orange" }}>
            {currentQuestion + 1} 人目に ご挨拶しよう！
          </h2>
          <div style={{ marginBottom: "5px", position: "relative" }}>
            <img
              src={quizData[currentQuestion].image || "/placeholder.svg"}
              alt="人物"
              style={{ width: 'auto', height: '250px' }}
            />
            {gameState === "answered" && (
              <div
                style={{
                  position: "absolute",
                  width: "120px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: isCorrect ? "rgba(0, 255, 0, 0.9)" : "rgba(255, 0, 0, 0.9)",
                  color: "white",
                  padding: "20px",
                  borderRadius: "5px",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                {isCorrect ? "正しい😊" : "違うで😠"}
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "230px" }}>
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer)}
                style={{
                  ...buttonStyle,
                  backgroundColor:
                    selectedAnswer === answer
                      ? isCorrect && answer === quizData[currentQuestion].correctAnswer
                        ? "lightgreen"
                        : "red"
                      : "skyblue",
                  opacity: gameState === "answered" ? 0.3 : 1,
                }}
                disabled={gameState === "answered"}
              >
                {answer}
              </button>
            ))}
          </div>
          {gameState === "answered" && (
            <button onClick={nextQuestion} style={{ ...buttonStyle, marginTop: "30px", backgroundColor: "orange", width: "300px" }}>
              次の問題へ
            </button>
          )}
        </>
      )}

      {gameState === "finished" && (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "24px" }}>お疲れ！！</h2>
          <p style={{ fontSize: "20px", marginBottom: "20px" }}>
            {quizData.length}人中、 {score}人に好かれた！
          </p>
          <button onClick={restartQuiz} style={{ ...buttonStyle, marginTop: "20px" }}>
            もっかいチャレンジ
          </button>
        </div>
      )}
    </div>
  )
}

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "orange",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
  transition: "background-color 0.3s",
}

