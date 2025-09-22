function showByID(formID: string): void {
    document.querySelectorAll<HTMLElement>(".loginContainer").forEach(form => form.classList.remove("active"));
    document.getElementById(formID)?.classList.add("active");
}

function typeOut(element:HTMLElement, delay:number = 100){

    let i: number = 0
    let text: string = element.textContent;
    element.textContent = ""

    function typeCharacter(){
        if(i < text.length){
            element.textContent += text[i];
            i++
            setTimeout(typeCharacter, delay)
        }
    }
    typeCharacter()
}