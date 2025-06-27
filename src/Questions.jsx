import clsx from "clsx";
import { useMemo } from "react";


export default function Questions({
    question,correct_answer,incorrect_answers,selected,onSelect,index,showResults,allAnswers}){
    
        
    
    return(
        <div className="question-block">
            <h3 dangerouslySetInnerHTML={{__html:question}}/>
            <div className="answers-block">
            {allAnswers.map((answer,i)=>{
                const isSelected = selected === answer;
                const isCorrect = answer === correct_answer;

                const className = clsx(
                    "answer-button",
                    {
                        'selected':!showResults&& isSelected,
                        'correct': showResults && isCorrect,
                        'incorrect': showResults && isSelected && !isCorrect,
                        'answers-shown': !isSelected && showResults && !isCorrect 
                    }
                );
                return(
                    <label key={i} className={className}>
                        <input
                            type="radio"
                            name={`question-${index}`}
                            value={answer}
                            checked={isSelected}
                            disabled={showResults}
                            onChange={()=>onSelect(index,answer)}
                            className="hidden-radio"
                        />
                        <span dangerouslySetInnerHTML={{__html: answer}}/>
                    </label>
                )
            })}
            </div>
            
        </div>

        
        
    )
}