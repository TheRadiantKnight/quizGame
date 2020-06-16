// Prompts user to click start quiz button
function startQuiz() {
  $('#start').on('click', function(event) {
      questionQuiz();
  });
}

// Shows the user question number and current score

function questionAndScore() {
    const scoreBoard = $(
        `<ul> <li id="js-answered">Question: ${STORE.currentQuestion + 1}/${STORE.questions.length}
        </li>
        <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
        </ul>`);
        $(".question-and-score").html(scoreBoard);        
}

// Shows user display options on the current question

function updateAnswers() {
    let question = STORE.questions[STORE.currentQuestion];
    for(let i=0; i<question.answers.length; i++)
    {
      $('.js-options').append(`
          <input type = "checkbox" name="options" id="option${i+1}" value= "${question.answers[i]}" tabindex ="${i+1}"> 
          <label for="option${i+1}"> ${question.answers[i]}</label> <br/>
          <span id="js-r${i+1}"></span>
      `);

    }
}
  
// Displays the question for users

function questionQuiz() {
    let question = STORE.questions[STORE.currentQuestion];
    questionAndScore();
    const questionHtml = $(`
    <div>
      <form id="js-questions" class="question-form">
        
        <fieldset>
          <div class="row question">
            <div class="col-12">
              <legend> ${question.question}</legend>
            </div>
          </div>
  
          <div class="row options">
            <div class="col-12">
              <div class="js-options"> </div>
          </div>
        </div>
      
  
        <div class="row">
          <div class="col-12">
            <button type = "submit" id="answer" tabindex="5">Submit</button>
            <button type = "button" id="next-question" tabindex="6"> Next >></button>
          </div>
        </div>
      </fieldset>
      </form>
    </div>`);
  $("main").html(questionHtml);
  updateAnswers();
  $("#next-question").hide();


}

// Displays results and restart quiz button 

function results() {
    let resultHtml = $(
        `<div class="results">
          <form id="js-restart-quiz">
            <fieldset>
              <div class="row">
                <div class="col-12">
                  <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
                </div>
              </div>
            
              <div class="row">
                <div class="col-12">
                  <button type="button" id="restart"> Restart Quiz </button>
                </div>
              </div>
            </fieldset>
        </form>
        </div>`);
        STORE.currentQuestion = 0;
        STORE.score = 0;
      $("main").html(resultHtml);

}

// Checks whether users at the end of the Quiz

function handleQuestions() {
    $('body').on('click','#next-question', (event) => {
        STORE.currentQuestion === STORE.questions.length? results() : questionQuiz();
      });

}

// Checks whether the current questions is right or wrong to display appropriate message to user

function handleResults() {
    $('body').on("submit",'#js-questions', function(event) {
        event.preventDefault();
        let currentQues = STORE.questions[STORE.currentQuestion];
        let selectedOption = $("input[name=options]:checked").val();
        if (!selectedOption) {
          alert("Choose an option");
          return;
        } 
        let id_num = currentQues.answers.findIndex(i => i === selectedOption);
        let id = "#js-r" + ++id_num;
        $('span').removeClass("right-answer wrong-answer");
        if(selectedOption === currentQues.answer) {
          STORE.score++; 
          $(`${id}`).append(`You got it right<br/>`);
          $(`${id}`).addClass("right-answer");
        }
        else {
          $(`${id}`).append(`You got it wrong <br/> The answer is "${currentQues.answer}"<br/>`);
          $(`${id}`).addClass("wrong-answer");
        }
    
        STORE.currentQuestion++;
        $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
        $('#answer').hide();
        $("input[type=checkbox]").attr('disabled', true);
        $('#next-question').show();
      });


}

// Restart Quiz for the user

function restartQuiz() {
    $('body').on('click','#restart', (event) => {
        questionQuiz();
      });

}

function handleQuizGame() {
    startQuiz();
    handleQuestions();
    handleResults();
    restartQuiz();
}

$(handleQuizGame);