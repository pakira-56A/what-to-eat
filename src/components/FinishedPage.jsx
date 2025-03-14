import { useState } from 'react';
import { globalButtonStyle, globalButtonHoverStyle } from '../styles/globalButton';
import { XShareButton } from '../styles/xShareButton';

export const FinishedPage = ({restartQuiz, quizData, score}) => {

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {   // このコンポーネントでのボタンのスタイルを指定
    ...globalButtonStyle,
    backgroundColor: isHovered ? globalButtonHoverStyle.backgroundColor : "violet",
    boxShadow: isHovered ? globalButtonHoverStyle.boxShadow : globalButtonStyle.boxShadow,
  };
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

      <h3 style={{ fontSize: "30px", color: "red", backgroundColor: "#ffeeff",marginBottom: "0px" }}>
        {quizData.length}人中、 {score}人に好かれた！
      </h3>

      <div style={{justifyContent: "center", marginBottom: "40px" }}>
        <XShareButton quizData={quizData} score={score} />
      </div>

      <button
        onClick={restartQuiz}
        style={buttonStyle}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        もっかい好かれに行く
      </button>
  </div>
  )
}