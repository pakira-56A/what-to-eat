
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

export const QuizSelectionPage = ({selectedAnswer, timeCount, quizData, justQuestion, shuffledAnswers}) => {

  return (
    <>
      <div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: timeCount <= 2 ? "red" : "orange",
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
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "230px", margin: "0 auto" }}>
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => selectedAnswer(answer)}
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
    </>
  )

}