import { globalButtonStyle } from '../styles/globalButton';
import { XShareButton } from '../styles/xShareButton';

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

      <h3 style={{ fontSize: "30px", color: "orange", marginBottom: "0px" }}>
        {quizData.length}人中、 {score}人に好かれた！
      </h3>

      <div style={{justifyContent: "center", marginBottom: "40px" }}>
        <XShareButton quizData={quizData} score={score} />
      </div>

      <button
        onClick={restartQuiz}
        style={{
          ...globalButtonStyle,
          backgroundColor: "violet",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "orange"
          e.currentTarget.style.boxShadow = "none"
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "violet"
          e.currentTarget.style.boxShadow = "0 4px 8px rgb(250, 150, 0, 0.6)"
        }}
      >
        もっかい好かれに行く
      </button>
  </div>
  )
}