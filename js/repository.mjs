import Quiz from "./models/Quiz.mjs";
import QuizDetail from "./models/QuizDetail.mjs";

let quizes = [];
export async function loadData(){
    try {
        const response = await fetch("./js/data.json");
        const json = await response.json();
        quizes = json.map(j=> Quiz.toModel(j));
        return quizes;
    }catch(e){
        console.log(e);
    } 
}


export function getQuizezNames(quizes) { 
    return quizes.map(q=>q.name);
 };

export function getQuizeDetailById(id){
    return QuizDetail.toModel(quizes[id]);
}

export function getQuizQuestionsById(id){
    return quizes[id].questions;
}