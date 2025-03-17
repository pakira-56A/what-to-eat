import { useState } from "react"
import {
  globalButtonStyle,
  globalButtonHoverStyle
} from "../styles/globalButton"

export const QuizSelectionPage = ({
  selectedAnswer,
  timeCount,
  quizData,
  justQuestion,
  shuffledAnswers
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div>
      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: timeCount <= 2 ? "red" : "orange"
        }}
      >
        {timeCount} 秒以内に
      </div>
      <h3 style={{ color: "orange" }}>{`ご挨拶しよう！`}</h3>

      <div style={{ marginBottom: "20px" }}>
        <img
          src={quizData[justQuestion].image}
          alt="人物"
          style={{ width: "auto", height: "250px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "230px",
          margin: "0 auto"
        }}
      >
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => selectedAnswer(answer)}
            style={{
              ...globalButtonStyle,
              backgroundColor:
                isHovered === index
                  ? globalButtonHoverStyle.backgroundColor
                  : "#00BBFF",
              boxShadow:
                isHovered === index
                  ? globalButtonHoverStyle.boxShadow
                  : globalButtonStyle.boxShadow
            }}
            onMouseOver={() => setIsHovered(index)}
            onMouseOut={() => setIsHovered(null)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  )
}
