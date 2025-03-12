
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


export const TopPage = ({ handleClick }) => {

  return (
    <>
      <div>
        <h3 style={{ color: "orange", marginBottom: "20px" }}>全人類の基本をクリアせよ！</h3>
        <div style={{ marginBottom: "30px" }}>
          <img src="/images/ご挨拶.png" alt="スタート画面" style={{ width: "auto", height: "250px" }} />
        </div>
        <button
          onClick={handleClick}
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
    </>
  )
}