const primaryButton = "bg-black text-white px-4 py-2 rounded-lg";
const secondaryButton = 
    "text-black px-4 py-2 rounded-lg border-2 border-black\
    disabled:text-gray-200 disabled:border-gray-200";
export const createButton = (id,text,type,handler) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.setAttribute("id",id);
    btn.classList = (type.includes("primary"))? primaryButton : secondaryButton;
    btn.addEventListener('click',handler);

    return {
        btn: btn,
        destroy(){
            btn.removeEventListener("click",handler);
        }
    }
}
