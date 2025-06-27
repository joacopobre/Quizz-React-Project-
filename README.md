# Quiz App – React Solo Project

A simple multiple-choice quiz built with React. Users can answer questions, receive correct/incorrect feedback, view their final score, and play again.

## 🚀 Features

- Fetches questions from the Open Trivia Database API
- Interactive answer selection with visual feedback
- Displays score and correct/incorrect answers at the end
- Option to restart the quiz

## 🛠 Tech Stack

- **React** (with hooks)
- **Vite**
- **CSS**
- **clsx** (for conditional classNames)
- **Open Trivia Database API** – [https://opentdb.com/](https://opentdb.com/)

## 📦 Setup & Installation

```bash
git clone https://github.com/joacopobre/Quizz-React-Project-.git
cd Quizz-React-Project-
npm install
npm run dev
```
## ▶️ Usage
When you load the app, you’ll see a welcome screen with a Start Quiz button. Clicking it will begin a 5-question quiz.
- Select your answers by clicking the options.
- Once all questions are answered, click the Check Answers button.
- You'll see a results screen showing:
  - Your score
  - Which answers were correct and incorrect
  - The correct answer for any you got wrong

- Click Play Again to restart the quiz.

## 📌 Notes
- The app uses clsx to dynamically assign CSS classes based on user interaction and state.
- Questions are fetched from the Open Trivia DB API each time the quiz starts or restarts.
- All questions are multiple-choice with shuffled answer options.

## 🙋 Author
Joaco Pobre
https://github.com/joacopobre
