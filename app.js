const htmlBody = document.querySelector("body");
const startButton = document.querySelector(".button-start");
const quesNumber = document.querySelector(".ques-number");
const sectionChoice = document.querySelector(".section-choice");

const quesSentence = document.querySelector(".ques-sentence");
const buttonChoice1 = document.querySelector(".button-choice1");
const buttonChoice2 = document.querySelector(".button-choice2");
const buttonChoice3 = document.querySelector(".button-choice3");
const judgeSentence = document.querySelector(".judge-sentence");

let allQuizNumber = 0; //問題数
let currentQuizCounter = 0; //現在のクイズ番号
let currentCorrectCounter = 0; //現在の正解数
let quizData = new Array();

const url = "./quiz.json";

function allButtonDeactivate() {
  buttonChoice1.disabled = true;
  buttonChoice2.disabled = true;
  buttonChoice3.disabled = true;
}

function allButtonActivate() {
  buttonChoice1.disabled = false;
  buttonChoice2.disabled = false;
  buttonChoice3.disabled = false;
}

allButtonDeactivate();

function judgeAnswer(select, answer) {
  judgeSentence.classList.remove("correct", "incorrect");
  if (select == answer) {
    judgeSentence.textContent = "正解";
    judgeSentence.classList.add("correct");
    currentCorrectCounter++;
  } else {
    judgeSentence.classList.add("incorrect");
    judgeSentence.textContent = "不正解";
  }

  //次の問題へ移るボタン表示
  const button_next = document.createElement("button");
  button_next.classList.add("button-next");
  button_next.textContent = "次の問題へ";
  htmlBody.appendChild(button_next);

  button_next.addEventListener("click", () => {
    button_next.remove();
    judgeSentence.textContent = "";
    allButtonActivate();
    if (currentQuizCounter < allQuizNumber - 1) {
      currentQuizCounter++;
      createQuiz();
    } else {
      quesNumber.remove();
      quesSentence.remove();
      sectionChoice.remove();
      const result = document.createElement("h2");
      result.textContent = "結果：" + currentCorrectCounter + "問正解！";
      htmlBody.appendChild(result);

      //再トライボタン
      const button_try = document.createElement("button");
      button_try.textContent = "もう一度";
      htmlBody.appendChild(button_try);
      button_try.addEventListener("click", () => {
        currentCorrectCounter = 0;
        currentQuizCounter = 0;
        judgeSentence.remove();
        htmlBody.appendChild(quesNumber);
        htmlBody.appendChild(quesSentence);
        htmlBody.appendChild(sectionChoice);
        htmlBody.appendChild(judgeSentence);
        result.remove();
        button_try.remove();
        createQuiz();
      });
    }
  });
}

buttonChoice1.addEventListener("click", () => {
  allButtonDeactivate();
  judgeAnswer(
    quizData[currentQuizCounter].choices[0],
    quizData[currentQuizCounter].answer,
  );
});

buttonChoice2.addEventListener("click", () => {
  allButtonDeactivate();
  judgeAnswer(
    quizData[currentQuizCounter].choices[1],
    quizData[currentQuizCounter].answer,
  );
});

buttonChoice3.addEventListener("click", () => {
  allButtonDeactivate();
  judgeAnswer(
    quizData[currentQuizCounter].choices[2],
    quizData[currentQuizCounter].answer,
  );
});

function createQuiz() {
  quesNumber.textContent =
    currentQuizCounter + 1 + "問目" + "/ 全" + allQuizNumber + "問";
  quesSentence.textContent = "Q. " + quizData[currentQuizCounter].question;
  buttonChoice1.textContent = quizData[currentQuizCounter].choices[0];
  buttonChoice2.textContent = quizData[currentQuizCounter].choices[1];
  buttonChoice3.textContent = quizData[currentQuizCounter].choices[2];
}

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  allButtonActivate();
  //JSONファイルからクイズのデータを取ってくる
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        quizData = data;
        allQuizNumber = data.length;
        createQuiz();
      });
  } catch (error) {
    console.error("Error:", error.message);
  }
});
