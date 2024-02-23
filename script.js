import questions from "./utils/questions.js";

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const scoreElement = document.getElementById('score-counter')

let questIdx = 0;
let score = 0;

scoreElement.innerHTML = `Score: ${score}`

function startQuiz() {
  questIdx = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function resetState() {
    
    nextBtn.style.display = "none";
    console.log(answerBtn.firstChild)
    while(answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}


function showQuestion() {
    resetState()
    //get current question at index 0
  let currentQuestion = questions[questIdx];
  let questionNum = questIdx + 1;

  //formatting the text
  questionElement.innerText = `Question ${questionNum} - ${currentQuestion.question}`;

  //foreach loop that populates the answer-buttons class in html
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}



function selectAnswer(e) {

  const selectedBtn = e.target;
  let isCorrect = selectedBtn.dataset.correct === "true";


// adding styles with conditions
  isCorrect === true
    ? selectedBtn.classList.add("correct")
    : selectedBtn.classList.add("incorrect");

// if the selectedAnswer is correct, add +1 score
if(selectedBtn.dataset.correct === "true") {
    score++;
    scoreElement.innerHTML = `Score: ${score}`
}
//looping through the children of answer-buttons
Array.from(answerBtn.children).forEach(button => {
    if(button.dataset.correct === "true") {
        button.classList.add('correct')
    }
    //disable button
    button.disabled = true;
});


//next question
nextBtn.style.display = 'block';
}



function handleNextButton() {
    questIdx++;
    if(questIdx < questions.length) {
        showQuestion();
    } else {
       showScore();     
    }
}

nextBtn.addEventListener('click', () => {
    if(questIdx < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

function showScore() {
    resetState();
    scoreElement.style.display = 'none'
    questionElement.innerText = `You have ${score} points out of ${questions.length}!`
    if(score == questions.length) {
        questionElement.innerText = `Congrats, you've got them all correct! \n \n Score ${score} out of ${questions.length}`
    }
    nextBtn.innerText = 'Play again?'
    nextBtn.style.display = 'block'
}

startQuiz();
