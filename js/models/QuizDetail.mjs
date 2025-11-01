
export default class QuizDetail{
    constructor(name,level,qNumber){
        this.name = name ;
        this.level = level ;
        this.qNumber = qNumber ;
    }
    
    static toModel(quiz) {
        return new QuizDetail(
            quiz.name,
            quiz.level,
            quiz.qNumber
        )
    }
}