export default class Question{
    constructor ({text,choices,answer}){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    static fromJson(json) {
        return new Question(json);
    }
}