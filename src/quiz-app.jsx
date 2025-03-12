"use client"

import { useState, useEffect } from "react"

const quizData = [
  {
    image: "/images/おはよう.png",
    correctAnswer: "おはよう",
    incorrectAnswers: ["ありがとう", "おめでとう"],
  },
  {
    image: "/images/おやすみ.png",
    correctAnswer: "おやすみ",
    incorrectAnswers: ["おみやげ", "おくやみ"],
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
    correctAnswer: "くゎっちーさびたん",
    incorrectAnswers: ["ちゅーをぅがなびら", "ひんぎれ"],
  },

]

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState("start")     // start, playing, answered, finished
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(3)             // 出題タイマー
  const [isTimeUp, setIsTimeUp] = useState(false)         // タイムアップフラグ
  const [resultTimeLeft, setResultTimeLeft] = useState(3) // 結果表示の3秒カウントダウン

  useEffect(() => {
    if (currentQuestion < quizData.length) {
      shuffleAnswers()
    }
  }, [currentQuestion])

  useEffect(() => {
    let timer
    if (gameState === "playing") {
      setTimeLeft(3)             // 出題タイマー
      setIsTimeUp(false)

      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            // タイムアップ処理
            setIsTimeUp(true)
            setGameState("answered")
            setResultTimeLeft(3) // 結果表示の3秒カウントダウンをセット

            // 結果表示用のカウントダウンタイマーを開始
            const resultTimer = setInterval(() => {
              setResultTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                  clearInterval(resultTimer)
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
  }, [gameState, currentQuestion])

  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer)
    const correct = selectedAnswer === quizData[currentQuestion].correctAnswer
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setGameState("answered")
    setIsTimeUp(false)       // タイムアップをリセット
    setResultTimeLeft(3)     // 結果表示の3秒カウントダウンをセット

    // 結果表示用のカウントダウンタイマーを開始
    const resultTimer = setInterval(() => {
      setResultTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(resultTimer)
          nextQuestion()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }

  const shuffleAnswers = () => {
    const currentQuizData = quizData[currentQuestion]
    const allAnswers = [currentQuizData.correctAnswer, ...currentQuizData.incorrectAnswers]
    setShuffledAnswers(allAnswers.sort(() => Math.random() - 0.5))
  }

  const nextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setGameState("playing")
      setIsTimeUp(false)      // タイムアップをリセット
    } else {
      setGameState("finished")
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setGameState("playing")
    setSelectedAnswer(null)
    setIsTimeUp(false)        // タイムアップをリセット
  }

  const startGame = () => {
    setCurrentQuestion(0)
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
        <div>
          <h3 style={{ color: "orange", marginBottom: "20px" }}>全人類の基本をクリアせよ！</h3>
          <div style={{ marginBottom: "30px" }}>
            <img src="/images/ご挨拶.png" alt="スタート画面" style={{ width: "auto", height: "250px" }} />
          </div>
          <button
            onClick={startGame}
            style={{
              ...commonButtonStyle,
              backgroundColor: "violet",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "orange"
              e.currentTarget.style.boxShadow = "none"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "violet"
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"
            }}
          >
            みんなに好かれにいく
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: timeLeft <= 2 ? "red" : "orange",
            }}
          >
            {timeLeft} 秒以内に
          </div>
          <h3 style={{ color: "orange" }}>{`ご挨拶しよう！`}</h3>

          <div style={{ marginBottom: "20px" }}>
            <img
              src={quizData[currentQuestion].image || "/placeholder.svg"}
              alt="人物"
              style={{ width: "auto", height: "250px" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "230px", margin: "0 auto" }}>
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer)}
                style={{
                  ...commonButtonStyle,
                  backgroundColor: "#00BBFF", // ほどよい青
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "orange"
                  e.currentTarget.style.boxShadow = "none"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#00BBFF"  // ほどよい青
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"
                }}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === "answered" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "orange",
            }}
          >
            {resultTimeLeft} 秒後に
          </div>
          <h3 style={{ color: "orange" }}>{`次のご挨拶いくよ`}</h3>

          <div style={{ marginBottom: "20px", position: "relative" }}>
            <img
              src={quizData[currentQuestion].image || "/placeholder.svg"}
              alt="人物"
              style={{ width: "auto", height: "250px" }}
            />
            <div
              style={{   // タイムアップか正解不正解の表示
                position: "absolute",
                width: "120px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: isTimeUp
                  ? "rgba(130, 130, 130, 0.9)" // グレー
                  : isCorrect
                    ? "rgba(0, 255, 0, 0.9)"   // 緑
                    : "rgba(255, 0, 0, 0.9)",  // 赤
                color: "white",
                padding: "20px",
                borderRadius: "5px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {isTimeUp ? "時間切れ⏰" : isCorrect ? "正しい😊" : "違うで😠"}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "230px" }}>
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                style={{
                  ...commonButtonStyle,
                  backgroundColor:
                    selectedAnswer === answer
                      ? isCorrect && answer === quizData[currentQuestion].correctAnswer
                        ? "lightgreen"
                        : "red"
                      : "skyblue",
                  opacity: 0.5,
                  boxShadow: "none",
                }}
                disabled
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === "finished" && (
        <div
          style={{
            backgroundImage: `url(/images/背景.png)`,
            backgroundSize: 'cover',
            position: 'fixed',
            width: '100vw', // 画面幅に合わせる
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}>

          <h3 style={{ fontSize: "30px", color: "orange", marginBottom: "30px" }}>
            {quizData.length}人中、 {score}人に好かれた！
          </h3>

          <button
            onClick={restartQuiz}
            style={{
              ...commonButtonStyle,
              backgroundColor: "violet",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "orange"
              e.currentTarget.style.boxShadow = "none"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "violet"
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"
            }}
          >
            もっかい好かれに行く
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizApp

