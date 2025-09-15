function typeOut(text: string, element:HTMLElement, delay:number = 100){
    let i: number = 0;

    function typeCharacter(){
        if(i < text.length){
            element.textContent += text[i];
            i++
            setTimeout(typeCharacter, delay)
        }

    }
    typeCharacter();
}