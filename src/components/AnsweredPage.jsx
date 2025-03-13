import { globalButtonStyle } from '../styles/globalButton';

export const AnsweredPage = ({nextTimeCount, quizData, justQuestion, isTimeUp, isSuccess, shuffledAnswers, selectedAnswer}) => {

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
      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: "orange",
        }}
      >
        {nextTimeCount} 秒後に
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
              : isSuccess
                ? "rgba(0, 255, 0, 0.9)"     // 緑
                : "rgba(255, 0, 0, 0.9)",    // 赤
            color:        "white",
            padding:      "20px",
            borderRadius: "5px",
            fontSize:     "30px",
            fontWeight:   "bold",
          }}
        >
          {isTimeUp ? "時間切れ" : isSuccess ? "しゅきぃ" : "ちゃうで"}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "230px" }}>
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            style={{
              ...globalButtonStyle,
              backgroundColor:
                selectedAnswer === answer
                  ? isSuccess && answer === quizData[justQuestion].justAnswer
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
  )
}