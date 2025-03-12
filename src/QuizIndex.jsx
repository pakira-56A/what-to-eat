"use client"

import { useState, useEffect } from "react"
import { TopPage } from "./components/TopPage"
import { QuizSelectionPage } from "./components/QuizSelectionPage"

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
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeCount, setTimeCount] = useState(3)             // 出題タイマー
  const [isTimeUp, setIsTimeUp] = useState(false)         // タイムアップフラグ
  const [resultTimeCount, setResultTimeCount] = useState(3) // 結果表示の3秒カウントダウン

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
            setResultTimeCount(3) // 結果表示の3秒カウントダウンをセット

            // 結果表示用のカウントダウンタイマーを開始
            const resultTimer = setInterval(() => {
              setResultTimeCount((prevTime) => {
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
  }, [gameState, justQuestion])

  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer)
    const correct = selectedAnswer === quizData[justQuestion].justAnswer
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setGameState("answered")
    setIsTimeUp(false)       // タイムアップをリセット
    setResultTimeCount(3)     // 結果表示の3秒カウントダウンをセット

    // 結果表示用のカウントダウンタイマーを開始
    const resultTimer = setInterval(() => {
      setResultTimeCount((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(resultTimer)
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
            {resultTimeCount} 秒後に
          </div>
          <h3 style={{ color: "orange" }}>{`次のご挨拶いくよ`}</h3>

          <div style={{ marginBottom: "20px", position: "relative" }}>
            <img
              src={quizData[justQuestion].image || "/placeholder.svg"}
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
                  ? "rgba(130, 130, 130, 0.9)"   // グレー
                  : isCorrect
                    ? "rgba(0, 255, 0, 0.9)"     // 緑
                    : "rgba(255, 0, 0, 0.9)",    // 赤
                color:        "white",
                padding:      "20px",
                borderRadius: "5px",
                fontSize:     "30px",
                fontWeight:   "bold",
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
                      ? isCorrect && answer === quizData[justQuestion].justAnswer
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

