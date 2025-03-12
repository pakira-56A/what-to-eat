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

export const FinishedPage = ({restartQuiz, quizData, score}) => {
  return (
    <div
      style={{
        backgroundImage: `url(/images/背景.png)`,
        backgroundSize: 'cover',
        position: 'fixed',
        width: '100vw', // 画面幅に合わせる
        height: '80vw',
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
  )
}