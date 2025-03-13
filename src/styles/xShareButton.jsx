import { useState } from 'react';
import { TwitterShareButton } from 'react-share';

export const XShareButton = ({ quizData, score }) => {
  const shareText = `${quizData.length}人中、${score}人に好かれた！\n #高速ご挨拶クイズ \n`;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TwitterShareButton
      url={window.location.href} // 現在のURLをシェア
      title={shareText}
      style={{
        marginTop: "30px",
        cursor: "pointer",
        boxShadow: isHovered ? "none" : "0 4px 8px rgb(250, 150, 0, 0.6)",
        borderRadius: '10px',
        backgroundColor: isHovered ? 'yellow' : '#a7ffff', //シアン
        padding: '5px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onMouseOver={() => setIsHovered(true)} // Hover stateをtrueに
      onMouseOut={() => setIsHovered(false)} // Hover stateをfalseに
    >
      <img
        src={isHovered ? '/images/xshare-hover.svg' : '/images/xshare.svg'}
        style={{
          width: '60px',
          height: '60px',
        }}
      />
    </TwitterShareButton>
  );
}
