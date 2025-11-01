import QuizDetail from "./models/QuizDetail.mjs";
import {loadData,getQuizezNames,getQuizeDetailById, getQuizQuestionsById} from "./repository.mjs";
import { createButton } from "./components/button.mjs";
import { selector } from "./components/selector.mjs";
import { metaData,setMetaData } from "./components/meta.mjs";
import { optionList,SetSelectedOption,setOptionsData } from "./components/options.mjs";



// quiz data
let selectedQuiz = null;
let questions = [];
let qNumber = 0;
let currentQuestion = 0;
let answers = new Map();


loadData().then(getQuizezNames).then(names => renderStartScreen(names));


// rendring functions
const renderStartScreen = (options)=>{
    
    const quizContainer = document.getElementById("quiz-container");

    const title = document.createElement("h1");
    title.innerText = "Welcome to Quizie";
    title.classList = "text-2xl font-bold text-center"
    const desc = document.createElement("p");
    desc.innerText = "Your path to excellence";
    desc.classList = "text-base font-normal text-gray-800 text-center";

    const topSection = document.createElement("div");
    topSection.appendChild(title)
    topSection.appendChild(desc);;

    const quizSelector = selector(options,selectQuiz);

    const metaContainer = metaData("meta-container");
    

    const start = createButton("start-quiz","Start Quiz","primary",startQuiz);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(topSection);
    fragment.appendChild(quizSelector.select);
    fragment.appendChild(metaContainer);
    fragment.appendChild(start.btn);

    quizContainer.appendChild(fragment);

    setMetaData("meta-container",[["Quiz","--"],["Level","--"],["Questions","--"]]);

}

const renderQuizScreen = () => {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";
    const title = document.createElement("h1");
    title.setAttribute("id","quiz-progress");
    title.innerText = `Question ${currentQuestion+1}/${qNumber}`;
    const question = document.createElement("p");
    question.setAttribute("id","quiz-question");
    question.innerText = questions[currentQuestion].text;

    const olist = optionList("options-container",questions[currentQuestion].choices,selectChoice);

    const btnsContainer = document.createElement("div");
    btnsContainer.classList = "flex flex-col gap-2"
    const btnNext = createButton("next","Next","primary",nextQuestion);
    const btnPrev = createButton("previous","Previous","secondary",prevQuestion);
    btnPrev.btn.disabled = true;
    btnsContainer.appendChild(btnNext.btn);
    btnsContainer.appendChild(btnPrev.btn);

    const fragment = document.createDocumentFragment();

    fragment.appendChild(title);
    fragment.appendChild(question);
    fragment.appendChild(olist.list);
    fragment.appendChild(btnsContainer);


    quizContainer.appendChild(fragment);

}

const renderScoreScreen = () => {
    const quizContainer = document.getElementById("quiz-container");
    const result = getResult();
    quizContainer.innerHTML = 
        `<div class="flex flex-col gap-4">
            <img src="./assets/image/congratulation.jpg" alt="imag">\
            <div class="grid grid-cols-2 gap-4">
                <div class="grid place-items-center p-4 bg-indigo-200 rounded-lg">
                    <p>${result.rate}%</p>
                    <p>completion rate</p>
                </div>
                <div class="grid place-items-center p-4 bg-indigo-200 rounded-lg">
                    <p>${result.right}</p>
                    <p>right answers</p>
                </div>
                <div class="grid place-items-center p-4 bg-indigo-200 rounded-lg">
                    <p>${result.wrong}</p>
                    <p>Wrong answers</p>
                </div>
                <div class="grid place-items-center p-4 bg-indigo-200 rounded-lg">
                    <p>${result.unanswered}</p>
                    <p>unanswered</p>
                </div>
            </div>
        </div>`;
}



// setting data functions 

function setQuizData(){
    const question = questions[currentQuestion];
    document.getElementById("quiz-progress").innerText = `Question ${currentQuestion+1}/${qNumber}`;
    document.getElementById("quiz-question").innerText = question.text;
    setOptionsData("options-container",question.choices,answers.get(currentQuestion));
}

// handler function 

function selectQuiz(){
    selectedQuiz = parseInt(this.value);
    const details = getQuizeDetailById(selectedQuiz);
    qNumber = details.qNumber;
    
    setMetaData("meta-container",[["Quiz",details.name],["Level",details.level],["Questions",details.qNumber]]);
}

function startQuiz(){ 
    if(selectedQuiz === null) return;  
    questions = getQuizQuestionsById(selectedQuiz);    
    currentQuestion = 0;     
    renderQuizScreen();
}

function selectChoice(e){
    const targetId = parseInt(e.target.id);
    answers.set(currentQuestion,targetId);
    SetSelectedOption("options-container",targetId);
}

function nextQuestion(){
    
    if(currentQuestion === qNumber-1) {endQuiz(); return;}
    if(currentQuestion === 0) document.getElementById("previous").disabled = false;
    currentQuestion++;
    if(currentQuestion === qNumber-1) document.getElementById("next").innerText = "finish"
    setQuizData();
}

function prevQuestion(){
    if(currentQuestion === 1) document.getElementById("previous").disabled = true;
    currentQuestion--;
    setQuizData();
}

