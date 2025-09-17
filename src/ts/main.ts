
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