
export default function LandingPage(props){
    

    return(
        <header>
          <h1>Quizzical</h1>
          <p>Improving your knwoledge doesn't have to be boring.</p>
          <button onClick={props.handleClick}>Start quiz</button>
      </header>
    )
}