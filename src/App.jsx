// QuizzApp.jsx
import React from "react"
import LandingPage from "./LandingPage" 
import Questions from "./Questions"
import clsx from "clsx"

export default function QuizApp() {
  const [quizStarted, setQuizStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [userAnswers, setUserAnswers] = React.useState({})
  const [showResults, setShowResults] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  // Fetch quiz data from API
  const fetchData = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      if (!res.ok) throw new Error("Failed to fetch data")

      const data = await res.json()
      const formattedQuestions = data.results.map(q => ({
        ...q,
        allAnswers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
      }))

      setQuestions(formattedQuestions)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch on initial render
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  const startQuiz = () => {
    setQuizStarted(true)
  }

  const selectAnswer = (questionIndex, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const submitAnswers = () => {
    setShowResults(true)
  }

  const resetGame = () => {
    fetchData()
    setShowResults(false)
    setUserAnswers({})
  }

  const resultsFooter = () => {
    const score = questions.reduce((acc, question, index) => {
      return userAnswers[index] === question.correct_answer ? acc + 1 : acc
    }, 0)

    return (
      <footer className="play-again">
        <h2>You scored {score}/5 correct answers</h2>
        <button className="average-btn" onClick={resetGame}>Play again</button>
      </footer>
    )
  }

  const checkAnswersBtn = (
    <button
      className={clsx("average-btn", {
        "not-available": Object.keys(userAnswers).length !== 5
      })}
      onClick={submitAnswers}
      disabled={Object.keys(userAnswers).length !== 5}
    >
      Check answers
    </button>
  )

  const questionElements = questions.map((question, index) => (
    <Questions
      key={index}
      index={index}
      question={question.question}
      correct_answer={question.correct_answer}
      incorrect_answers={question.incorrect_answers}
      onSelect={selectAnswer}
      selected={userAnswers[index]}
      allAnswers={question.allAnswers}
      showResults={showResults}
    />
  ))

  if (loading) {
    return <main className="loading-screen">Loading...</main>
  }

  return (
    <main className={quizStarted ? "questions-screen" : "start-screen"}>
      {quizStarted ? (
        <div className="questions-main">
          {questionElements}
          {showResults ? resultsFooter() : checkAnswersBtn}
        </div>
      ) : (
        <LandingPage handleClick={startQuiz} />
      )}
    </main>
  )
}
