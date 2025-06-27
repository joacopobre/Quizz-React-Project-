import React from "react"
import LandingPage from "./LanndingPage"
import Questions from "./Questions"
import clsx from "clsx"


export default function QuizzApp(){

  const[quizzTime, setQuizz] = React.useState(false)
  const[quizzQuestions, setQuestions]= React.useState([])
  const[userAnswers,setUserAnswers]=React.useState({})
  const[showResults,setShowResults] = React.useState(false)
  
  // fetch data from API
  const fetchData = async () =>{
      try{
        const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
        if (!res.ok) throw new Error("Failed to fetch data")
          const data = await res.json()
          const formatedQuestions = data.results.map(q=>({
            ...q,
            allAnswers: [...q.incorrect_answers,q.correct_answer]
              .sort(()=>Math.random()-0.5)
          }))
          setQuestions(formatedQuestions)
      }
      catch(err){
        console.log(err)
      }
      
    }

  // call the fetch data function 
  React.useEffect(()=>{
    fetchData()
  },[])
    
  

  const handleClickStart=()=>{
    setQuizz(true)
  }

  const handleAnswerSelect =(questionIndex, answer) =>{
    setUserAnswers(prevAnswers =>({
        ...prevAnswers,
        [questionIndex]:answer
    }))
  }

  const questionElements =()=>{
    
    return quizzQuestions.map((question,index)=>(
      <Questions 
      index={index}
      key={index}
      question={question.question} 
      correct_answer={question.correct_answer} 
      incorrect_answers={question.incorrect_answers}
      onSelect={handleAnswerSelect}
      selected={userAnswers[index]}
      allAnswers={question.allAnswers}
      showResults={showResults}
      />
    ))
  }
  
  const checkAnswersClass = clsx(
    "average-btn",{
      "not-available":Object.keys(userAnswers).length != 5 
    })
  const handleCheckBtn = ()=>{
    setShowResults(true)
  }
  const resetGame = () => {
    fetchData()
    setShowResults(false)
    setUserAnswers({})
  }

  const checkAnswersBtn = () =>{
    return (
      <button className={checkAnswersClass} onClick={handleCheckBtn}>Check answers</button>
    )
  }
  const playAgainText = () =>{
    const rightAnswers = quizzQuestions.reduce((acc, question, index) => {
    return userAnswers[index] === question.correct_answer ? acc + 1 : acc;
  }, 0);

    const textToDisplay = `You scored ${rightAnswers}/5 correct answers`
    return(
      <footer className="play-again">
        <h2>{textToDisplay}</h2>
        <button className="average-btn" onClick={resetGame}>Play again</button>
      </footer>
        
      
    )
  }

  return( 
    <main className={quizzTime?"questions-screen":"start-screen"}>
        {quizzTime?
        <div className="questions-main">
          {questionElements()}
          {showResults?playAgainText():checkAnswersBtn()}
          
        </div>
        
        
        :
        <LandingPage handleClick={handleClickStart}/>
        }
    </main>
  )
}