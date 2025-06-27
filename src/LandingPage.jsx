export default function LandingPage({ handleClick }) {
  return (
    <header className="landing-page">
      <h1>Quizzical</h1>
      <p>Improving your knowledge doesn't have to be boring.</p>
      <button onClick={handleClick} className="start-btn">
        Start Quiz
      </button>
    </header>
  )
}
