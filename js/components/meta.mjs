
const metaContainer = "flex flex-col gap-2";
export const metaData = (id) => {

    const metaData = document.createElement("div");
    metaData.setAttribute("id",id)
    metaData.classList = metaContainer;

    const metaTemplate= document.getElementById("meta-template");
    const quizName = metaTemplate.content.cloneNode(true);
    const quizQuestions = metaTemplate.content.cloneNode(true);
    const quizLevel = metaTemplate.content.cloneNode(true);

    metaData.appendChild(quizName);
    metaData.appendChild(quizLevel);
    metaData.appendChild(quizQuestions);
    return metaData;
} 

export const setMetaData = (containerId,data) => {
    const metafields = document.getElementById(containerId).querySelectorAll("div");
    
    metafields.forEach((field,index)=>{
        const children = field.children;
        children[0].innerText = data[index][0];
        children[1].innerText = data[index][1];
    });
}