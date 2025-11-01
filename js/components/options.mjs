

const optionItem = (id,option) => {
    const text = document.createElement("div");
    text.setAttribute("id",id);
    text.setAttribute("aria-checked","false");
    text.innerText = option;
    text.classList = 
        "px-4 py-2 rounded-lg border-2 border-bg-black hover:border-indigo-100\
        aria-checked:border-indigo-500";
    return text;
}

export const optionList = (id,options,handeler) => {
    const optionsContainer = document.createElement("div");
    optionsContainer.setAttribute("id",id);
    optionsContainer.classList = "flex flex-col gap-2"
    options.forEach((option,index) => {
        const item = optionItem(`${index}`,option);
        optionsContainer.appendChild(item);
    });
    optionsContainer.addEventListener('click',handeler);

    return {
        list: optionsContainer,
        destroy(){
            optionsContainer.removeEventListener("click",handeler);
        }
    }
}

export const setOptionsData = (containerId,choices,selectedId) => {
    const options = document.getElementById(containerId).childNodes;
    options.forEach((item,index) => {        
        item.innerText = choices[index];
        item.setAttribute("aria-checked",`${selectedId === index}`);
    });
}

export const SetSelectedOption = (containerId,selectedId) => {
    const options = document.getElementById(containerId).childNodes;
    options.forEach((item,index) => {                
        const isChecked = (index === selectedId)? true : false ;
        item.setAttribute("aria-checked",`${isChecked}`);
        
    })
}