function endQuiz(){
    renderScoreScreen();
}

// utilities 

function getScore(){
    let score = 0;
    for(let [key,value] of answers){
        if(questions[key].answer === value) score++;
    }
    return score;
}

function getResult(){
    let right = 0, wrong = 0, answered = answers.size;
    for(let [key,value] of answers){
        if(questions[key].answer === value) right++;
        else wrong++;
    }
    const rate = 100*(right/qNumber);
    return  {
        rate:rate.toFixed(2),
        right:right,
        wrong:wrong,
        unanswered:qNumber-answered
    }
}

// // registering listeners
// selector.addEventListener('change',selectorHandler);
// start.addEventListener('click',startQuiz);
// //  handlers
// function selectorHandler() { 
//     selectedQuiz = selector.selectedIndex-1;

//     const details = getQuizeDetailsById(selectedQuiz);
//     const elements = home.querySelectorAll("div");
//     elements[0].lastElementChild.innerText = details.qNumber;
//     elements[1].lastElementChild.innerText = details.level;
//     qNumber = details.qNumber;
// }
// function startQuiz(e){
//     if(selectedQuiz != -1)  {
//         home.style.display = "none";
//         setQuizUi();
//         setQuestionData();
//     }
//     e.stopPropagation();
// }

// function next(){
//     if(currentQuestion==0){document.getElementById("btn-prev").disabled = false;}
//     if(currentQuestion == qNumber-1) {
//         finishQuiz()
//         return;
//     }
//     currentQuestion++;
//     if(currentQuestion == qNumber-1) this.innerText = "finish"
//     setQuestionData();
// }

// function selectQuestion(){
//     const choiceIdx = questions[currentQuestion].choices.indexOf(`${this.innerText}`);
//     answer.set(currentQuestion,choiceIdx);
//     this.classList.toggle("aria-selected:border-cyan-200");
//     setSelection();     
// }

// function prev(){
//     if(currentQuestion == 0) {this.disabled = true ;return;};
//     currentQuestion--;
//     setQuestionData();
// }
// function finishQuiz(){
//     questions.forEach((q,index)=>{
//         console.log(answer.get(index));
        
//         if(q.answer == answer.get(index)) score++;
// });
//     document.getElementById("btn-next").removeEventListener("click",next);
// }

// /// ui functions
// function setQuizUi(){
    
//     const quizContainer = document.createElement('div');
//     quizContainer.setAttribute("id","quizes");
//     quizContainer.classList.value = 
//             "w-screen md:w-[35vw] md:mx-auto p-6 m-4 p-2\
//             flex flex-col align-center gap-6\
//             rounded-lg border-2 border-red-50";
//     const questionContainer = document.createElement('div');
//     questionContainer.setAttribute("id","quiz-container");
//     questionContainer.classList.value = "flex flex-col";

//     const question = document.createElement('h4');
//     question.setAttribute("id","question");
//     questionContainer.appendChild(question);

//     // choices creation
//     for(let i = 1;i<=4;i++){
//         const choice = document.createElement('p');
//         choice.classList.value = "my-2 px-4 py-2 rounded-lg border-2 border-neutral-100 hover:border-black";
//         choice.addEventListener('click',selectQuestion);
//         questionContainer.appendChild(choice);
//     }
    

//     //btns creation
//     const btnNext = document.createElement('button');
//     btnNext.innerText = "Next";
//     btnNext.setAttribute("id","btn-next");
//     btnNext.classList.value = "bg-black text-white p-2 rounded-lg";
//     btnNext.addEventListener('click',next);

//     const btnPrevious = document.createElement('button');
//     btnPrevious.innerText = "Previous";
//     btnPrevious.setAttribute("id","btn-prev");
//     btnPrevious.classList.value = 
//     "text-black p-2 rounded-lg border-2 border-black\
//     disabled:border-gray-200 disabled:text-gray-200";
//     btnPrevious.disabled = true ;
//     btnPrevious.addEventListener('click',prev);

//     const btnContainer = document.createElement('div');
//     btnContainer.classList.value = "flex flex-col gap-2";
//     btnContainer.appendChild(btnNext);
//     btnContainer.appendChild(btnPrevious);


//     quizContainer.appendChild(questionContainer);
//     quizContainer.appendChild(btnContainer);

//     document.querySelector("main").appendChild(quizContainer);

// }


// function setScoreUi(){
    
// }

// function setQuestionData(){
//     if(!questions.length) questions = getQuizQuestions(selectedQuiz);
//     const q = questions[currentQuestion];
//     const question = document.getElementById("question");
//     const quiz = document.getElementById("quizes");
//     question.innerText = q.text; 
//     quiz.querySelectorAll("p").forEach((element,index) => {
//         element.innerText = q.choices[index];
//         const selected = answer.get(currentQuestion) == index;        
//         element.setAttribute("aria-selected",`${selected}`);     
//     });
// }

// function setSelection(){
//     document.getElementById("quizes").querySelectorAll("p").forEach((element,index) => {
//         const selected = answer.get(currentQuestion) == index;        
//         element.setAttribute("aria-selected",`${selected}`);     
//     });
// }
