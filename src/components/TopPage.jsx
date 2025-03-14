import { useState } from 'react';
import { globalButtonStyle, globalButtonHoverStyle } from '../styles/globalButton';

export const TopPage = ({ handleClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {   // このコンポーネントでのボタンのスタイルを指定
    ...globalButtonStyle,
    backgroundColor: isHovered ? globalButtonHoverStyle.backgroundColor : "violet",
    boxShadow: isHovered ? globalButtonHoverStyle.boxShadow : globalButtonStyle.boxShadow,
  };

  return (
    <div>
      <h3 style={{ color: "orange", marginBottom: "20px" }}>全人類の基本をクリアせよ！</h3>
      <div style={{ marginBottom: "30px" }}>
        <img src="/images/ご挨拶.png" alt="スタート画面" style={{ width: "auto", height: "250px" }} />
      </div>
      <button
        onClick={handleClick}
        style={buttonStyle}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        みんなに好かれにいく
      </button>
    </div>
  )
}