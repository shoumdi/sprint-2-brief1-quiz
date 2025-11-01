
const selectStyle = "px-4 py-2 rounded-lg border-2 border-neutral-400 focus:border-indigo-500";
export const selector = (options,handeler) => {
    const select = document.createElement("select");
    let id=0;
    select.setAttribute("name","selector");
    select.classList = selectStyle;
    select.innerHTML = `<option hidden selected>Select a quiz</option>`;
    select.innerHTML += options.map(opt => `<option value="${id++}">${opt}</option>`).join("");
    select.addEventListener('change',handeler);    
    return{
        select : select,
        destroy(){
            select.removeEventListener('change',handeler);
        }
    }
}