import Question from "./Question.mjs";

export default class Quiz{
    constructor(name,level,time,qNumber, questions){
        this.name = name ;
        this.level = level ;
        this.time = time ;
        this.qNumber = qNumber ;
        this.questions = questions;
    }
    static toModel(json) {
        return new Quiz(
            json.name,
            json.level,
            json.time,
            json.qNumber,
            json.questions.map(question=>Question.fromJson(question)));
    }
}